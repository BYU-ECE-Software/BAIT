import { PrismaClient } from "@prisma/client";



export default async function dbGetCampaign(id: string) {
    const prisma = new PrismaClient()
    const idNum = Number(id);
    try {
        const campaign = await prisma.campaign.findUnique({
            where: {Id: idNum},
            select: {Data: true}
        })

        if (!campaign) {
            return { success: false, message: "Campaign not found", status: 404}
        }
        
        const parsed = JSON.parse(campaign.Data);

        return {
            message: "Campaign found",
            success: true,
            parsed
        }
    } catch (err) {
        return {
            success: false,
            message: "Internal Error",
            status: 500
        }
    }
}