import getUserIdFromToken from '../../../server/utils/getUserIdFromToken';
import dbCreateConversation from '../../../server/utils/dbCreateConversation';
import dbGetMessages from '../../../server/utils/dbGetMessages';
import aiSendMessage from '../../../server/utils/aiSendMessage';
import { jsonGetCampaign } from '../../../server/utils/jsonGetCampaigns';
import type { RequestEvent } from '@sveltejs/kit';
import cookie from 'cookie';

export async function POST(event: RequestEvent) {
    const body = await event.request.json();
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
    const campaignId = body.campaignId;
    const characterId = body.characterId;
    const message = body.message;

    // Create conversation if not exists. Get conversation ID either way.
    const conversationResult = await dbCreateConversation(userId, campaignId, characterId);
    if (conversationResult.status !== 200 || !conversationResult.conversationId) {
        return new Response("Error getting conversation: " + JSON.stringify(conversationResult), { status: conversationResult.status });
    }
    const conversationId = conversationResult.conversationId;

    // Get conversation messages from database
    const messagesResponse = await dbGetMessages(conversationId);
    if (messagesResponse.status !== 200) {
        return new Response("Error getting messages: " + JSON.stringify(messagesResponse.message), { status: messagesResponse.status });
    }
    const messages = messagesResponse.messages;

    // Get prompt from campaign
    const campaignResult = jsonGetCampaign(campaignId);
    if (campaignResult.status !== 200) {
        return new Response("Error getting campaign: " + JSON.stringify(campaignResult), { status: campaignResult.status });
    }
    const campaign = campaignResult.data;
    let campaignCharacters;
    if (typeof campaign !== 'string') {
        campaignCharacters = campaign.Characters;
    } else {
        return new Response("Error: campaign data is not valid", { status: 500 });
    }
    let prompt = '';
    for (const character of campaignCharacters) {
        if (character.ID === characterId) {
            prompt = character.Prompt;
            break;
        }
    }

    // Send messages to AI
    const aiResponse = aiSendMessage(messages, message, prompt);

}