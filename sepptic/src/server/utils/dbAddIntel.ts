import { PrismaClient } from "@prisma/client";

// Function to add a new intelligence to the database.
export default async function dbAddIntel(campaignId: number, characterId: number, inputIntelId: number, userId: number) {
    const prisma = new PrismaClient();

    try {
        const user = await prisma.user.findUnique({
            where: {
                User_ID: userId
            }
        });
        if (!user) {
            return {
                intelId: null,
                message: 'User not found',
                status: 404
            }
        }
        const intel = await prisma.intel.create({
            data: {
                Campaign_ID: campaignId,
                Character_ID: characterId,
                Intel_ID: inputIntelId,
                User_ID: user.User_ID
            }
        });
        const intelRecordId = intel.Intel_Record_ID;
        return {
            intelId: intelRecordId,
            message: 'Intelligence recorded successfully',
            status: 200
        }
    } catch (error) {
        return {
            intelId: null,
            message: 'Error recording intelligence: ' + error,
            status: 500
        }
    }
}