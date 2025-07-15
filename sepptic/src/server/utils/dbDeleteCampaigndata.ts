import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function DeleteMessagesForConversations(userId: number, campaignId: number) {
    try {
        // Step 1: Get matching conversation IDs
        const conversations = await prisma.conversation.findMany({
            where: {
                User_ID: userId,
                Campaign_ID: campaignId,
            },
            select: {
                Conversation_ID: true
            }
        });

        const conversationIds = conversations.map(c => c.Conversation_ID);

        if (conversationIds.length === 0) {
            return {
                deletedCount: 0,
                message: 'No matching conversations found',
                status: 200
            };
        }

        // Step 2: Delete messages linked to those conversations
        const deleteResult = await prisma.message.deleteMany({
            where: {
                Conversation_ID: {
                    in: conversationIds
                }
            }
        });

        return {
            deletedCount: deleteResult.count,
            message: 'Messages deleted successfully',
            status: 200
        };
    } catch (error) {
        console.error('Error deleting messages:', error);
        return {
            deletedCount: 0,
            message: 'Failed to delete messages',
            status: 500
        };
    }
}
