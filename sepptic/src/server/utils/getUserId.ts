import { PrismaClient } from '@prisma/client';

export default async function getUserId(email: string) {
    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.findFirst({
            where: {
                Email: email
            }
        });
        if (!user) {
            return {
                userId: null,
                message: 'User not found',
                status: 404
            }
        }
        return {
            userId: user.User_ID,
            message: 'User found',
            status: 200
        }
    } catch (e) {
        return {
            userId: null,
            message: 'Error finding user: ' + e,
            status: 500
        }
    }
}