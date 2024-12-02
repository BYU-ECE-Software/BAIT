import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const tokenValidityLength = 30; // Days

// Function to generate a random base64 token with 32 characters.
function generateToken() {
    const token = crypto.randomBytes(32).toString('base64');
    return token;
}

// Function to get a datetime that is x days in the future.
function getExpiration() {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + tokenValidityLength);
    return expiration;
}

// Function to write a new session to the database.
async function writeSession(userId: number, token: string, expiration: Date) {
    const prisma = new PrismaClient();
    try {
        const session = await prisma.session.create({
            data: {
                User_ID: userId,
                Token: token,
                Expiration: expiration
            }
        });
        const sessionResult = session;
        return {
            token: sessionResult.Token,
            expiration: sessionResult.Expiration,
            message: 'Session created successfully',
            status: 200
        }
    } catch (error) {
        return {
            sessionId: null,
            token: null,
            expiration: null,
            message: 'Error creating sessionL: ' + error,
            status: 500
        }
    }
}

// Main function to create a new session for a user in the database. Returns an object with the sessionId, token, message, and status.
export default async function dbCreateSession(userId: number) {
    const sessionToken = generateToken();
    const expiration = getExpiration();
    const response = await writeSession(userId, sessionToken, expiration);
    return response;
}