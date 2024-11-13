import { PrismaClient } from '@prisma/client';

export default async function getUserIdFromToken(token: string) {
    const prisma = new PrismaClient();
    const session = await prisma.session.findUnique({
        where: {
            Token: token
        }
    });

    if (!session) {
        prisma.$disconnect();
        return {
            success: false,
            message: 'Invalid token',
            status: 401,
            userId: null
        }
    }

    if (session.Expiration < new Date()) {
        await prisma.session.delete({
            where: {
                Token: token
            }
        });
        prisma.$disconnect();
        return {
            success: false,
            message: 'Invalid token',
            status: 401,
            userId: null
        }
    }

    const user = await prisma.user.findUnique({
        where: {
            User_ID: session.User_ID
        }
    });

    prisma.$disconnect();

    if (!user) {
        return {
            success: false,
            message: 'Error: User was found by token but not by ID',
            status: 500,
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