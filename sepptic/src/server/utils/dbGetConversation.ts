import { PrismaClient } from "@prisma/client";

// Function to get a conversation from the database.
export default async function dbGetConversation(conversationId: number) {
    const prisma = new PrismaClient();
    try {
        const conversation = await prisma.conversation.findUnique({
            where: {
                Conversation_ID: conversationId
            }
        });
        return conversation;
    } catch (error) {
        return null;
    }
}