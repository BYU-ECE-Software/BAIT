import type { RequestEvent } from '@sveltejs/kit';
import cookie from 'cookie';
import validateProgress from "../../../server/utils/validateProgress";
import dbAddIntel from "../../../server/utils/dbAddIntel";
import getUserIdFromToken from "../../../server/utils/getUserIdFromToken";
import { jsonGetCampaign } from "../../../server/utils/jsonGetCampaigns";
import filterCharacters from "../../../server/utils/filterCharacters";

function campaignAppendCharacterTotals(campaign: any) {
    for (const character of campaign.data.Characters) {
        character.Total_Intel = character.Intel.length;
    }
    return campaign;
}

function campaignAppendCampaignTotal(campaign: any) {
    let total: number = 0;
    for (const character of campaign.data.Characters) {
        total += character.Intel.length;
    }
    campaign.data.Campaign_Information.Total_Intel = total;
    return campaign;
}

function campaignAppendTotals(campaign: any){
    let newCampaign = campaign;
    newCampaign = campaignAppendCharacterTotals(newCampaign);
    newCampaign = campaignAppendCampaignTotal(newCampaign);
    return newCampaign;
}

async function checkQuiz(campaignId: number, characterId: number, intelId: number, userId: number, userAnswer: string) {
    let campaign = await jsonGetCampaign(campaignId);
    campaign = await filterCharacters(campaign, userId);
    campaign = campaignAppendTotals(campaign);
    if (!campaign || typeof campaign.data === 'string') {
        return false;
    }
    const character = campaign.data.Characters.find((character: any) => character.ID === characterId);
    if (!character) {
        return false;
    }
    const intel = character.Intel.find((intel: any) => intel.Intel_ID === intelId);
    if (!intel) {
        return false;
    }
    const correctAnswer = intel.Answer.toLowerCase();
    if (userAnswer.toLowerCase().includes(correctAnswer)) {
        return true;
    }
    return false;
}

export async function POST(event: RequestEvent){
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
    const intelId = body.intelId;
    const userAnswer = body.userAnswer;

    const valid = await validateProgress(campaignId, characterId, intelId, userId);
    if (valid.status !== 200) {
        return new Response(JSON.stringify({ message: 'Invalid progress: ' + valid.message, status: valid.status }), { status: valid.status });
    }

    const correct = await checkQuiz(campaignId, characterId, intelId, userId, userAnswer);

    if (correct) {
        const result = await dbAddIntel(campaignId, characterId, intelId, userId);
        if (result.status !== 200) {
            return new Response(JSON.stringify({ message: 'Error adding intel: ' + result.message, status: result.status }), { status: result.status });
        }
    }

    if (!correct) {
        return new Response(JSON.stringify({ message: 'Incorrect quiz answer', correct: false}), { status: 200 });
    }

    return new Response(JSON.stringify({ message: 'Correct quiz answer', correct: true }), { status: 200 });
}