# CRM Application Backend

This is the backend for the Customer Relationship Management (CRM) application. It provides APIs for user authentication, lead management, and dashboard metrics.

## Table of Contents

- [Setup](#setup)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Leads Management](#leads-management)
  - [Dashboard](#dashboard)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Logging](#logging)

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=MONGODB_URI=mongodb+srv://sourabhpatil0369:Password@crm.wwkftik.mongodb.net/?retryWrites=true&w=majority&appName=crm
   JWT_SECRET=sourabh-jwt-key
   NODE_ENV=development
   LOG_LEVEL=info
   ```
5. Start the server:
   ```
   npm run dev
   ```

### Seed Data

To populate the database with test data, run:
```
npm run seed
```

This will create:
- 1 admin user
- 2 telecaller users
- 4 test leads

## API Documentation

### Authentication

#### Register User

```
POST /api/auth/register
```
```
{
    "name": "sourabh",
    "email": "sourabh@example.com",
    "password": "password123",
    "role": "admin"
}
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "telecaller"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "telecaller"
  }
}
```

#### Login User

```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "telecaller"
  }
}
```

### Leads Management

#### Get All Leads

```
GET /api/leads
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "Customer One",
    "email": "customer1@example.com",
    "phoneNumber": "1234567890",
    "address": "123 Main St, City One",
    "status": "connected",
    "callResponse": "interested",
    "assignedTo": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "lastCallDate": "2023-04-05T10:00:00.000Z",
    "createdAt": "2023-04-05T10:00:00.000Z",
    "updatedAt": "2023-04-05T10:00:00.000Z"
  },
  // More leads...
]
```

#### Create New Lead

```
POST /api/leads
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "name": "New Customer",
  "email": "newcustomer@example.com",
  "phoneNumber": "9876543210",
  "address": "789 New St, New City"
}
```

**Response:**
```json
{
  "message": "Lead created successfully",
  "lead": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "New Customer",
    "email": "newcustomer@example.com",
    "phoneNumber": "9876543210",
    "address": "789 New St, New City",
    "status": "pending",
    "assignedTo": "60d21b4667d0d8992e610c85",
    "createdAt": "2023-04-05T10:00:00.000Z",
    "updatedAt": "2023-04-05T10:00:00.000Z"
  }
}
```

#### Update Lead Address

```
PATCH /api/leads/:id/address
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "address": "Updated Address, New City"
}
```

**Response:**
```json
{
  "message": "Lead address updated successfully",
  "lead": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "New Customer",
    "email": "newcustomer@example.com",
    "phoneNumber": "9876543210",
    "address": "Updated Address, New City",
    "status": "pending",
    "assignedTo": "60d21b4667d0d8992e610c85",
    "createdAt": "2023-04-05T10:00:00.000Z",
    "updatedAt": "2023-04-05T10:00:00.000Z"
  }
}
```

#### Delete Lead

```
DELETE /api/leads/:id
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "message": "Lead deleted successfully"
}
```

#### Update Lead Status

```
PATCH /api/leads/:id/status
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "status": "connected",
  "callResponse": "interested"
}
```

**Response:**
```json
{
  "message": "Lead status updated successfully",
  "lead": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "New Customer",
    "email": "newcustomer@example.com",
    "phoneNumber": "9876543210",
    "address": "Updated Address, New City",
    "status": "connected",
    "callResponse": "interested",
    "assignedTo": "60d21b4667d0d8992e610c85",
    "lastCallDate": "2023-04-05T10:00:00.000Z",
    "createdAt": "2023-04-05T10:00:00.000Z",
    "updatedAt": "2023-04-05T10:00:00.000Z"
  }
}
```

### Dashboard

#### Get Dashboard Metrics

```
GET /api/dashboard/metrics
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "metrics": {
    "totalTelecallers": 2,
    "totalCalls": 3,
    "totalCustomersContacted": 2
  },
  "callTrends": [
    {
      "_id": "2023-04-01",
      "count": 1
    },
    {
      "_id": "2023-04-02",
      "count": 0
    },
    {
      "_id": "2023-04-03",
      "count": 1
    },
    {
      "_id": "2023-04-04",
      "count": 0
    },
    {
      "_id": "2023-04-05",
      "count": 1
    }
  ],
  "recentCalls": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "Customer One",
      "email": "customer1@example.com",
      "phoneNumber": "1234567890",
      "address": "123 Main St, City One",
      "status": "connected",
      "callResponse": "interested",
      "assignedTo": {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "lastCallDate": "2023-04-05T10:00:00.000Z"
    },
    // More recent calls...
  ]
}
```

## Error Handling

The API uses a standardized error response format:

```json
{
  "status": "error",
  "message": "Error message here"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Validation

The API validates all incoming requests. Here are the validation rules:

### User Validation
- Name: Required
- Email: Valid email format
- Password: Minimum 6 characters
- Role: Must be either 'admin' or 'telecaller'

### Lead Validation
- Name: Required
- Email: Valid email format
- Phone Number: Must be 10 digits
- Address: Required
- Status: Must be 'connected', 'not_connected', or 'pending'
- Call Response: Must be 'discussed', 'callback', 'interested', 'busy', 'rnr', 'switched_off', or null

## Logging

The application uses Winston for logging. Logs are stored in:
- `logs/error.log`: Error logs
- `logs/combined.log`: All logs

Log levels:
- error: Errors
- warn: Warnings
- info: Information
- debug: Debug information 
