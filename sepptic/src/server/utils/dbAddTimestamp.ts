import { PrismaClient } from '@prisma/client'


export default async function dbAddTimestamp(user: number, name: string,) {
    const prisma = new PrismaClient();

    const currTime = new Date().toISOString();

    await prisma.userEventLog.create({
        data: {
            User_ID: user,
            Event_Name: name,
            Timestamp: currTime
        }
    })

    return {
        message: `Timestamp on ${event} successfully added to DB`,
        status: 200
    }
}