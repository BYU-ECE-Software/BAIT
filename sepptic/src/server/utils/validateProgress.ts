import { jsonGetCampaign } from './jsonGetCampaigns';
import { PrismaClient } from "@prisma/client";

export default async function validateProgress(campaignId: number, characterId: number, intelId: number, userId: number) {
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

    // Ensure intel exists
    const intel = character.Intel.find((i: any) => i.Intel_ID === intelId);
    if (!intel) {
        return {
            status: 404,
            message: 'Intel not found'
        }
    }

    // Ensure intel is not already known
    const prisma = new PrismaClient();
    const intelRecord = await prisma.intel.findFirst({
        where: {
            Campaign_ID: campaignId,
            Character_ID: characterId,
            Intel_ID: intelId,
            User_ID: userId
        }
    });
    if (intelRecord) {
        return {
            status: 400,
            message: 'Intel already known'
        }
    }

    return {
        status: 200,
        message: 'Intel valid'
    }
}