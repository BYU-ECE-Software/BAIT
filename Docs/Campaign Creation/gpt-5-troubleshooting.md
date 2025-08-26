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

### Edit the context of the text-based messaging to be text messages in the messaging platform harvesta uses. 
