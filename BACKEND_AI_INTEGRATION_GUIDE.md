# Backend & AI Integration Guide for Safahat

## Overview
This guide provides clear instructions for backend and AI engineers to integrate their services with the Safahat frontend. All API endpoints are clearly marked with TODO comments in the code.

## Table of Contents
1. [Authentication Endpoints](#authentication-endpoints)
2. [Client Endpoints](#client-endpoints)
3. [Consultant Endpoints](#consultant-endpoints)
4. [Admin Endpoints](#admin-endpoints)
5. [AI Service Endpoints](#ai-service-endpoints)
6. [Chat/Messaging Endpoints](#chatmessaging-endpoints)
7. [Data Models](#data-models)

---

## Authentication Endpoints

### Login
- **File**: `/src/app/contexts/AuthContext.tsx`
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "client|consultant|admin"
  }
}
```

### Register - Client
- **File**: `/src/app/pages/RegisterPage.tsx`
- **Endpoint**: `POST /api/auth/register/client`
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "+1234567890"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Account created successfully"
}
```

### Register - Legal Consultant
- **File**: `/src/app/pages/RegisterPage.tsx`
- **Endpoint**: `POST /api/auth/register/consultant`
- **Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "phoneNumber": "+1234567890",
  "yearsOfExperience": 10,
  "hourlyRate": 150,
  "speciality": "Corporate Law",
  "description": "Experienced in mergers and acquisitions",
  "country": "Saudi Arabia",
  "credentials": "file_reference_or_base64"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Account created. Pending verification."
}
```

---

## Client Endpoints

### Upload Document for AI Analysis
- **File**: `/src/app/pages/client/ClientAIPage.tsx`
- **Endpoint**: `POST /api/ai/analyze-document`
- **Request**: FormData with file
- **Request Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: multipart/form-data`
- **Form Data**:
  - `document`: File (PDF, DOC, or DOCX)
- **Response**:
```json
{
  "analysis": "Detailed text analysis of the document...",
  "documentId": "doc_id_for_reference"
}
```

### Get AI-Suggested Consultants Based on Document
- **File**: `/src/app/pages/client/ClientProfessionalsPage.tsx`
- **Endpoint**: `POST /api/ai/suggest-consultants`
- **Request**: FormData with file
- **Request Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: multipart/form-data`
- **Form Data**:
  - `document`: File (PDF, DOC, or DOCX)
- **Response**:
```json
{
  "consultants": [
    {
      "id": "consultant_id",
      "name": "Sarah Ahmed",
      "profilePhoto": "url_to_photo",
      "yearsOfExperience": 15,
      "hourlyRate": 150,
      "rating": 4.8,
      "speciality": "Corporate Law",
      "description": "Experienced in mergers...",
      "country": "Saudi Arabia"
    }
  ]
}
```

### Get All Consultants
- **Endpoint**: `GET /api/consultants`
- **Request Headers**: `Authorization: Bearer {token}`
- **Query Parameters**:
  - `search`: string (optional)
  - `speciality`: string (optional)
  - `minExperience`: number (optional)
  - `maxRate`: number (optional)
- **Response**: Same consultant array as above

---

## Consultant Endpoints

### Get Consultation Requests
- **File**: `/src/app/pages/consultant/ConsultantRequestsPage.tsx`
- **Endpoint**: `GET /api/consultant/requests?status={new|open|finished}`
- **Request Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "requests": [
    {
      "id": "request_id",
      "clientName": "John Doe",
      "clientEmail": "john@example.com",
      "subject": "Contract Review",
      "message": "I need help reviewing...",
      "status": "new",
      "createdAt": "2024-03-14T10:00:00Z",
      "document": "url_to_document"
    }
  ]
}
```

### Update Request Status
- **Endpoint**: `PATCH /api/consultant/requests/{requestId}`
- **Request Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "status": "open|finished",
  "response": "Optional response message"
}
```

### Update Consultant Profile
- **File**: `/src/app/pages/consultant/ConsultantProfilePage.tsx`
- **Endpoint**: `PATCH /api/consultant/profile`
- **Request Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "hourlyRate": 175,
  "speciality": "Updated Speciality",
  "description": "Updated description",
  "country": "UAE"
}
```

---

## Admin Endpoints

### Get Pending Verifications
- **File**: `/src/app/pages/admin/AdminVerifyPage.tsx`
- **Endpoint**: `GET /api/admin/pending-verifications`
- **Request Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "consultants": [
    {
      "id": "consultant_id",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "yearsOfExperience": 10,
      "hourlyRate": 150,
      "speciality": "Corporate Law",
      "description": "Experienced...",
      "country": "Saudi Arabia",
      "credentials": "url_to_credentials",
      "appliedAt": "2024-03-14T10:00:00Z"
    }
  ]
}
```

### Approve/Reject Consultant
- **Endpoint**: `POST /api/admin/verify-consultant`
- **Request Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "consultantId": "consultant_id",
  "action": "approve|reject",
  "reason": "Optional rejection reason"
}
```
- **Side Effect**: Send verification email to consultant

### Get All Users
- **File**: `/src/app/pages/admin/AdminManageUsersPage.tsx`
- **Endpoint**: `GET /api/admin/users?role={client|consultant}&status={active|suspended}`
- **Request Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "users": [
    {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "role": "client",
      "status": "active",
      "joinedAt": "2024-03-14T10:00:00Z"
    }
  ]
}
```

### Suspend/Reinstate User
- **Endpoint**: `PATCH /api/admin/users/{userId}`
- **Request Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "action": "suspend|reinstate"
}
```

### Update AI Dictionary
- **File**: `/src/app/pages/admin/AdminAIDictionaryPage.tsx`
- **Endpoint**: `POST /api/admin/ai-dictionary`
- **Request Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: multipart/form-data`
- **Form Data**:
  - `file`: File (PDF containing legal terms)
- **Response**:
```json
{
  "success": true,
  "message": "Dictionary updated successfully",
  "termsAdded": 150
}
```

---

## AI Service Endpoints

### Document Analysis
See [Client Endpoints - Upload Document for AI Analysis](#upload-document-for-ai-analysis)

**AI Requirements**:
- Extract text from PDF/DOC/DOCX files
- Analyze legal document structure
- Identify key clauses, terms, and potential issues
- Provide plain-language summary
- Suggest areas requiring legal review

### Consultant Suggestion
See [Client Endpoints - Get AI-Suggested Consultants](#get-ai-suggested-consultants-based-on-document)

**AI Requirements**:
- Analyze document type and legal domain
- Match document requirements with consultant specialties
- Consider consultant experience and ratings
- Return top 2-3 most suitable consultants

---

## Chat/Messaging Endpoints

### Send Message
- **File**: `/src/app/pages/ChatPage.tsx`
- **Endpoint**: `POST /api/chat/messages`
- **Request Headers**: `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "recipientId": "user_id",
  "message": "Hello, I need legal assistance",
  "attachmentUrl": "optional_url_to_document"
}
```

### Get Chat History
- **Endpoint**: `GET /api/chat/messages/{userId}`
- **Request Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "messages": [
    {
      "id": "message_id",
      "senderId": "sender_id",
      "senderName": "Sender Name",
      "recipientId": "recipient_id",
      "message": "Message text",
      "attachmentUrl": "optional_url",
      "timestamp": "2024-03-14T10:00:00Z",
      "read": false
    }
  ]
}
```

### WebSocket for Real-time Chat (Optional but Recommended)
- **Connection**: `ws://your-backend.com/ws/chat?token={jwt_token}`
- **Message Format**:
```json
{
  "type": "message",
  "from": "sender_id",
  "to": "recipient_id",
  "content": "Message text",
  "timestamp": "2024-03-14T10:00:00Z"
}
```

---

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  role: 'client' | 'consultant' | 'admin';
  status: 'active' | 'suspended' | 'pending_verification';
  createdAt: string;
}
```

### Consultant (extends User)
```typescript
interface Consultant extends User {
  yearsOfExperience: number;
  hourlyRate: number;
  speciality: string;
  description: string;
  country: string;
  rating: number;
  credentials?: string;
  verified: boolean;
}
```

### ConsultationRequest
```typescript
interface ConsultationRequest {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  consultantId: string;
  subject: string;
  message: string;
  documentUrl?: string;
  status: 'new' | 'open' | 'finished';
  createdAt: string;
  updatedAt: string;
}
```

### ChatMessage
```typescript
interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  message: string;
  attachmentUrl?: string;
  timestamp: string;
  read: boolean;
}
```

---

## Authentication & Security

### JWT Token
- Store JWT token in localStorage or httpOnly cookies
- Include in all authenticated requests: `Authorization: Bearer {token}`
- Token should contain: user ID, role, expiration

### Password Requirements
- Minimum 8 characters
- At least one uppercase, one lowercase, one number
- Hash with bcrypt (backend)

### File Upload Security
- Validate file types (PDF, DOC, DOCX only)
- Maximum file size: 10MB
- Scan for malware before processing
- Store files securely with unique identifiers

---

## Error Handling

All endpoints should return consistent error responses:

```json
{
  "error": true,
  "message": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

Common HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `500`: Internal Server Error

---

## Email Notifications

### Consultant Verification Email
**Trigger**: Admin approves consultant account
**Subject**: "Your Safahat Account Has Been Verified"
**Content**: Welcome message, login link, next steps

### Consultant Rejection Email
**Trigger**: Admin rejects consultant account
**Subject**: "Safahat Account Application Update"
**Content**: Polite rejection message, reason (optional), reapplication instructions

### New Consultation Request Email
**Trigger**: Client sends consultation request
**Recipient**: Consultant
**Content**: Client name, subject, message preview, link to view request

---

## Testing

### Mock Data
The frontend currently uses mock data. All TODO comments indicate where real API calls should be integrated.

### Testing Credentials
For development:
- Admin: `admin@safahat.com` / any password
- Consultant: `consultant@safahat.com` / any password
- Client: `client@safahat.com` / any password

### Integration Steps
1. Find TODO comments in the code (search for "TODO: BACKEND" or "TODO: AI")
2. Replace mock implementation with actual API calls
3. Test with real backend
4. Handle loading states (already implemented in UI)
5. Handle error states (toast notifications already set up)

---

## Questions or Issues?
Contact the frontend team for clarification on any endpoints or data structures.
