import { jsonGetCampaign } from "../../../../server/utils/jsonGetCampaigns";
import getUserIdFromToken from "../../../../server/utils/getUserIdFromToken";
import filterCharacters from "../../../../server/utils/filterCharacters";
import type { RequestEvent } from '@sveltejs/kit';
import cookie from 'cookie';

function appendCharacterTotals(campaign: any) {
    for (const character of campaign.data.Characters) {
        character.Total_Intel = character.Intel.length;
    }
    return campaign;
}

function appendCampaignTotal(campaign: any) {
    let total: number = 0;
    for (const character of campaign.data.Characters) {
        total += character.Intel.length;
    }
    campaign.data.Campaign_Information.Total_Intel = total;
    return campaign;
}

function appendTotals(campaign: any){
    let newCampaign = campaign;
    newCampaign = appendCharacterTotals(newCampaign);
    newCampaign = appendCampaignTotal(newCampaign);
    return newCampaign;
}

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
    const userId = userIdResponse.userId;
    const campaignId = event.params.slug;
    let campaign = await jsonGetCampaign(campaignId as string);
    campaign = await filterCharacters(campaign, userId);
    campaign = appendTotals(campaign);
    return new Response(JSON.stringify(campaign), { status: campaign.status });
}