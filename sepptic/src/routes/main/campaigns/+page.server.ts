import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    const sessionToken = cookies.get('token');
    const campaignsResponse = await fetch('/api/campaigns', {
        headers: { 'Authorization': `Bearer ${sessionToken}` }
    });
    const campaigns = await campaignsResponse.json();
    return { campaigns };
};