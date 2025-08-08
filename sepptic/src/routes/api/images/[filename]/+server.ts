import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { mkdirSync } from 'fs';
import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { requireAdmin } from '../../../../server/utils/authGuards';

export async function POST(event: RequestEvent) { // event is not the same as a DOM event here. It is a svelteKit abstraction
    requireAdmin(event)
    console.log("Image upload hit");
    const fileName = event.request.headers.get("X-Filename")
    const file = await event.request.arrayBuffer();

    if (!file) {
        return json({ error: 'Invalid file upload' }, { status: 400 });
    }

    const buffer = Buffer.from(file);
    const uploadsDir = join(process.cwd(), 'uploads', 'images');

    mkdirSync(uploadsDir, { recursive: true }); // ensure dir exists

    const filename = `${Date.now()}-${fileName}`;
    const filePath = join(uploadsDir, filename);

    await writeFile(filePath, buffer);
    console.log("File", buffer, "written to", filePath)

    return json({
        success: true,
        filename,
        url: `/api/images/${filename}`
    });
}
// TODO: There should likely be better security features on this POST handler at somepoint


// allows images to be aquired with <img src={/api/images/[filename]}/>
export async function GET({ params }) {
  const filename = params.filename.replace(/[^\w.\-]+/g, '_'); // Escapes dangerous file names
  const filePath = join(process.cwd(), 'uploads', 'images', filename);

  try {
    const data = await readFile(filePath);
    return new Response(data, { headers: { 'Content-Type': 'image/*' } });
  } catch {
    throw error(404, 'Not found');
  }
}
