import { PrismaClient } from "@prisma/client";

export default async function dbGetTranscript(conversationId: number) {
    console.log("Conversation Id that is passed into dbGetTranscripts", conversationId);
    const prisma = new PrismaClient();

    try {
        const trans = await prisma.transcript.findFirst({
            where: {
                Conversation_ID: conversationId
            },
        })

        console.log(trans.Transcript); 
        return trans.Transcript

        
    } catch (err) {
        console.error(`Error grabbing transcript from ${conversationId}`, err);
    }

}