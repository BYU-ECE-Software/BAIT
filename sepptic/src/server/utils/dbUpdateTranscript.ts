import { PrismaClient } from "@prisma/client";

export default async function dbTranscript(conversationId: number, transcript: string) {
    console.log("Conversation Id that is passed into dbTranscripts", conversationId);
    const prisma = new PrismaClient();

    try {
        const trans = await prisma.transcript.findFirst({
            where: {
                Conversation_ID: conversationId
            },
        })
        console.log(trans);

        if (trans === null) { // creating blank transcript to prevent null return
            // console.log("No transcript found, creating empty transcript");
            const transNull = await prisma.transcript.create({
                data: {
                    Text: transcript,
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
        
        const transInput = await prisma.transcript.update({
            where: {
                Transcript_ID: trans.Transcript_ID,
            },
            data: {
                Text: transcript,
            }
        })
        console.log(transInput.Text); 
        return {
            status: 200,
            message: "Transcript found and updated successfully",
            data: transInput.Text
        }
    } catch (err) {
        return {
            message: 'Error creating messages: ' + err,
            status: 500
        };
    }

}