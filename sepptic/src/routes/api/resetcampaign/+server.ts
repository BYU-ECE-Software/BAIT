import getUserIdFromToken from '../../../server/utils/getUserIdFromToken';
import DeleteCampaign from '../../../server/utils/dbDeleteCampaigndata';
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
    const { campaignId } = body;

    if (!campaignId || !userId) {
      console.warn('❗ Missing fields:', { campaignId, userId });
      return new Response(
        JSON.stringify({ message: 'Missing campaignId, characterId' }),
        { status: 400 }
      );
    }

    const campaignResult = DeleteCampaign(userId, campaignId);
    if (campaignResult.status !== 200) {
        console.error('❌ jsonGetCampaign failed:', campaignResult);
        return new Response(
        JSON.stringify({ message: 'Error getting campaign', detail: campaignResult }),
        { status: campaignResult.status }
        );
    }
}
catch (err) {
    console.error('POST /api/ ResetCampaign error', err);
    return new Response(
    JSON.stringify({ message: 'Internal server error', error: String(err) }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
}
}
