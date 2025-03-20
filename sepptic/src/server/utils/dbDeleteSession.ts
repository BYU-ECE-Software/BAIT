import { PrismaClient } from '@prisma/client'

// Function to check if a session exists in the database.
async function checkSession(token: string) {
    const prisma = new PrismaClient();
    try {
        const session = await prisma.session.findUnique({
            where: {
                Token: token
            }
        });
        if (session) {
            return {
                message: 'Session exists',
                status: 200
            }
        } else {
            return {
                message: 'Session does not exist',
                status: 404
            }
        }
    } catch (error) {
        return {
            message: 'Error checking session: ' + error,
            status: 500
        }
    }
}

// Function to delete a session from the database.
async function deleteSession(token: string) {
    const prisma = new PrismaClient();
    try {
        await prisma.session.delete({
            where: {
                Token: token
            }
        });
        return {
            message: 'Session deleted. User logged out.',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Error deleting session: ' + error,
            status: 500
        }
    }
}

// Function to delete a session from the database.
export default async function dbDeleteSession(token: string) {
    const checkResponse = await checkSession(token);
    if (checkResponse.status !== 200) {
        return checkResponse;
    }
    const deleteResponse = await deleteSession(token);
    return deleteResponse;
}

// Function to delete all sessions for a user from the database.
export async function dbDeleteUserSessions(userId: number) {
    const prisma = new PrismaClient();
    try {
        await prisma.session.deleteMany({
            where: {
                User_ID: userId
            }
        });
        return {
            message: 'Sessions deleted. User logged out.',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Error deleting sessions: ' + error,
            status: 500
        }
    }
}