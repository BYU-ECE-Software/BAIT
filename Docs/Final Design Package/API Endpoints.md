# API Endpoints

The following is a list of API endpionts, their methods, what they take as input, and what they return. All endpoints are after /api/.
Authentication is done using tokens stored in the cookies. The token is set when the user logs in, is unset when the user logs out, and is automatically sent with any requests to the API.

## /auth
### POST
**Description**: Log in user. Response on successful login saves a token in the cookies.

Request Body:
```json
{
    "email": "string",
    "password": "string"
}
```
Response Body:
```json
{
    "message": "string",
    "status": 200
}
```

### DELETE
**Description**: Logout user

Response Body:
```json
{
    "message": "string",
    "status": 200
}
```

## /register
### POST
**Description**: Register a new user user

Request Body:
```json
{
    "name": "string",
    "email": "string",
    "password": "string"
}
```
Response Body:
```json
{
    "userId": 1,
    "message": "string",
    "status": 200
}
```

## /profile
### GET
**Description**: Get user profile

Response Body:
```json
{
    "userId": 1,
    "email": "string",
    "name": "string",
    "achievements": [
        {
            "ID": 1,
            "Campaign_ID": 1,
            "Name": "string",
            "Description": "string",
            "Image": "string"
        }
    ]
}
```

### PUT
**Description**: Update user profile

Note: Each parameter is optional, but at least one must be provided.

Request Body:
```json
{
    "name": "string",
    "email": "string",
    "password": "string"
}
```
Response Body:
```json
{
    "message": "string",
    "status": 200
}
```


## /campaigns/[campaignId]
### GET
**Description**: Get a full campaign

### PUT 
**Description:** Update the campaign json in the DB

Request Body:
```json
{
    "payload": "string",
}
```
Response Body:
```json 
{
    "message": "string",
    "success": "boolean",
    "status": "number"
}
```
## /campaigns
### GET
**Description**: Get a brief of all campaigns

Response Body:
```json
[
    {
        "id": "number",
        "name": "string",
        "description": "string",
        "image": "string"
    }
]
```
### POST
**Description**: Create a campaign and store in DB

Request Body:
```json
{
    "payload": "string"
}
```

Response Body:
```json
{
    "message": "string",
    "success": "boolean"
}
```

### DELETE 
**Description**: Delete a campaign from platform and DB

Response Body:
```json
{
    "message": "string",
    "success": "boolean"
}
```

## /conversation
### GET
**Description**: Get a conversation

Request Parameters:
- characterId: int
- campaignId: int

Request Example:
`/api/conversation?characterId=1&campaignId=1`

Response Body:
```json
{
    "status": 200,
    "message": "string",
    "messsages": [
        {
            "role": "user OR assistant",
            "content": "string",
            "timestamp": "2025-01-01T00:00:00.000Z"
        }
    ]
}
```

### POST
**Description**: Create a conversation if it doesn't exist

Request Body:
```json
{
    "characterId": 1,
    "campaignId": 1
}
```

Response Body:
```json
{
    "conversationId": 1,
    "message": "string",
    "status": 200
}
```

## /message
### GET
**Description**: Acquires message or transcript history 
Request Params:
```json
{
    "campaignId": "string",
    "characterId": "string",
    "call": "boolean",
}
```

The message url params will also include:
```json
{
    "fromid": "string",
    "fromname": "string"
}
```

Response Body:
```json
{  
    "convoHistory": "string"
}
```
Will be either transcript or messages based on if `call` is set as true or not

### POST
**Description**: Send a message

Request Body:
```json
{
    "campaignId": 1,
    "characterId": 1,
    "message": "string",
    "call": "boolean",
    "fromid": "number",
    "fromname": "string"
}
```
Response Body:
```json
{
    "status": "number",
    "aiMessage": "string"
}
```

## /realtime
### POST
**Description**: Sets up a realtime session with OpenAI

Request Body:
```json
{
    "voiceType": "string",
    "campaignId": "string",
    "characterId": "string",
}
```

Response Body:
```json
{
  "id": "sess_001",
  "object": "realtime.session",
  "model": "gpt-4o-realtime-preview",
  "modalities": ["audio", "text"],
  "instructions": "You are a friendly assistant.",
  "voice": "alloy",
  "input_audio_format": "pcm16",
  "output_audio_format": "pcm16",
  "input_audio_transcription": {
      "model": "whisper-1"
  },
  "turn_detection": null,
  "tools": [],
  "tool_choice": "none",
  "temperature": 0.7,
  "max_response_output_tokens": 200,
  "speed": 1.1,
  "tracing": "auto",
  "client_secret": {
    "value": "ek_abc123", 
    "expires_at": 1234567890
  }
}
```
The `client_secret `value is what the frontend parses from the response for the WebRTC connection.

## /images/[filename]
### POST
**Description**: Recieves images and stores them to the `/images` directory to be referenced by the campaign json files

Request Body:
```json
{
    "fileData": "blob"
}
```
Response Body:
```json
{
    "success": "boolean",
    "filename": "string",
    "url": "string"
}
```
### GET
**Description**: Called by `<img>` tags in json campaign files to display correct images
Request Params:
```json
{
    "filename": "string"
}
```
Response Body: ` { "data": "Buffer" }`

### DELETE
**Description**: Deletes specified image from `/images`.

Request Params:
```json
{
    "filename": "string"
}
```

Response Body:
```json
{
    "success": "boolean",
    "message": "string",
    "filename": "string"
}
```

## /resetCampaign
### POST
**Description**: Deletes all message and transcript data for a campaign in order to reset player's context

Request Body:
```json
{
    "campaignId": "string"
}
```

## /timestamp
### POST
**Description**: Sets timestamps in UserEventLog DB table on specific UI events

Request Body:
```json
{
    "user": "string",
    "name": "string"
}
```

## /transcript
### POST
**Description**: Writes transcripts in DB, creates new one if none exist.

Request Body:
```json
{
    "campaignId": "string",
    "characterId": "string",
    "call": "boolean",
    "transcript": "string",
}
```

Response Body:
```json
{
    "content": "string",
    "status": "number"
}
```