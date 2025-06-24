import { PrismaClient } from "@prisma/client";

export default async function dbGetTranscript(conversationId: number) {
    console.log("Conversation Id that is passed into dbGetTranscripts", conversationId);
    const prisma = new PrismaClient();

    try {
        let trans = await prisma.transcript.findFirst({
            where: {
                Conversation_ID: conversationId
            },
        })

        if (trans === null) {
            trans = await prisma.transcript.create({
                data: {
                    Text: "",
                    Timestamp: new Date().toISOString(),
                    Conversation_ID: conversationId,
                }
            })
            return {
                status: 200,
                message: "No transcript found, empty transcript created",
                data: trans.Text
            }
        } // creating blank transcript to prevent null return
        else {
            console.log(trans.Text); 
            return {
                status: 200,
                message: "Transcript found successfully",
                data: trans.Text
            }
        }
    } catch (err) {
        return {
            message: 'Error creating messages: ' + err,
            status: 500
        };
    }

}