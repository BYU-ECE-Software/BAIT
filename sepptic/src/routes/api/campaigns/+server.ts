import { jsonGetCampaigns } from "../../../server/utils/jsonGetCampaigns";
import getUserIdFromToken from "../../../server/utils/getUserIdFromToken";
import dbDeleteCampaign from "../../../server/utils/dbDeleteFullCampaign"
import dbCreateJson from "../../../server/utils/dbCreateJson";
import cookie from 'cookie';
import type { RequestEvent } from '@sveltejs/kit';
import { readdir } from "fs/promises";
import { writeFile } from "fs/promises";
import { join } from "path";
import { json } from "@sveltejs/kit";

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
		// Write json file with id to DB for more permant storage
		const campaignRes = await dbCreateJson(JSON.stringify(data, null, 2));

		if (!campaignRes.success) {
			return json({
				message: "Unable to store campaign to DB",
				success: false
			})
		}
		console.log("File stored")
		return json({
			success: true,
			message: "Campaign saved successfully"
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

    const cResult = await dbDeleteCampaign(Number(campaignId));
	if (cResult.status !== 200) {
		return json({
			message: "Campaign deletion failed",
			success: false
		});
	}

	return json({
		message: "Campaign and json deleted successfully",
		success: true
	});
}