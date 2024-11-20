import dbAddIntel from "../server/utils/dbAddIntel";

const campaignId = 1;
const characterId = 1;
const inputIntelId = 1;
const userId = 1;
const response = await dbAddIntel(campaignId, characterId, inputIntelId, userId);
console.log(response);