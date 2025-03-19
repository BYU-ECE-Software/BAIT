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
Response Body:
```json
{
    "message": "string",
    "status": 200
}
```

## /progress
### GET
**Description**: Get user progress

Response Body:
```json
{
    "intel": [
        {
            "Intel_Record_ID": 1,
            "Campaign_ID": 1,
            "Character_ID": 1,
            "Intel_ID": 1,
            "User_ID": 1,
        }
    ],
    "intelByCampaign": {
        "1": [
            {
                "Intel_Record_ID": 1,
                "Campaign_ID": 1,
                "Character_ID": 1,
                "Intel_ID": 1,
                "User_ID": 1,
            }
        ]
    },
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

### POST
**Description**: Update user progress

Request Body:
```json
{
    "campaignId": 1,
    "characterId": 1,
    "intelId": 1
}
```

Response Body:
```json
{
    "message": "string",
    "status": 200
}
```

## /quiz
### POST
**Description**: Submit a quiz answer. Updates user progress if correct.

Request Body:
```json
{
    "campaignId": 1,
    "characterId": 1,
    "intelId": 1,
    "userAnswer": "string"
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
```json
{
    "status": 200,
    "id": 1,
    "data": {
        "Campaign_Information": {
            "Name": "string",
            "Description": "string",
            "Image": "string",
            "Website": "string",
            "Briefing_Video": "string",
            "Success_Video": "string",
            "Failure_Video": "string",
            "Total_Intel": 1
        },
        "Characters": [
            {
                "ID": 1,
                "Name": "string",
                "Title": "string",
                "Image": "string",
                "Prompt": "string",
                "Intel": [
                    {
                        "Intel_ID": 1,
                        "Intel_Description": "string",
                        "Unlocks_Character_ID": 1,
                        "Quiz": "string",
                        "Answer": "string"
                    }
                ],
                "Total_Intel": 1
            }
        ],
        "Achievements": [
            {
                "ID": 1,
                "Name": "string",
                "Description": "string",
                "Image": "string",
                "Intels": [
                    1
                ]
            }
        ]
    }
}
```

## /campaigns
### GET
**Description**: Get a brief of all campaigns

Response Body:
```json
[
    {
        "id": 1,
        "name": "string",
        "description": "string",
        "image": "string"
    }
]
```

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