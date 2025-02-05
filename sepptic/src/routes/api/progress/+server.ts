import validateProgress from "../../../server/utils/validateProgress";
import dbAddIntel from "../../../server/utils/dbAddIntel";
import getUserIdFromToken from "../../../server/utils/getUserIdFromToken";
import type { RequestEvent } from '@sveltejs/kit';
import dbGetIntel from "../../../server/utils/dbGetIntel";
import calculateAchievements from "../../../server/utils/calculateAchievements";
import cookie from 'cookie';

function sortIntel(intelResponse: any) {
    const intel = intelResponse.intel;
    const sortedIntel: { [key: string]: any[] } = {};

    intel.forEach((intelItem: any) => {
        const campaignId = intelItem.Campaign_ID;
        if (!sortedIntel[campaignId]) {
            sortedIntel[campaignId] = [];
        }
        sortedIntel[campaignId].push(intelItem);
    });

    return { intel: sortedIntel };
}

export async function POST(event: RequestEvent) {
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

    const valid = await validateProgress(campaignId, characterId, intelId, userId);
    if (valid.status !== 200) {
        return new Response(JSON.stringify({ message: 'Invalid progress: ' + valid.message, status: valid.status }), { status: valid.status });
    }

    const result = await dbAddIntel(campaignId, characterId, intelId, userId);
    return new Response(JSON.stringify(result), { status: result.status });
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

    const intelResponse = await dbGetIntel(userId);
    if (intelResponse.status !== 200) {
        return new Response(JSON.stringify({ message: intelResponse.message, status: intelResponse.status }), { status: intelResponse.status });
    }

    const intelByCampaignResponse = sortIntel(intelResponse);

    const achievementsResponse = await calculateAchievements(userId);
    if (achievementsResponse.status !== 200) {
        return new Response(JSON.stringify({ message: achievementsResponse.message, status: achievementsResponse.status }), { status: achievementsResponse.status });
    }

    if ('intel' in intelResponse) {
        return new Response(JSON.stringify({
            intel: intelResponse.intel,
            intelByCampaign: intelByCampaignResponse.intel,
            achievements: achievementsResponse.achievements
        }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: 'Intel not found', status: 404 }), { status: 404 });
    }
}