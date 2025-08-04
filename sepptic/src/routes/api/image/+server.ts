import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdirSync } from 'fs';
import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export async function POST(event: RequestEvent) { // event is not the same as a DOM event here. It is a svelteKit abstraction
    console.log("Image upload hit");
    const formData = await event.request.formData(); // event.request is the just the svelte way of defining the raw request object in native fetch
    const file = formData.get('file') as File;

    if (!file || !(file instanceof File)) {
        return json({ error: 'Invalid file upload' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadsDir = join(process.cwd(), 'static', 'images');

    mkdirSync(uploadsDir, { recursive: true }); // ensure dir exists

    const filename = `${Date.now()}-${file.name}`;
    const filePath = join(uploadsDir, filename);

    await writeFile(filePath, buffer);
    console.log("File", buffer, "written to", filePath)

    return json({
        success: true,
        filename,
        url: `/images/${filename}`
    });
}
