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
    const { campaignId, characterId, call, message, fromid, fromname} = body;
    

    if (!campaignId || !characterId || !message) {
      console.warn('❗ Missing fields:', { campaignId, characterId, message });
      return new Response(
        JSON.stringify({ message: 'Missing campaignId, characterId, message' }),
        { status: 400 }
      );
    }

    const conversationResult = await dbCreateConversation(userId, campaignId, characterId, call, fromid);
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

    const Attack_Knowledge = campaign.Campaign_Information.Attack_Knowledge as Record<string,string>;

    const Full_Attack_Knowledge = Object.values(Attack_Knowledge).join('\n\n');

    // Assume Contacts is an array of IDs: number[]
    const conts: number[] = character.Prompt.Contacts || [];

    const summaries: string[] = [];

    for (const contactId of conts) {
      // find the matching character by ID
      const friend = campaignCharacters.find(c => c.ID === contactId);
      if (!friend) {
        console.warn(`No campaignCharacter with ID ${contactId}`);
        continue;
      }

      // push one concatenated string per contact
      summaries.push(
        `${friend.Name} the ${friend.Title} in your organization`
      );
    }

    const fullPrompt = `You will be taking on the folllowing persona with the following traits. 
                        Your name is ${character.Name} 
                        Only speak in English
                        You are being contacted by "${fromname}". If you are being contacted by "player" act like you are being contacted by a low level employee in your company. If you are being contacted by anyone else use the knowledge that you have about them to continue the conversation.
                        You know this general infomration ${campaign.Campaign_Information.Campaign_Knowledge}.
                        These are some of the types of social engineering attacks that people will use against you ${Full_Attack_Knowledge}.
                        Your role is that of ${character.Title}.
                        Your personality is ${character.Prompt.Personality}
                        Your background is ${character.Prompt.Background}.
                        Your Weaknesses are ${character.Prompt.Weaknesses}.
                        Your Strengths are ${character.Prompt.Strengths}.
                        The Criticial Info that you don't give out without people exploiting your weaknesses is ${character.Prompt.Critical_Info}.
                        The other People you know are ${summaries}.
                        `;
    console.log(fullPrompt);
    const aiResponse = await aiSendMessage(messagesResponse.messages, message, fullPrompt);

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
    console.log('Recieving Data');
    const url         = new URL(event.request.url);
    const campaignId  = Number(url.searchParams.get('campaignId'));
    const characterId = Number(url.searchParams.get('characterId'));
    const fromid = Number(url.searchParams.get('fromid'));
    const fromname = String(url.searchParams.get('fromname'));
    const call = Boolean(url.searchParams.get('call')) // Sets Realtime true or not
    console.log(`This is the value of call before dbCreateConversation ${call}`)

    if (isNaN(campaignId) || isNaN(characterId)) {
      return new Response(
        JSON.stringify({ message: 'Missing or invalid campaignId/characterId' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log("Calling dbCreateConversation", userId, campaignId, characterId);
    console.log("FromID:", fromid);
    console.log("fromname:", fromname);
    // — ensure conversation exists —
    const convoRes = await dbCreateConversation(userId, campaignId, characterId, call, fromid);
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
      } else {
        console.error("Error fetching transcript", trans);
        return new Response("Error fetching transcript", { status: trans.status || 500, headers: { 'Content-Type': 'application/json' } });
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