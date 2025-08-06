import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdirSync } from 'fs';
import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export async function POST(event: RequestEvent) { // event is not the same as a DOM event here. It is a svelteKit abstraction
    console.log("Image upload hit");
    const fileName = event.request.headers.get("X-Filename")
    const file = await event.request.arrayBuffer();

    if (!file) {
        return json({ error: 'Invalid file upload' }, { status: 400 });
    }

    const buffer = Buffer.from(file);
    const uploadsDir = join(process.cwd(), 'static', 'images');

    mkdirSync(uploadsDir, { recursive: true }); // ensure dir exists

    const filename = `${Date.now()}-${fileName}`;
    const filePath = join(uploadsDir, filename);

    await writeFile(filePath, buffer);
    console.log("File", buffer, "written to", filePath)

    return json({
        success: true,
        filename,
        url: `/images/${filename}`
    });
}
