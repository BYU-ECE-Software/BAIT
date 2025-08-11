import { jsonGetCampaigns } from "../../../server/utils/jsonGetCampaigns";
import getUserIdFromToken from "../../../server/utils/getUserIdFromToken";
import deleteCampaign from "../../../server/utils/dbDeleteFullCampaign"
import deleteJson from "../../../server/utils/deleteJson"
import cookie from 'cookie';
import type { RequestEvent } from '@sveltejs/kit';
import { readdir } from "fs/promises";
import { writeFile } from "fs/promises";
import { join } from "path";
import { json } from "@sveltejs/kit";
import { error } from "@sveltejs/kit"

export async function GET(event: RequestEvent) {
    // Authenticate user and get User ID
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const token = cookies.token;
    if (!token) {
        return new Response(JSON.stringify({ message: 'No token provided', status: 400 }), { status: 400 });
    }
    const userIdResponse = await getUserIdFromToken(token);
    if (!userIdResponse.success || !userIdResponse.userId) {
        return new Response(JSON.stringify({ message: userIdResponse.message, status: userIdResponse.status }), { status: userIdResponse.status });
    }

    // Get campaigns
    const campaignsResponse = await jsonGetCampaigns();
    if (campaignsResponse.status !== 200) {
        return new Response(JSON.stringify({ message: campaignsResponse.message, status: campaignsResponse.status }), { status: campaignsResponse.status });
    }
    return new Response(JSON.stringify(campaignsResponse.campaigns), { status: 200 });
}

// Endpoint for creating a new campaign
export async function POST(event: RequestEvent) {
	// Could be good to add an auth guard here
    // if (event.locals.user.role !== "admin") throw error(403, "Admins only");
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

// Endpoint for deleting an entire campaign and it's associated data in the DB
export async function DELETE(event: RequestEvent) {
	const { campaignId } = await event.request.json();
	console.log("ID: ", campaignId)

    const cResult = await deleteCampaign(Number(campaignId));
	if (cResult.status !== 200) {
		return json({
			message: "Campaign deletion failed",
			success: false
		});
	}

	const jsonResult = await deleteJson(campaignId);
	if (jsonResult.status !== 200) {
		return json({
			message: "JSON campaign file deletion failed",
			success: false
		});
	}

	return json({
		message: "Campaign and json deleted successfully",
		success: true
	});
}