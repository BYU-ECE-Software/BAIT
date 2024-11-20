import validateProgress from "../../../server/utils/validateProgress";
import dbAddIntel from "../../../server/utils/dbAddIntel";
import getUserIdFromToken from "../../../server/utils/getUserIdFromToken";
import type { RequestEvent } from '@sveltejs/kit';

export async function POST(event: RequestEvent) {
    const token = event.request.headers.get('token');
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
    const intelId = body.intelId;

    const valid = await validateProgress(campaignId, characterId, intelId, userId);
    if (!valid) {
        return new Response(JSON.stringify({ message: 'Invalid progress', status: 400 }), { status: 400 });
    }

    const result = await dbAddIntel(campaignId, characterId, intelId, userId);
    return new Response(JSON.stringify(result), { status: result.status });
}