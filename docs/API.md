# API Documentation

## Authentication

### POST /api/v1/auth/wallet
Authenticate user with wallet address.

**Request Body:**
```json
{
  "walletAddress": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "walletAddress": "string",
    "balance": "number",
    "environmentalScore": "number",
    "isVerified": "boolean"
  }
}
```

## Environmental Actions

### POST /api/v1/environmental-actions
Record a new environmental action.

**Request Body:**
```json
{
  "type": "string",
  "description": "string",
  "impact": "number",
  "evidence": "string"
}
```

### GET /api/v1/environmental-actions
Get all environmental actions for the authenticated user.

**Response:**
```json
{
  "actions": [
    {
      "id": "string",
      "type": "string",
      "description": "string",
      "impact": "number",
      "evidence": "string",
      "status": "pending | verified | rejected",
      "createdAt": "string"
    }
  ]
}
```

## Meme Generator

### POST /api/v1/memes/generate
Generate a new environmental meme.

**Request Body:**
```json
{
  "prompt": "string",
  "style": "funny | serious | educational | inspiring"
}
```

### GET /api/v1/memes
Get all memes created by the authenticated user.

**Response:**
```json
{
  "memes": [
    {
      "id": "string",
      "imageUrl": "string",
      "text": "string",
      "creator": "string",
      "likes": "number",
      "shares": "number",
      "environmentalImpact": "number",
      "createdAt": "string"
    }
  ]
}
``` 