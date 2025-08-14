// src/lib/server/campaignSync.ts
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const seedDir = path.resolve('src/campaign-seeds');

export async function syncCampaignsFromDisk() {
    const prisma = new PrismaClient();

    const files = fs.readdirSync(seedDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
        const id = Number(file.replace(/\.json$/, ''));
        if (!Number.isFinite(id)) {
        console.warn(`Skipping ${file} (no numeric ID)`);
        continue;
        }

        const data = fs.readFileSync(path.join(seedDir, file), 'utf8');
        let parsed;
        try {
        parsed = JSON.parse(data);
        } catch (err) {
        console.error(`Invalid JSON in ${file}`, err);
        continue;
        }

        const existing = await prisma.campaign.findUnique({ where: { Id: id } });
        if (!existing) {
        console.log(`Seeding campaign ${id} from ${file}`);
        await prisma.campaign.create({
            data: { Id: id, Data: JSON.stringify(parsed, null, 2) }
        });
        }
    }
}
