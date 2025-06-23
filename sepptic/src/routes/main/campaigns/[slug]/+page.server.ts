import type { PageServerLoad } from "./$types";
import { error } from '@sveltejs/kit'


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

    if (!campaignJson?.data || !Array.isArray(campaignJson.data.Characters)) {
        console.error(" Campaign data or characters missing:", campaignJson)
        throw error(500, 'Campaign data malformed or missing');
    }

    const campaign = campaignJson.data;
    const user = userJson;

    let messagesByCharacter: { [characterName: string]: { id: number, messages: any[] } } = {};

    for (const character of campaign.Characters ?? []) {
        try {
            const messagesResponse = await fetch(`/api/conversation?campaignId=${slug}&characterId=${character.ID}`, {
                headers: { 'Authorization': `Bearer ${sessionToken}` }
            });

            const messagesJson = await messagesResponse.json();

            messagesByCharacter[character.Name] = {
                id: character.ID,
                messages: messagesJson.messages || []
            };
        } catch (err) {
            console.warn(`⚠️ Failed to load messages for character ${character.Name}:`, err);
            messagesByCharacter[character.Name] = {
                id: character.ID,
                messages: []
            };
        }
    }
    
    return { campaign, user, slug, messagesByCharacter};
};

