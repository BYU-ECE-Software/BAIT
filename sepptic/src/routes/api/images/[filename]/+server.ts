import { writeFile, readFile, mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { mkdirSync } from 'fs';
import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import dbGetCampaign from '../../../../server/utils/dbGetCampaign.js';

export async function POST(event: RequestEvent) { // event is not the same as a DOM event here. It is a svelteKit abstraction
  // Could be good to add an auth guard here
    console.log("Image upload hit");
    const fileName = event.request.headers.get("X-Filename")
    const file = await event.request.arrayBuffer();

    if (!file) {
        return json({ error: 'Invalid file upload' }, { status: 400 });
    }

    const buffer = Buffer.from(file);
    const uploadsDir = join(process.cwd(), 'images');

    await mkdir(uploadsDir, { recursive: true });

    const filename = `${Date.now()}-${fileName}`;
    const filePath = join(uploadsDir, filename);

    await writeFile(filePath, buffer);
    console.log("File written to", filePath)

    return json({
        success: true,
        filename,
        url: `/api/images/${filename}`
    });
}
// TODO: There should likely be better security features on this POST handler at somepoint


// Allows images to be acquired with <img src={/api/images/[filename]}/>
export async function GET({ params }) {
  console.log("Image GET hit")
  const filename = params.filename.replace(/[^\w.\-]+/g, '_'); // Escapes dangerous file names
  const filePath = join(process.cwd(), 'images', filename);

  try {
    const data = await readFile(filePath);
    return new Response(data, { headers: { 'Content-Type': 'image/*' } });
  } catch {
    throw error(404, 'Not found');
  }
}

export async function DELETE({params}) {

  // const campaign = await dbGetCampaign() // Pull JSON file from DB

  const filename = params.filename.replace(/[^\w.\-]+/g, '_');
  const filePath = join(process.cwd(), 'images', filename);

  try {
    await rm(filePath, {force: true});
    return json({ success: true, message: "Image deleted", filename})
  } catch {
    throw error(500, "Unable to delete image")
  }
}
