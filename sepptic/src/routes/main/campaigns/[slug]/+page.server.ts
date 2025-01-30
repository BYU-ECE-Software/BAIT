import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
    const sessionToken = cookies.get('token');
    const slug = params.slug;
    const campaignsResponse = await fetch(`/api/campaigns/${slug}`, {
        headers: { 'Authorization': `Bearer ${sessionToken}` }
    });
    const campaign = await campaignsResponse.json();
    return campaign.data;
};