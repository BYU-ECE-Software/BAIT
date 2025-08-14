import { PrismaClient } from "@prisma/client";


export default async function dbDeleteJson(id: number) {
    const prisma = new PrismaClient();

    try {
        const result = await prisma.campaign.delete({
            where: {
                Id: id
            }
        });

        return {
            message: `Campaign ${result.Id} JSON deleted successfully`,
            success: true
        }

    } catch (err: any) {
        if (err.code === 'P2025') {
            return { message: "Campaign not found", success: false };
        }
        return { message: "Internal error", success: false, error: err?.message };
    }
}