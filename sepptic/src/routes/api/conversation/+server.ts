import dbCreateConversation from '../../../server/utils/dbCreateConversation';
import getUserIdFromToken from '../../../server/utils/getUserIdFromToken';
import dbGetMessages from '../../../server/utils/dbGetMessages';
import type { RequestEvent } from '@sveltejs/kit';
import cookie from 'cookie';

export async function POST(event: RequestEvent) {
    // Authenticate and get user ID
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
 
    // Create conversation
    const body = await event.request.json();
    const campaignId = body.campaignId;
    const characterId = body.characterId;

    const result = await dbCreateConversation(userId, campaignId, characterId);
    return new Response(JSON.stringify(result), { status: result.status });
}

export async function GET(event: RequestEvent) {
    // Validate request
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const url = new URL(event.request.url);
    const campaignId = Number(url.searchParams.get('campaignId'));
    const characterId = Number(url.searchParams.get('characterId'));
    if (!campaignId || !characterId || campaignId == null || characterId == null) {
        return new Response(JSON.stringify({ message: 'Missing campaignId or characterId', status: 400 }), { status: 400 });
    }
    // Authenticate and get user ID
    const token = cookies.token;
    if (!token) {
        return new Response(JSON.stringify({ message: 'No token provided', status: 400 }), { status: 400 });
    }
    const userIdResponse = await getUserIdFromToken(token);
    if (!userIdResponse.success || !userIdResponse.userId) {
        return new Response(JSON.stringify({ message: userIdResponse.message, status: userIdResponse.status }), { status: userIdResponse.status });
    }
    const userId = userIdResponse.userId;

    // Create conversation if it doesn't exist. Get conversation ID either way.
    const conversationResult = await dbCreateConversation(userId, campaignId, characterId);
    if (conversationResult.status !== 200 || !conversationResult.conversationId) {
        return new Response(JSON.stringify(conversationResult), { status: conversationResult.status });
    }
    const conversationId = conversationResult.conversationId;

    // Get and return the converstaion's messages
    const messages = await dbGetMessages(conversationId);
    if (messages.status !== 200) {
        return new Response(JSON.stringify(messages), { status: messages.status });
    }
    return new Response(JSON.stringify(messages), { status: messages.status });
}