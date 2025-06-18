import getUserIdFromToken from '../../../server/utils/getUserIdFromToken';
import dbCreateConversation from '../../../server/utils/dbCreateConversationtest';
import dbGetMessages from '../../../server/utils/dbGetMessages';
import aiSendMessage from '../../../server/utils/aiSendMessage';
import dbCreateMessages from '../../../server/utils/dbCreateMessage';
import { jsonGetCampaign } from '../../../server/utils/jsonGetCampaigns';
import type { RequestEvent } from '@sveltejs/kit';
import cookie from 'cookie';

export async function POST(event: RequestEvent) {
    // Authenticate and get user ID
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

    // Get request data
    const userId = userIdResponse.userId;
    const campaignId = body.campaignId;
    const characterId = body.characterId;
    const message = body.message;
    const sentfrom = body.sentfrom;

    // Create conversation if not exists. Get conversation ID either way.
    const conversationResult = await dbCreateConversation(userId, campaignId, characterId, sentfrom);
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
    if (!messages) {
        return new Response("Error: messages not found", { status: 500 });
    }

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
    prompt += '\n\nYou are being contacted by ';
    prompt += sentfrom;
    prompt += ' pretend you are talking to them.';

    // Send messages to AI
    const aiResponse = await aiSendMessage(messages, message, prompt);
    const aiMessage = aiResponse.choices[0].message.content;
    if (!aiMessage) {
        return new Response("AI Message Error: " + aiMessage, { status: 500 });
    }

    // Add AI response to conversation in DB
    const dbMessageCreationResponse = await dbCreateMessages(conversationId, message, aiMessage);
    if (dbMessageCreationResponse.status !== 200) {
        return new Response("Error storing messages: " + JSON.stringify(dbMessageCreationResponse.message), { status: dbMessageCreationResponse.status });
    }

    // Return AI response
    return new Response(
    JSON.stringify({ content: aiMessage }),
    {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    }
    );

}

export async function GET(event: RequestEvent) {
  try {
    // — authenticate —
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    if (!cookies.token) {
      return new Response(
        JSON.stringify({ message: 'Not authenticated' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const userResp = await getUserIdFromToken(cookies.token);
    if (!userResp.success || !userResp.userId) {
      return new Response(
        JSON.stringify({ message: userResp.message }),
        { status: userResp.status, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const userId = userResp.userId;

    // — parse params —
    const url         = new URL(event.request.url);
    const campaignId  = Number(url.searchParams.get('campaignId'));
    const characterId = Number(url.searchParams.get('characterId'));
    const sentfrom = String(url.searchParams.get('sentfrom'));

    if (isNaN(campaignId) || isNaN(characterId)) {
      return new Response(
        JSON.stringify({ message: 'Missing or invalid campaignId/characterId' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // — ensure conversation exists —
    const convoRes = await dbCreateConversation(userId, campaignId, characterId, sentfrom);
    if (convoRes.status !== 200 || !convoRes.conversationId) {
      return new Response(
        JSON.stringify({ message: 'No conversation found', detail: convoRes }),
        { status: convoRes.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // — fetch messages —
    const msgsRes = await dbGetMessages(convoRes.conversationId);
    if (msgsRes.status !== 200 || !msgsRes.messages) {
      return new Response(
        JSON.stringify({ message: 'Error fetching messages', detail: msgsRes.message }),
        { status: msgsRes.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // — success →
    return new Response(
      JSON.stringify({ messages: msgsRes.messages }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('💥 GET /api/message error', err);
    return new Response(
      JSON.stringify({ message: 'Internal server error', error: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}