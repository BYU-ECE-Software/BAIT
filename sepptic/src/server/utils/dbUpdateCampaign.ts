import { PrismaClient } from "@prisma/client";
import { error } from "@sveltejs/kit";
import type { campaign } from "./types/campaign";


export default async function dbUpdateCampaign(campaignId: string | undefined, newData: string | campaign) {
    const prisma = new PrismaClient();
    try{
        if (!campaignId) { // Check if Id is undefined 
            throw error(400, "Id is undefined")
        }

        const input = Number(campaignId);

        const updateCampaign = await prisma.campaign.update({
            where: {
                Id: input
            },
            data: {
                Data: newData
            }
        })

        return {
            message: "Campaign update successful",
            success: true,
            status: 200
        }
    } catch (err) {
        console.log("Error updating JSON: ", err);
        return { message: `Failed to update campaign JSON for ${campaignId}`, success: false}
    }

}