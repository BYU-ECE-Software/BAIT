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
        const deleteMessage = await prisma.message.deleteMany({
            where: {
                Conversation_ID: {
                    in: conversationIds
                }
            }
        });

        // Step 3: Delete transcripts linked to conversations
        const deleteTranscript = await prisma.transcript.deleteMany({
            where: {
                Conversation_ID: {
                    in: conversationIds
                }
            }
        })

        return {
            deletedCount: deleteMessage.count + deleteTranscript.count,
            message: 'Messages & Transcripts deleted successfully',
            status: 200
        };
    } catch (error) {
        console.error('Error deleting messages:', error);
        return {
            deletedCount: 0,
            message: 'Failed to delete messages & transcripts',
            status: 500
        };
    }
}
