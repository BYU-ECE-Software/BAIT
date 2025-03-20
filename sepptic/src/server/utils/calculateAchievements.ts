import { jsonGetCampaign } from "./jsonGetCampaigns";
import dbGetIntel from "./dbGetIntel";

// Turn progress into list of unique campaign ID's. Basically returns a list of all the campaign ID's that the user has made progress in.
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


// Function to calculate the achievements of a user from the UserID
export default async function calculateAchievements(userId: number) {
    // Get all user progress from the database
    const userProgressResponse = await dbGetIntel(userId);
    if (!('intel' in userProgressResponse)) {
        return {
            message: userProgressResponse.message,
            status: userProgressResponse.status
        }
    }
    const userProgress = userProgressResponse.intel;
    if (userProgress === null) {
        return {
            achievements: [],
            message: 'No achievements found',
            status: 200
        }
    }

    // Get all unique campaign ID's that the user has made progress in
    const campaignIds = getUniqueCampaignIds(userProgress);

    // Initialize list of achievements
    const achievements: {
        ID: number;
        Campaign_ID: number;
        Name: string;
        Description: string;
        Image: string;
    }[] = [];

    // For each campaign, add achievements to the list if the user has all the requisites
    for (const campaignId of campaignIds) {
        // Filter the user progress to only include progress in the current campaign
        const campaignProgress = userProgress.filter((p: any) => p.Campaign_ID === campaignId);

        // Get achievements from campaign definition
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

        // For each achievement check if the user has all the requisites and add it to the list if they do
        for (const achievement of campaignAchievements) {
            if (!achievement.Intels) {
                continue;
            }
            const requisites = achievement.Intels;

            // Check if the user has all the requisites for the achievement
            const hasRequisites = requisites.every((r: number) => campaignProgress.some((p: any) => p.Intel_ID === r));

            // If the user has all the requisites, add the achievement to the list
            if (hasRequisites) {
                achievements.push({
                    ID: achievement.ID,
                    Campaign_ID: campaignId,
                    Name: achievement.Name,
                    Description: achievement.Description,
                    Image: achievement.Image
                });
            }
        }
    }

    // Return the list of achievements
    return {
        achievements: achievements,
        message: 'Achievements calculated successfully',
        status: 200
    }
}