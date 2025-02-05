import type { PageServerLoad } from "./$types";

function calculateProgresses(userProgress: any, campaign: any, slug: string) {
    let progresses = {
        'campaign': 0,
        'characters': {}
    };
    if (!userProgress.intelByCampaign[slug]){
        return progresses;
    }
    const userTotalIntel = userProgress.intelByCampaign[slug].length;
    const totalCampaignIntel = campaign.Campaign_Information.Total_Intel;
    const campaignProgress = Math.floor((userTotalIntel / totalCampaignIntel) * 100);
    progresses['campaign'] = campaignProgress;
    
    let characterProgresses: { [key: string]: number } = {};
    campaign.Characters.forEach((character: any) => {
        const characterIntel = character.Total_Intel;
        const userCharacterIntel = userProgress.intelByCampaign[slug].filter((intel: any) => intel.Character_ID === character.ID).length;
        const characterProgress = Math.floor((userCharacterIntel / characterIntel) * 100);
        characterProgresses[character.ID] = characterProgress;
    });
    progresses['characters'] = characterProgresses;
    return progresses;
}

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
    const sessionToken = cookies.get('token');
    const slug = params.slug;
    const campaignsResponse = await fetch(`/api/campaigns/${slug}`, {
        headers: { 'Authorization': `Bearer ${sessionToken}` }
    });
    const userResponse = await fetch('/api/profile', {
        headers: { 'Authorization': `Bearer ${sessionToken}` }
    });
    const userProgressResponse = await fetch('/api/progress', {
        headers: { 'Authorization': `Bearer ${sessionToken}` }
    })
    const userProgress = await userProgressResponse.json();
    const campaignJson = await campaignsResponse.json();
    const userJson = await userResponse.json();
    const campaign = campaignJson.data;
    const user = userJson;
    const progresses = calculateProgresses(userProgress, campaign, slug);
    console.log(userProgress.intelByCampaign[slug]);
    return { campaign, user, slug, progresses, userProgress };
};