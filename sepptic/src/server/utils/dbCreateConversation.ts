import { PrismaClient } from '@prisma/client';
import validateCharacter from './validateCharacter';

// Function to check if a conversation already exists for this user/character pair.
async function checkExistingConversation(userId: number, campaignId: number, characterId: number) {
    const prisma = new PrismaClient();
    try {
        const conversation = await prisma.conversation.findFirst({
            where: {
                User_ID: userId,
                Campaign_ID: campaignId,
                Character_ID: characterId
            }
        });
        return conversation;
    } catch (error) {
        return null;
    }
}

// Function to write a new conversation to the database.
async function writeConversation(userId: number, campaignId: number, characterId: number) {
    const prisma = new PrismaClient();
    try {
        const conversation = await prisma.conversation.create({
            data: {
                User_ID: userId,
                Campaign_ID: campaignId,
                Character_ID: characterId,
                //Realtime: false // ✅ ADD THIS HERE
            }
        });
        return {
            conversationId: conversation.Conversation_ID,
            message: 'Conversation created successfully',
            status: 200
        };
    } catch (error) {
        return {
            conversationId: null,
            message: 'Error creating conversation: ' + error,
            status: 500
        };
    }
}


// Main function to create a new conversation for a user in the database. Returns an object with the conversationId, message, and status.
export default async function dbCreateConversation(userId: number, campaignId: number, characterId: number) {
  console.log('📥 Creating conversation for:', { userId, campaignId, characterId });

  const existingConversation = await checkExistingConversation(userId, campaignId, characterId);
  if (existingConversation) {
    console.log('🔁 Found existing conversation:', existingConversation.Conversation_ID);
    return {
      conversationId: existingConversation.Conversation_ID,
      message: 'Conversation already exists',
      status: 200
    };
  }

  const characterValidationResponse = await validateCharacter(campaignId, characterId);
  console.log('✅ Character validation result:', characterValidationResponse);

  if (characterValidationResponse.status !== 200) {
    return {
      conversationId: null,
      message: characterValidationResponse.message,
      status: characterValidationResponse.status
    };
  }

  const response = await writeConversation(userId, campaignId, characterId);
  console.log('📝 Write conversation result:', response);
  return response;
}