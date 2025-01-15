import { PrismaClient } from "@prisma/client";

export default async function dbGetMessages(conversationId: number) {
    const prisma = new PrismaClient();

    try {
        const messages = await prisma.message.findMany({
            where: {
                Conversation_ID: conversationId
            },
            orderBy: {
                Timestamp: 'asc'
            }
        });
        return {
            status: 200,
            message: 'Messages retrieved',
            messages: messages
        }
    } catch (error) {
        return {
            status: 500,
            message: error,
            messages: null
        }
    }
}