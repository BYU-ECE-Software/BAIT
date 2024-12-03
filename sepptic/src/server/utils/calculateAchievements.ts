import { jsonGetCampaign } from "./jsonGetCampaigns";
import dbGetIntel from "./dbGetIntel";

// Turn progress into list of campaign ID's
function getUniqueCampaignIds(progress: {
    Campaign_ID: number;
    Intel_Record_ID: number;
    Character_ID: number;
    Intel_ID: number;
    User_ID: number;
}[] | null) {
    if (progress === null) {
        return [];
    }
    const campaignIds = progress.map((p) => p.Campaign_ID);
    return Array.from(new Set(campaignIds));
}



export default async function calculateAchievements(userId: number) {
    const userProgressResponse = await dbGetIntel(userId);
    if (!('intel' in userProgressResponse)) {
        return {
            message: userProgressResponse.message,
            status: userProgressResponse.status
        }
    }
    const userProgress = userProgressResponse.intel;
    const campaignIds = getUniqueCampaignIds(userProgress);
    const achievements: {
        ID: number;
        Name: string;
        Description: string;
        Image: string;
    }[] = [];

    if (userProgress === null) {
        return {
            achievements: [],
            message: 'No achievements found',
            status: 200
        }
    }

    for (const campaignId of campaignIds) {
        const campaignProgress = userProgress.filter((p: any) => p.Campaign_ID === campaignId);
        const campaignResponse = await jsonGetCampaign(campaignId);
        if (campaignResponse.status !== 200 || typeof campaignResponse.data === 'string') {
            return {
                achievements: [],
                message: 'Error reading campaign file: ' + campaignResponse.data,
                status: campaignResponse.status
            }
        }
        const campaign = campaignResponse.data;
        const campaignAchievements = campaign.Achievements;
        for (const achievement of campaignAchievements) {
            const requisites = achievement.Intels;
            const hasRequisites = requisites.every((r: number) => campaignProgress.some((p: any) => p.Intel_ID === r));
            if (hasRequisites) {
                achievements.push(achievement);
            }
        }
    }

    return {
        achievements: achievements,
        message: 'Achievements calculated successfully',
        status: 200
    }
}