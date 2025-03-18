import validateProgress from "../../../server/utils/validateProgress";
import dbAddIntel from "../../../server/utils/dbAddIntel";
import getUserIdFromToken from "../../../server/utils/getUserIdFromToken";
import type { RequestEvent } from '@sveltejs/kit';
import dbGetIntel from "../../../server/utils/dbGetIntel";
import calculateAchievements from "../../../server/utils/calculateAchievements";
import cookie from 'cookie';

// Takes in the response from dbGetIntel and sorts the intel by campaign
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
    // Authenticate and Get UserID
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

    // Parse request
    const body = await event.request.json();
    const campaignId = body.campaignId;
    const characterId = body.characterId;
    const intelId = body.intelId;

    // Validate progress
    const valid = await validateProgress(campaignId, characterId, intelId, userId);
    if (valid.status !== 200) {
        return new Response(JSON.stringify({ message: 'Invalid progress: ' + valid.message, status: valid.status }), { status: valid.status });
    }

    // Add progress to DB and return result
    const result = await dbAddIntel(campaignId, characterId, intelId, userId);
    return new Response(JSON.stringify(result), { status: result.status });
}

export async function GET(event: RequestEvent) {
    // Authenticate and Get UserID
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

    // Get intel and achievements
    const intelResponse = await dbGetIntel(userId);
    if (intelResponse.status !== 200) {
        return new Response(JSON.stringify({ message: intelResponse.message, status: intelResponse.status }), { status: intelResponse.status });
    }

    // Sort intel by campaign
    const intelByCampaignResponse = sortIntel(intelResponse);

    // Calculate achievements
    const achievementsResponse = await calculateAchievements(userId);
    if (achievementsResponse.status !== 200) {
        return new Response(JSON.stringify({ message: achievementsResponse.message, status: achievementsResponse.status }), { status: achievementsResponse.status });
    }

    // Return intel and achievements
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