import type { campaign } from './types/campaign';
import { PrismaClient } from '@prisma/client';

// Get the list of campaigns
export async function jsonGetCampaigns() {
    const prisma = new PrismaClient();

    const rows = await prisma.campaign.findMany({
        select: {Id: true, Data: true},
        orderBy: {Id: 'asc'}
    });
    const campaigns = rows.map(({Id, Data}) => {
        try {
            const parsed: campaign = JSON.parse(Data);
            const info = parsed?.Campaign_Information ?? {};
            return { // Returns the .map() function
                id: Id,
                name: info.Name ?? '',
                description: info.Description ?? '',
                brief: info.Brief ?? '',
                image: info.Image ?? ''
            }
        } catch {
            return {
                id: Id,
                name: 'Error',
                description: "Error Parsing JSON",
                brief: '',
                image: ''
            };
        }
    })
    return { campaigns, status: 200, message: 'Success' }
}

// Get a full campaign by id
export async function jsonGetCampaign(id: string | number) {
    const prisma = new PrismaClient();

    if (typeof id === "string") {
        id = Number(id); // makes sure it is an int for db lookup
    }
    try {
        const row = await prisma.campaign.findUnique({
            where: {
                Id: id
            }
        })
        // console.log(row);

        if (!row) {
            return { status: 404, id: id, data: "Campaign not found" }
        }

        try {
            const parsed: campaign = JSON.parse(row.Data);
            // console.log(parsed);
            return { status: 200, id: row.Id, data: parsed };
        } catch {
            return { status: 500, id: row.Id, data: "Error parsing campaign JSON" }
        }
    } catch (err) {
        return { status: 500, id: id, data: "Internal Error" }

    }

}