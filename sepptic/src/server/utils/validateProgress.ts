import { PrismaClient } from "@prisma/client";
import validateCharacter from './validateCharacter';

export default async function validateProgress(campaignId: number, characterId: number, intelId: number, userId: number) {
    // Ensure campaign and character exist
    const characterValidationResponse = await validateCharacter(campaignId, characterId);
    if (characterValidationResponse.status !== 200 || !characterValidationResponse.character) {
        return characterValidationResponse;
    }
    const character = characterValidationResponse.character;

    // Ensure intel exists
    const intel = character.Intel.find((i: any) => i.Intel_ID === intelId);
    if (!intel) {
        return {
            status: 404,
            message: 'Intel not found'
        }
    }

    // Ensure intel is not already known
    const prisma = new PrismaClient();
    const intelRecord = await prisma.intel.findFirst({
        where: {
            Campaign_ID: campaignId,
            Character_ID: characterId,
            Intel_ID: intelId,
            User_ID: userId
        }
    });
    if (intelRecord) {
        return {
            status: 400,
            message: 'Intel already known'
        }
    }

    return {
        status: 200,
        message: 'Intel valid'
    }
}