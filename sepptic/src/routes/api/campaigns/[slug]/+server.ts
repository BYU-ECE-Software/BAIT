import { jsonGetCampaign } from "../../../../server/utils/jsonGetCampaigns";
import getUserIdFromToken from "../../../../server/utils/getUserIdFromToken";
import type { RequestEvent } from '@sveltejs/kit';
import cookie from 'cookie';
import { json } from "@sveltejs/kit"
import dbUpdateCampaign from "../../../../server/utils/dbUpdateCampaign";

export async function GET(event: RequestEvent) {
    // Authenticate and get user ID
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const token = cookies.token;
    // console.log(token)
    if (!token) {
        return new Response(JSON.stringify({ message: 'No token provided', status: 400 }), { status: 400 });
    }
    const userIdResponse = await getUserIdFromToken(token);
    if (!userIdResponse.success || !userIdResponse.userId) {
        return new Response(JSON.stringify({ message: userIdResponse.message, status: userIdResponse.status }), { status: userIdResponse.status });
    }
    const userId = userIdResponse.userId;

    // Get campaign
    const campaignId = event.params.slug;
    let campaign = await jsonGetCampaign(campaignId as string);
    return new Response(JSON.stringify(campaign), { status: campaign.status });
}

export async function PUT(event: RequestEvent) {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const token = cookies.token;

    if (!token) {
        return json({message: "No token provided", status: 400})
    }

    // Update campaign with new data from edit form
    const campaignId = event.params.id;
    const raw = event.request.body;
    const campaignData = JSON.stringify(raw, null, 2);

    const update = await dbUpdateCampaign(campaignId, campaignData);

    if (!update.success) {
        return json({
            message: "Campaign update failed",
            success: false,
            status: 500
        })
    }

    return json({
        message: "Campaign update success",
        success: true,
        status: 200
    })


}