# GPT-5 Troubleshooting

*As the Immerse program was wrapping up, OpenAI released a new model and we set our text chats to use it. While the AI characters definitely felt more realistic, they were hallucinating things that were not part of the campaign.*

## Phase 1 Issues

### Referencing Systems not in the Campaign
- Asana 
- Teams 
- Outlook
- Sharepoint 
- Slack 
etc. 

Essentially, the AI was referencing the use of systems that a real company would use, but that were not made available in the simulated environment. 

### Excessive Business Jargon
- "capex"
- "blockers"
- "gated"

The kind of things that only people from the business school would know! What the heck does "capex" even mean!?! (I googled it, it means capitol expenditure. But our students probably wouldn't know that and therefore it would be az bad idea to have the AI spewing words they'd have to google.)

### Incorrect Context for the Messages
The characters constantly refer to the messages as coming from an unverified outside source, while the player is meant to be an intern currently working at Harvesta. 

## Fixes

### Full prohibition on mentioning any software, utility, system, or tool not specifically mentioned in the prompt
```
Do not mention any software, utility, system, tool, or platform that would be used in the business unless explicitly instructed on it in the prompt. Do not improvise any use of such items outside of given use cases. 
```

### Express instructions on not using business jargon
```
Communicate in clear english that could be understood by an average person. Do not use business jargon, . 
```

### Edit the context of the text-based messaging to be considered text messages in harvesta's platform
in `routes/api/message/+server.ts` 
```
You are being contacted through an official Harvesta email. 
```

In `routes/api/realtime/+server.ts`
```
You are being contacted by "${fromname}". If you are being contacted by "player" act like you are being contacted by a low level employee in your company. If you are being contacted by anyone else use the knowledge that you have about them to continue the conversation.
You are being contacted over the phone from an in-house number. 
```

## Results 
- still asking to be contacted through email with CCs, etc, but can be told that they are and it will believe it 
- business jargon was not completely cut out but decently reduced 
- mentions of external programs reduced but not gone 

Overall, this was reasonably successful, but not as much as I had originally hoped. 
Honestly, we would likely be better off switching back to the GPT-4o model than continuing to add additional guardrails to prevent the AI from misbehaving.

## 9-19-25 update
GPT 5 is rampantly misbehaving as it is deployed in a classroom setting. I recommend reverting it back to gpt-4o. 
GPT changes must be made in `sepptic/src/server/utils/aiSendMessage.ts`. I'm going to check with Jackson to see if this will cause issues with the chat array change. 
