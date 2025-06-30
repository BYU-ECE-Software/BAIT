import getUserIdFromToken from '../../../server/utils/getUserIdFromToken';
import dbCreateConversation from '../../../server/utils/dbCreateConversation';
import dbGetMessages from '../../../server/utils/dbGetMessages';
import aiSendMessage from '../../../server/utils/aiSendMessage';
import dbCreateMessages from '../../../server/utils/dbCreateMessage';
import dbGetTranscript from '../../../server/utils/dbGetTranscript';
import { jsonGetCampaign } from '../../../server/utils/jsonGetCampaigns';
import type { RequestEvent } from '@sveltejs/kit';
import cookie from 'cookie';

export async function POST(event: RequestEvent) {
  try {
    const body = await event.request.json();
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const token = cookies.token;

    if (!token) {
      return new Response(JSON.stringify({ message: 'No token provided' }), { status: 400 });
    }

    const userIdResponse = await getUserIdFromToken(token);
    if (!userIdResponse.success || !userIdResponse.userId) {
      return new Response(
        JSON.stringify({ message: userIdResponse.message }),
        { status: userIdResponse.status }
      );
    }

    const userId = userIdResponse.userId;
    const { campaignId, characterId, call, message} = body;

    if (!campaignId || !characterId || !message) {
      console.warn('❗ Missing fields:', { campaignId, characterId, message });
      return new Response(
        JSON.stringify({ message: 'Missing campaignId, characterId, message' }),
        { status: 400 }
      );
    }

    const conversationResult = await dbCreateConversation(userId, campaignId, characterId, call);
    if (conversationResult.status !== 200 || !conversationResult.conversationId) {
      console.error('❌ dbCreateConversation failed:', conversationResult);
      return new Response(
        JSON.stringify({ message: 'Error getting conversation', detail: conversationResult }),
        { status: conversationResult.status }
      );
    }

    const conversationId = conversationResult.conversationId;

    const messagesResponse = await dbGetMessages(conversationId);
    if (messagesResponse.status !== 200 || !messagesResponse.messages) {
      console.error('❌ dbGetMessages failed:', messagesResponse);
      return new Response(
        JSON.stringify({ message: 'Error getting messages', detail: messagesResponse }),
        { status: messagesResponse.status }
      );
    }

    const campaignResult = jsonGetCampaign(campaignId);
    if (campaignResult.status !== 200) {
      console.error('❌ jsonGetCampaign failed:', campaignResult);
      return new Response(
        JSON.stringify({ message: 'Error getting campaign', detail: campaignResult }),
        { status: campaignResult.status }
      );
    }

    const campaign = campaignResult.data;
    let campaignCharacters;
    if (typeof campaign !== 'string') {
      campaignCharacters = campaign.Characters;
    } else {
      throw new Error('Campaign data is not valid');
    }

    const character = campaignCharacters.find((c) => c.ID === characterId);
    if (!character || !character.Prompt) {
      return new Response(
        JSON.stringify({ message: 'Prompt not found for character' }),
        { status: 400 }
      );
    }

    const aiResponse = await aiSendMessage(messagesResponse.messages, message, character.Prompt);
    const aiMessage = aiResponse?.choices?.[0]?.message?.content;
    if (!aiMessage) {
      throw new Error('AI response is missing or malformed');
    }

    const dbMessageCreationResponse = await dbCreateMessages(conversationId, message, aiMessage);
    if (dbMessageCreationResponse.status !== 200) {
      console.error('❌ dbCreateMessages failed:', dbMessageCreationResponse);
      return new Response(
        JSON.stringify({ message: 'Error storing messages', detail: dbMessageCreationResponse }),
        { status: dbMessageCreationResponse.status }
      );
    }

    return new Response(
      JSON.stringify({ content: aiMessage }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('🔥 POST /api/message uncaught error:', err);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error', error: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
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
    console.log("Parsed token:", cookies.token);
    const userResp = await getUserIdFromToken(cookies.token);
    if (!userResp.success || !userResp.userId) {
      return new Response(
        JSON.stringify({ message: userResp.message }),
        { status: userResp.status, headers: { 'Content-Type': 'application/json' } }
      );
    }
    console.log("User response:", userResp);
    const userId = userResp.userId;

    // — parse params —
    const url         = new URL(event.request.url);
    const campaignId  = Number(url.searchParams.get('campaignId'));
    const characterId = Number(url.searchParams.get('characterId'));
    const call = Boolean(url.searchParams.get('call')) // Sets Realtime true or not
    console.log(`This is the value of call before dbCreateConversation ${call}`)

    if (isNaN(campaignId) || isNaN(characterId)) {
      return new Response(
        JSON.stringify({ message: 'Missing or invalid campaignId/characterId' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log("Calling dbCreateConversation", userId, campaignId, characterId);
    // — ensure conversation exists —
    const convoRes = await dbCreateConversation(userId, campaignId, characterId, call);
    if (convoRes.status !== 200 || !convoRes.conversationId) {
      return new Response(
        JSON.stringify({ message: 'No conversation found', detail: convoRes }),
        { status: convoRes.status, headers: { 'Content-Type': 'application/json' } }
      );
    }
    console.log("Conversation result:", convoRes);

    // Realtime AI transcript logic
    if(call) {
      console.log("Call is set as true, fetching transcript")
      const trans = await dbGetTranscript(convoRes.conversationId);
      if (trans.status === 404) {
        return new Response(
          JSON.stringify({message: "Error fetching transcript", detail: trans.message}),
          { status: trans.status, headers: { 'Content-Type': 'application/json' } }
        )
      } else if (trans.status === 200) {
        console.log("Transcript result:", trans);
        return new Response(
          JSON.stringify({ data: trans.data }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

    } else if (!call) {
      // — fetch messages —
      console.log("Fetching messages for convoId:", convoRes.conversationId);
      const msgsRes = await dbGetMessages(convoRes.conversationId);
      if (msgsRes.status !== 200 || !msgsRes.messages) {
        return new Response(
          JSON.stringify({ message: 'Error fetching messages', detail: msgsRes.message }),
          { status: msgsRes.status, headers: { 'Content-Type': 'application/json' } }
        );
      }
      console.log("Messages result:", msgsRes);
      // — success →
      return new Response(
        JSON.stringify({ messages: msgsRes.messages }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    

  } catch (err) {
    console.error('GET /api/message error', err);
    return new Response(
      JSON.stringify({ message: 'Internal server error', error: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}