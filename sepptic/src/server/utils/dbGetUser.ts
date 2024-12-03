import { PrismaClient } from "@prisma/client";

// Get a user from the database.

export default async function dbGetUser(userId: number) {
    const prisma = new PrismaClient();

    try {
        const user = await prisma.user.findUnique({
            where: {
                User_ID: userId
            }
        });
        if (user) {
            return {
                user: user,
                message: 'User retrieved successfully',
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
            message: 'Error retrieving user: ' + error,
            status: 500
        }
    }
}