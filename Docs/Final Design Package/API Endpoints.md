# /auth - Done!
## POST
- Description: Authenticate user
- Request:
    - body:
        - email: string
        - password: string
- Response:
    - body:
        - token: string
        - sessionId: int
        - message: string

## DELETE
- Description: Logout user
- Request:
- Response:
    - body:
        - message: string

# /register - Done!
## POST
- Description: Register user
- Request:
    - body:
        - name: string
        - email: string
        - password: string

# /profile - Done!
## GET
- Description: Get user profile
- Request:
- Response:
    - body:
        - userId: int
        - name: string
        - email: string
        - achievements: int list

## PUT
- Description: Update user profile
- Request:
    - body:
        - name: string
        - email: string
        - password: string

# /progress - Done!
## GET
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

## POST
- Description: Update user progress
- Request:
    - body:
        - progress: json
            - campaign: int
            - character: int
            - intel: int

# /campaigns/[campaignId] - Done!
## GET
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

# /campaigns - Done!
## GET
- Description: Get all campaigns
- Request:
- Response:
    - campaigns:
        - id: int
        - name: string
        - description: string
        - image: string

# /conversation - Done!
## GET
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

## POST
- Description: Create a conversation if it doesn't exist
- Request:
    - body:
        - campaignId: int
        - characterId: int
- Response:
    - body:
        - conversationId: int

## DELETE
- Description: Delete a conversation
- Request:
    - body:
        - conversationId: int

# /message
## POST
- Description: Send a message
- Request:
    - body:
        - conversationId: int
        - content: string