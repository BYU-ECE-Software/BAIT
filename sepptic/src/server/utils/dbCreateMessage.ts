import { PrismaClient } from '@prisma/client';

export default async function dbCreateMessages(conversationId: number, userMessage: string, aiMessage: string) {
    const prisma = new PrismaClient();
    try {
        const userMessageStatus = await prisma.message.create({
            data: {
                Conversation_ID: conversationId,
                Message: userMessage,
                User_Sent: true,
                Timestamp: new Date().toISOString()
            }
        });
        const aiMessageStatus = await prisma.message.create({
            data: {
            Conversation_ID: conversationId,
            Message: aiMessage,
            User_Sent: false,
            Timestamp: new Date().toISOString()
            }
        });
        return {
            message: 'Messages created successfully',
            status: 200
        }
    } catch (error) {
        return {
            message: 'Error creating messages: ' + error,
            status: 500
        };
    }
}