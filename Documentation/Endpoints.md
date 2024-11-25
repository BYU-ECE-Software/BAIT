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
    - headers:
        - Token: string
        - SessionID: int
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

# /profile
## GET
- Description: Get user profile
- Request:
    - headers:
        - Token: string
- Response:
    - body:
        - name: string
        - email: string
        - achievements: int list

## PUT - Done!
- Description: Update user profile
- Request:
    - headers:
        - Token: string
    - body:
        - name: string
        - email: string
        - password: string

# /progress
## GET
- Description: Get user progress
- Request:
    - headers:
        - Token: string
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

## POST - Done!
- Description: Update user progress
- Request:
    - headers:
        - Token: string
    - body:
        - progress: json
            - campaign: int
            - character: int
            - intel: int

# /campaigns/[campaignId] - Done!
## GET
- Description: Get a campaign
- Request:
    - headers:
        - Token: string
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
    - headers:
        - Token: string
- Response:
    - campaigns:
        - id: int
        - name: string
        - description: string
        - image: string

# /chat
## GET
- Description: Get chat messages
- Request:
    - headers:
        - Token: string
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
- Description: Send chat message
- Request:
    - headers:
        - Token: string
    - body:
        - conversationId: int
        - content: string