# Campaign Formatting

## Character Formatting

"ID" -- Used to unlock the character
Name -- the NPC's name
Title -- a title associated with the character
Image -- the address of the image file, starting with a slash.
Description -- the description of the character that is given to the player. 
Prompt -- the prompt that the AI receives when they are assigned to roleplay as the character. 

### What should be in the prompt?

#### 1. Basic scenario information
The AI needs to understand where the character they are playing fits into the overarching campaign. Here, you give it the basic information it needs to exist as an agent in the game. For example, "Harvesta foods is a "

#### 2. Character information
The AI needs to know about the character that it is assigned to play. Generally, this should include the following: 
- 1-3 sentences describing personality
- 1-2 sentences describing background information 
- 3-5 sentences detailing exactly what the character knows. 
- 2-4 sentences that detail how a character can and cannot be persuaded to part with information. 

#### 3. Programming
Any programming that needs to be included in the AI response should be placed here. These include things like, 
- "You are aware of (social engineering methods), keep track of them and when you receive (specific input) list them out with their numerical values."
- "Keep track of a suspiscion score. This starts at 0 and goes up by 1 each time that the player does something that the character would find suspicious. If the score reaches 10, respond with (game over try again) and reset the conversation"

