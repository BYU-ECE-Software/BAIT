import { PrismaClient } from '@prisma/client';
import { validatePassword } from './crypto';
import getUserId from './getUserId';
import type { dbAuthUserResult } from './types/functionResults';
import type { dbUser } from './types/dbResults';

// Get the user from the database
async function getUser(userId: number): Promise<dbUser> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
        where: {
            User_ID: userId
        }
    });
    prisma.$disconnect();
    return user;
}

// Takes in an email and password and returns a result object with the success status, message, status code, and user ID
export default async function dbAuthUser(email: string, password: string): Promise<dbAuthUserResult> {
    // Get user id from the email
    const response = await getUserId(email);

    // Ensure that the user exists
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

    // Validate the password
    if (!await validatePassword(password, user.Password)) {
        return {
            success: false,
            message: 'Invalid email or password',
            status: 400,
            userId: null
        }
    }

    // Return true
    return {
        success: true,
        message: 'User authenticated successfully',
        status: 200,
        userId: user.User_ID
    }
}