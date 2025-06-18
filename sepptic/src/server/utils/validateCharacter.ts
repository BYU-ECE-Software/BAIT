import { jsonGetCampaign } from './jsonGetCampaigns';

export default async function validateCharacter(campaignId: number, characterId: number) {
  const campaignResponse = await jsonGetCampaign(campaignId);
  const campaign = campaignResponse.data;

  console.log('🧪 Validating character:', { campaignId, characterId });
  if (typeof campaign !== 'string') {
    console.log('📋 Available characters:', campaign.Characters.map((c: any) => c.ID));
  }

  if (campaignResponse.status !== 200 || !campaign || typeof campaign === 'string') {
    console.warn('❌ Campaign not found');
    return {
      status: 404,
      message: 'Campaign not found'
    };
  }

  const character = campaign.Characters.find((c: any) => c.ID === characterId);
  if (!character) {
    console.warn('❌ Character not found:', characterId);
    return {
      status: 404,
      message: 'Character not found'
    };
  }

  return {
    status: 200,
    message: 'Character valid',
    character: character
  };
}
