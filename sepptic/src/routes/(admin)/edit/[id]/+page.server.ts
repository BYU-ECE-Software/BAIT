import { error } from '@sveltejs/kit';
import type { PageServerLoad, RouteParams } from './$types';
import { PrismaClient } from '@prisma/client';

export const load: PageServerLoad = async ({ params }) => {
    const prisma = new PrismaClient();
    const campaignId = Number(params.id);
    console.log("Campaign ID in load function: ", campaignId);
    if (!Number.isFinite(campaignId)) throw error(400, 'Invalid id');

    const row = await prisma.campaign.findUnique({ where: { Id: campaignId } });
    if (!row) throw error(404, 'Campaign not found');

    let campaign;
    try { campaign = JSON.parse(row.Data); }
    catch { throw error(500, 'Stored campaign JSON is invalid'); }

    return { campaignId, campaign };
};
