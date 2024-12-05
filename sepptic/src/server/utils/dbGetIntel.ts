import { PrismaClient } from "@prisma/client";

// Function to check if a user exists in the database.
async function checkUser(userId: number) {
    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.findUnique({
            where: {
                User_ID: userId
            }
        });
        if (user) {
            return {
                success: true,
                message: 'User exists',
                status: 200
            }
        } else {
            return {
                success: false,
                message: 'User does not exist',
                status: 404
            }
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error checking user: ' + error,
            status: 500
        }
    }
}

// Function to get all intel for a user from the database.
export default async function dbGetIntel(userId: number, campaignId?: number) {
    const prisma = new PrismaClient();

    const userResponse = await checkUser(userId);
    if (userResponse.status !== 200) {
        return userResponse;
    }

    try {
        if (campaignId) {
            const intel = await prisma.intel.findMany({
                where: {
                    User_ID: userId,
                    Campaign_ID: campaignId
                }
            });
            return {
                intel: intel,
                message: 'Intelligence retrieved successfully',
                status: 200
            }
        }
        else {
            const intel = await prisma.intel.findMany({
                where: {
                    User_ID: userId
                }
            });
            return {
                intel: intel,
                message: 'Intelligence retrieved successfully',
                status: 200
            }
        }
    } catch (error) {
        return {
            intel: null,
            message: 'Error retrieving intelligence: ' + error,
            status: 500
        }
    }
}