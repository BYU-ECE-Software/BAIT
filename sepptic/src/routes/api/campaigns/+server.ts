import { jsonGetCampaigns } from "../../../server/utils/jsonGetCampaigns";
import getUserIdFromToken from "../../../server/utils/getUserIdFromToken";
import cookie from 'cookie';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const token = cookies.token;
    if (!token) {
        return new Response(JSON.stringify({ message: 'No token provided', status: 400 }), { status: 400 });
    }
    const userIdResponse = await getUserIdFromToken(token);
    if (!userIdResponse.success || !userIdResponse.userId) {
        return new Response(JSON.stringify({ message: userIdResponse.message, status: userIdResponse.status }), { status: userIdResponse.status });
    }
    const campaignsResponse = await jsonGetCampaigns();
    if (campaignsResponse.status !== 200) {
        return new Response(JSON.stringify({ message: campaignsResponse.message, status: campaignsResponse.status }), { status: campaignsResponse.status });
    }
    return new Response(JSON.stringify(campaignsResponse.campaigns), { status: 200 });
}