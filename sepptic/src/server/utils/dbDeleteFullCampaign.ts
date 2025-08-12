import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function deleteCampaign(campaignId: number) {
    try {
        // Step 1: Get matching conversation IDs
        const conversations = await prisma.conversation.findMany({
            where: {
                Campaign_ID: campaignId,
            },
            select: {
                Conversation_ID: true
            }
        });

        const conversationIds = conversations.map(c => c.Conversation_ID);

        if (conversationIds.length === 0) {
            return {
                messCount: 0,
                transCount: 0,
                convoCount: 0,
                message: 'No matching conversations found',
                status: 200
            };
        }

        // Step 2: Delete messages linked to those conversations
        const messResult = await prisma.message.deleteMany({
            where: {
                Conversation_ID: {
                    in: conversationIds
                }
            }
        });

        // Step 3: Delete transcripts linked to those conversations
        const transResult = await prisma.transcript.deleteMany({
            where: {
                Conversation_ID: {
                    in: conversationIds
                }
            }
        })

        // Step 4: Delete conversations linked to campaign ID
        const convoResult = await prisma.conversation.deleteMany({
            where: {
                Campaign_ID: campaignId,
            }
        })

        return {
            messCount: messResult.count,
            transCount: transResult.count,
            convoResult: convoResult.count,
            message: 'Messages and transcripts deleted successfully',
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
