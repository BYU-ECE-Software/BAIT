import dbCreateConversation from '../../../server/utils/dbCreateConversation';
import getUserIdFromToken from '../../../server/utils/getUserIdFromToken';
import type { RequestEvent } from '@sveltejs/kit';
import cookie from 'cookie';

export async function POST(event: RequestEvent) {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const token = cookies.token;
    if (!token) {
        return new Response(JSON.stringify({ message: 'No token provided', status: 400 }), { status: 400 });
    }
    const userIdResponse = await getUserIdFromToken(token);
    if (!userIdResponse.success || !userIdResponse.userId) {
        return new Response(JSON.stringify({ message: userIdResponse.message, status: userIdResponse.status }), { status: userIdResponse.status });
    }
    const userId = userIdResponse.userId;

    const body = await event.request.json();
    const campaignId = body.campaignId;
    const characterId = body.characterId;

    const result = await dbCreateConversation(campaignId, characterId, userId);
    return new Response(JSON.stringify(result), { status: result.status });
}