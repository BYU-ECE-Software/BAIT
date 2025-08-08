import { readdir } from "fs/promises";
import { writeFile } from "fs/promises";
import { join } from "path";
import type { RequestEvent } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { requireAdmin } from "../../../server/utils/authGuards";

export async function POST(event: RequestEvent) {
	await requireAdmin(event);
	try {
		const data = await event.request.json();
		const campaignsDir = join(process.cwd(), 'src', 'server', 'campaigns');

		// Get all filenames in the campaigns directory
		const files = await readdir(campaignsDir);

		// Extract numbers and find the highest one
		const numbers = files.map(file => {
			const match = file.match(/(\d+)\.json$/);
			return match ? parseInt(match[1], 10) : 0;
		});
		const nextId = Math.max(0, ...numbers) + 1;

		// Create filename and write
		const filename = `${nextId}.json`;
		const filePath = join(campaignsDir, filename);
		await writeFile(filePath, JSON.stringify(data, null, 2));
        console.log("File with ID: ", nextId, " written")

		return json({
			success: true,
			message: "Campaign saved successfully",
			filename
		});
	} catch (error) {
		console.error("Error saving campaign:", error);
		return new Response("Error saving campaign", { status: 500 });
	}
}
