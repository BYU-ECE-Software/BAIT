import { PrismaClient } from "@prisma/client";
import type { message } from "./types/aiApi";

// Function to get messages from the database.
export default async function dbGetMessages(conversationId: number) {
    const prisma = new PrismaClient();

    try {
        const dbMessages = await prisma.message.findMany({
            where: {
                Conversation_ID: conversationId
            },
            orderBy: {
                Timestamp: 'asc'
            }
        });

        let messages: message[] = [];
        for (const dbMessage of dbMessages) {
            messages.push({
                role: (dbMessage.User_Sent) ? 'user' : 'assistant',
                content: dbMessage.Message,
                timestamp: dbMessage.Timestamp
            });
        }

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