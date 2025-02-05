import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
    const sessionToken = cookies.get('token');
    const slug = params.slug;
    const campaignsResponse = await fetch(`/api/campaigns/${slug}`, {
        headers: { 'Authorization': `Bearer ${sessionToken}` }
    });
    const userResponse = await fetch('/api/profile', {
        headers: { 'Authorization': `Bearer ${sessionToken}` }
    });
    const campaignJson = await campaignsResponse.json();
    const userJson = await userResponse.json();
    const campaign = campaignJson.data;
    const user = userJson;
    return { campaign, user, slug };
};