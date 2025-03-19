# API Endpoints

The following is a list of API endpionts, their methods, what they take as input, and what they return. All endpoints are after /api/. A [Postman definition](../Development%20Resources/SEPPTIC.postman_collection.json) of these endpoints is also available.

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

## /progress
### GET
- Description: Get user progress
- Request:
    - headers:
        - CampaignID: int (Optional, required if CharacterID is provided)
        - CharacterID: int (Optional)
- Response:
    - body:
        - progress: json list
            - campaign: int
            - character: int
            - intel: int
        - achievements: json list
            - id: int
            - campaign: int
            - name: string
            - description: string
            - image: string

### POST
- Description: Update user progress
- Request:
    - body:
        - progress: json
            - campaign: int
            - character: int
            - intel: int

## /campaigns/[campaignId]
### GET
- Description: Get a campaign
- Response:
    - body:
        - campaign: json
            - id: int
            - name: string
            - description: string
            - image: string
            - characters: json list
                - id: int
                - name: string
                - image: string
                - description: string
                - progress: int
                - intel: int list
            - briefingVideo: string
            - successVideo: string
            - failureVideo: string
            - website: string

## /campaigns
### GET
- Description: Get all campaigns
- Request:
- Response:
    - campaigns:
        - id: int
        - name: string
        - description: string
        - image: string

## /conversation
### GET
- Description: Get a conversation
- Request:
    - body:
        - conversationId: int
- Response:
    - body:
        - messages: json list
            - id: int
            - sender: string
            - content: string
            - timestamp: string

### POST
- Description: Create a conversation if it doesn't exist
- Request:
    - body:
        - campaignId: int
        - characterId: int
- Response:
    - body:
        - conversationId: int

### DELETE
- Description: Delete a conversation
- Request:
    - body:
        - conversationId: int

## /message
### POST
- Description: Send a message
- Request:
    - body:
        - conversationId: int
        - content: string