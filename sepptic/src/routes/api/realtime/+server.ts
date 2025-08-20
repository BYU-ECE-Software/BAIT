import { json } from "@sveltejs/kit";
import type { RequestEvent } from '@sveltejs/kit'
import { jsonGetCampaign } from '../../../server/utils/jsonGetCampaigns';

export async function POST(event: RequestEvent) {

  const body = await event.request.json();

  let voiceType = body.voice; // The voice type to use for the AI response; comes from the CallCard request
  let prompt = body.prompt; // The prompt to send to the AI
  let campaignId = body.campaignId; // The campaign ID to use for the AI
  let characterId = body.characterId; // The character ID to use for the AI

const campaignResult = await jsonGetCampaign(campaignId);
    if (campaignResult.status !== 200) {
      console.error('❌ jsonGetCampaign failed in realtime:', campaignResult);
      return new Response(
        JSON.stringify({ message: 'Error getting campaign', detail: campaignResult }),
        { status: campaignResult.status }
      );
    }

    const campaign = campaignResult.data;
    let campaignCharacters;
    if (typeof campaign !== 'string') {
      campaignCharacters = campaign.Characters;
    } else {
      throw new Error('Campaign data is not valid');
    }

    const character = campaignCharacters.find((c) => c.ID === characterId);
    if (!character || !character.Prompt) {
      return new Response(
        JSON.stringify({ message: 'Prompt not found for character' }),
        { status: 400 }
      );
    }

    const Attack_Knowledge = campaign.Campaign_Information.Attack_Knowledge as Record<string,string>;

    const Full_Attack_Knowledge = Object.values(Attack_Knowledge).join('\n\n');

    // Assume Contacts is an array of IDs: number[]
    const conts: number[] = character.Prompt.Contacts || [];

    const summaries: string[] = [];

    for (const contactId of conts) {
      // find the matching character by ID
      const friend = campaignCharacters.find(c => c.ID === contactId);
      if (!friend) {
        console.warn(`No campaignCharacter with ID ${contactId}`);
        continue;
      }

      // push one concatenated string per contact
      summaries.push(
        `${friend.Name} the ${friend.Title} in your organization`
      );
    }

    const fullPrompt = `You will be taking on the following persona with the following traits:
                        Your name is ${character.Name}.
                        Only speak in English.
                        You know this general information ${campaign.Campaign_Information.Campaign_Knowledge}.
                        These are some of the types of social engineering attacks that people will use against you: ${Full_Attack_Knowledge}.
                        Your role: ${character.Title}.
                        Your personality: ${character.Prompt.Personality}.
                        Your background: ${character.Prompt.Background}.
                        Your Weaknesses: ${character.Prompt.Weaknesses}.
                        Your Strengths: ${character.Prompt.Strengths}.
                        The Critical Info that you don't give out without people exploiting your weaknesses is: ${character.Prompt.Critical_Info}.
                        The other People you know are: ${summaries}.
                        `;

  console.log("Full Prompt:", fullPrompt);
  try {
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2025-06-03",
        voice: voiceType,
        instructions: fullPrompt,
        input_audio_transcription: {
          model: "whisper-1",
          language: "en", // Set the language to English
        } // Enable input audio transcription for tracking user input
      }),
    });

    if (!response.ok) {
      // If the response is not OK, throw an error
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    // Send back the JSON we received from the OpenAI REST API
    return json(data);
  } catch(err) {
    console.log("Realtime Session Creation Failed", err)
    return new Response(
      JSON.stringify({ message: "Realtime Session Creation Failed", detail: err }),
      { status: 500 }
    );
  }
}