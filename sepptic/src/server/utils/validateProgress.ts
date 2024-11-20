import { jsonGetCampaign } from './jsonGetCampaigns';

export default async function validateProgress(campaignId: number, characterId: number, intelId: number, userId: number) {
    // Ensure campaign exists
    const campaign = await jsonGetCampaign(campaignId);
    if (campaign.status !== 200) {
        return false;
    }

    // Ensure character exists
    const character = campaign.data.Characters.find((c: any) => c.ID === characterId);
    if (!character) {
        return false;
    }

    // Ensure intel exists
    const intel = character.Intel.find((i: any) => i.Intel_ID === intelId);
    if (!intel) {
        return false;
    }

    return true;
}