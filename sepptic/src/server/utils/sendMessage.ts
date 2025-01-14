import dbGetConversation from './dbGetConversation';

// Validate the conversation ID. Ensure it exists and is associated with the user.
// Add the user message to the database.
// Assemble the message and send it to ChatGPT.
//      Get prompt from campaign definition file. Add as a developer note.
//      Get the last x messages from the database. Add as user and assistant notes respectively.
//      Send the message to ChatGPT.
// Add the response to the database.
// Return the response.


export default async function sendMessage(userId: number, conversationId: number, message: string) {
    // Validate the conversation ID. Ensure it exists and is associated with the user.
    const conversation = await dbGetConversation(conversationId);
    if (!conversation || conversation.User_ID !== userId) {
        return { message: 'Conversation not found', status: 404 };
    }

    // Add the user message to the database.
    const userMessage = await dbCreateMessage(conversationId, userId, message, true);

    // Assemble the message and send it to ChatGPT.
    const campaign = await dbGetCampaign(conversation.campaignId);
    const prompt = campaign.prompt;
    const messages = await dbGetMessages(conversationId, 5);
    const developerNote = `Prompt: ${prompt}`;
    const userNotes = messages.filter(m => m.userId === userId).map(m => m.message).join('\n');
    const assistantNotes = messages.filter(m => m.userId !== userId).map(m => m.message).join('\n');
    const response = await chatGPT(developerNote, userNotes, assistantNotes, userMessage.message);

    // Add the response to the database.
    const assistantMessage = await dbCreateMessage(conversationId, 0, response);

    return { message: 'Message sent', status: 200 };
}