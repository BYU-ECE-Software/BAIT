import dbGetIntel from "./dbGetIntel";

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

async function getUserCampaignIntel(userId: number, campaignId: string) {
    const intelResponse = await dbGetIntel(userId);
    const intelByCampaignResponse = sortIntel(intelResponse);
    const userCampaignIntel = intelByCampaignResponse.intel[campaignId];
    let userIntelIDs = [];
    for(const intel of userCampaignIntel) {
        userIntelIDs.push(intel.Intel_ID);
    }
    return userIntelIDs;
}

function getRequiredIntel(character: any, campaign: any) {
    let requiredIntel = [];
    for(const campaign_character of campaign.data.Characters) {
        for(const intel of campaign_character.Intel) {
            if (intel.Unlocks_Character_ID && intel.Unlocks_Character_ID == character.ID) {
                requiredIntel.push(intel.Intel_ID);
            }
        }
    }
    return requiredIntel;
}

export default async function filterCharacters(unfilteredCampaign: any, userId: number) {
    let campaign = unfilteredCampaign;
    const userIntelIDs = await getUserCampaignIntel(userId, campaign.id);
    // For each character in the campaign
    for(const character of campaign.data.Characters) {
        // Determine required intel
        const requiredIntelIDs = getRequiredIntel(character, campaign);
        // Determine if user has required intel
        let unlocked = true;
        for(const requiredIntelID of requiredIntelIDs) {
            if(!userIntelIDs.includes(requiredIntelID)) {
                unlocked = false;
            }
        }
        // If user does not have required intel, remove character from campaign
        if(!unlocked) {
            campaign.data.Characters = campaign.data.Characters.filter((c: any) => c.ID !== character.ID);
        }
    }
    return campaign;
}