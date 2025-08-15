import { PrismaClient } from '@prisma/client';

type Result =
  | { success: true; message: string }
  | { success: false; message: string; error?: string };

export default async function dbCreateJson(jsonFile: string): Promise<Result> {
    const prisma = new PrismaClient();

  // Validate it's valid JSON
  try {
    JSON.parse(jsonFile);
  } catch {
    return { success: false, message: 'Invalid JSON payload' };
  }

  try {
    // 2) Check existence using PK
    // const existing = await prisma.campaign.findUnique({ where: { Id: id } });
    // if (existing) {
    //   return { success: true, message: 'Campaign JSON already exists' };
    // } // I could hash the json and compare hases here to prevent duplicates in the future should this become a bigger project

    // 3) Create
    await prisma.campaign.create({
      data: { Data: jsonFile },
    });

    return { success: true, message: 'Campaign JSON stored successfully' };

  } catch (err: any) {
    return { success: false, message: 'Internal error', error: err?.code ?? String(err) };
  }
}
