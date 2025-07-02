import getUserIdFromToken from '../../../server/utils/getUserIdFromToken';
import dbCreateConversation from '../../../server/utils/dbCreateConversation';
import dbUpdateTranscript from '../../../server/utils/dbUpdateTranscript';
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
    const { campaignId, characterId, call, transcript} = body;

    if (!campaignId || !characterId) {
      console.warn('Missing fields:', { campaignId, characterId, transcript, call });
      return new Response(
        JSON.stringify({ message: 'Missing campaignId, characterId, transcript, or call' }),
        { status: 400 }
      );
    }

    const conversationResult = await dbCreateConversation(userId, campaignId, characterId, call);
    if (conversationResult.status !== 200 || !conversationResult.conversationId) {
      console.error('dbCreateConversation failed:', conversationResult);
      return new Response(
        JSON.stringify({ message: 'Error getting conversation', detail: conversationResult }),
        { status: conversationResult.status }
      );
    }

    const conversationId = conversationResult.conversationId;

    // Sticking point here, Its failing because no data is being written to the transcript
    const transResponse = await dbUpdateTranscript(conversationId, transcript);
    if (transResponse.status !== 200) {
      console.error('dbUpdateTranscript failed:', transResponse);
      return new Response(
        JSON.stringify({ message: 'Error getting transcript', detail: transResponse }),
        { status: transResponse.status }
      );
    }
    else if (transResponse.status == 200 && transResponse.data === '') {
      console.warn('Transcript is empty, but no error occurred');
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

    return new Response(
      JSON.stringify({ content: transResponse.data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('POST /api/message uncaught error:', err);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error', error: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
