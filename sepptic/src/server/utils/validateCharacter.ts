import { jsonGetCampaign } from './jsonGetCampaigns';
import { PrismaClient } from "@prisma/client";

export default async function validateCharacter(campaignId: number, characterId: number) {
    // Ensure campaign exists
    const campaign = await jsonGetCampaign(campaignId);
    if (campaign.status !== 200) {
        return {
            status: 404,
            message: 'Campaign not found'
        }
    }

    // Ensure character exists
    const character = campaign.data.Characters.find((c: any) => c.ID === characterId);
    if (!character) {
        return {
            status: 404,
            message: 'Character not found'
        }
    }

    return {
        status: 200,
        message: 'Character valid'
    }
}