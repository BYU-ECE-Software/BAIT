import { PrismaClient } from "@prisma/client";

export default async function dbGetTranscript(conversationId: number) {
    console.log("Conversation Id that is passed into dbGetTranscript", conversationId);
    const prisma = new PrismaClient();

    try {
        const trans = await prisma.transcript.findFirst({
            where: {
                Conversation_ID: conversationId
            },
        })
        if (trans === null) { // creating blank transcript to prevent null return
            console.log("No transcript found, creating empty transcript");
            const transNull = await prisma.transcript.create({
                data: {
                    Text: "",
                    Timestamp: new Date().toISOString(),
                    Conversation_ID: conversationId,
                }
            })
            return {
                status: 200,
                message: "No transcript found, empty transcript created",
                data: transNull.Text
            }
        } 
        return {
            status: 200,
            message: "Transcript found",
            data: trans.Text
        };
    } catch (err) {
        return {
            message: 'Error finding transcript: ' + err,
            status: 500
        };
    }

}