import { PrismaClient } from '@prisma/client';
import { validatePassword } from './crypto';
import getUserId from './getUserId';

// Helper function to get the user
async function getUser(userId: number) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
        where: {
            User_ID: userId
        }
    });
    prisma.$disconnect();
    return user;
}

// Main function to authenticate a user
export default async function dbCreateUser(email: string, password: string) {
    const response = await getUserId(email);
    if (!response.userId) {
        return {
            success: false,
            message: 'Invalid email or password',
            status: 400,
            userId: null
        }
    }

    const user = await getUser(response.userId)
    if (!user) {
        return {
            success: false,
            message: 'Error: User was found by email but by ID',
            status: 500,
            userId: null
        }
    }

    if (!await validatePassword(password, user.Password)) {
        return {
            success: false,
            message: 'Invalid email or password',
            status: 400,
            userId: null
        }
    }

    return {
        success: true,
        message: 'User authenticated successfully',
        status: 200,
        userId: user.User_ID
    }
}