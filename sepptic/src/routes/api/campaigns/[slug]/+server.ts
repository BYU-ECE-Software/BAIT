import { jsonGetCampaign } from "../../../../server/utils/jsonGetCampaigns";
import getUserIdFromToken from "../../../../server/utils/getUserIdFromToken";
import type { RequestEvent } from '@sveltejs/kit';
import cookie from 'cookie';

export async function GET(event: RequestEvent) {
    // Authenticate and get user ID
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const token = cookies.token;
    console.log(token)
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