import { PrismaClient } from '@prisma/client'


export default async function dbAddTimestamp(user: number, name: string,) {
    const prisma = new PrismaClient();

    const currTime = new Date().toISOString();

    const result = await prisma.userEventLog.create({
        data: {
            User_ID: user,
            Event_Name: name,
            Timestamp: currTime
        }
    })
    if (result) {
        return {
            message: `Timestamp on ${name} successfully added to DB`,
            status: 200
        }
    } else {
        return {
            message: `Issue making timestamp on ${name}`,
            status: 500
        }
    }
    
}