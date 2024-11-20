import { jsonGetCampaign } from "../../../../server/utils/jsonGetCampaigns";
import getUserIdFromToken from "../../../../server/utils/getUserIdFromToken";
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
    const token = event.request.headers.get('token');
    if (!token) {
        return new Response(JSON.stringify({ message: 'No token provided', status: 400 }), { status: 400 });
    }
    const userIdResponse = await getUserIdFromToken(token);
    if (!userIdResponse.success || !userIdResponse.userId) {
        return new Response(JSON.stringify({ message: userIdResponse.message, status: userIdResponse.status }), { status: userIdResponse.status });
    }
    const campaignId = event.params.slug;
    const campaign = jsonGetCampaign(campaignId as string);
    return new Response(JSON.stringify(campaign), { status: campaign.status });
}