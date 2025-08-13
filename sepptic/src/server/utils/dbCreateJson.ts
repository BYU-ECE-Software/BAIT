import { PrismaClient } from '@prisma/client';
import { json } from "@sveltejs/kit"

type Result =
  | { success: true; message: string }
  | { success: false; message: string; error?: string };

export default async function dbCreateJson(id: number, jsonFile: string): Promise<Result> {
    const prisma = new PrismaClient();

  // Validate it's valid JSON
  try {
    JSON.parse(jsonFile);
  } catch {
    return { success: false, message: 'Invalid JSON payload' };
  }

  try {
    // 2) Check existence using PK
    const existing = await prisma.campaign.findUnique({ where: { Id: id } });
    if (existing) {
      return { success: true, message: 'Campaign JSON already exists' };
    }

    // 3) Create
    await prisma.campaign.create({
      data: { Id: id, Data: jsonFile },
    });

    return { success: true, message: 'Campaign JSON stored successfully' };

  } catch (err: any) {
    return { success: false, message: 'Internal error', error: err?.code ?? String(err) };
  }
}
