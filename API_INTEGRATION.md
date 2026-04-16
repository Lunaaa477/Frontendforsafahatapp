# Safahat Frontend - API Integration Guide

This document provides a comprehensive guide for backend and AI engineers to integrate with the Safahat frontend application.

## Table of Contents
1. [Authentication System](#authentication-system)
2. [User Roles](#user-roles)
3. [API Endpoints Needed](#api-endpoints-needed)
4. [AI Integration Points](#ai-integration-points)
5. [Data Structures](#data-structures)
6. [File Upload Requirements](#file-upload-requirements)

---

## Authentication System

### Location in Code
- **Auth Context**: `/src/app/contexts/AuthContext.tsx`
- **Login Page**: `/src/app/pages/LandingPage.tsx`
- **Registration**: `/src/app/pages/RegisterPage.tsx`

### Required API Endpoints

#### 1. Login
```typescript
POST /api/auth/login
Request Body:
{
  "email": "string",
  "password": "string"
}

Response:
{
  "user": {
    "id": "string",
    "email": "string",
    "role": "client" | "consultant" | "admin",
    "name": "string",
    "profilePhoto": "string (URL)",
    "verified": "boolean" // for consultants
  },
  "token": "string" // JWT or session token
}
```

#### 2. Registration
```typescript
POST /api/auth/register
Request Body:
{
  "email": "string",
  "password": "string",
  "fullName": "string",
  "phone": "string",
  "userType": "client" | "consultant",
  
  // Only for consultants:
  "country": "string",
  "licenseNumber": "string",
  "issuingAuthority": "string",
  "yearsOfExperience": "number",
  "lawFirm": "string (optional)",
  "speciality": "string",
  "description": "string",
  "profilePhoto": "File"
}

Response:
{
  "success": "boolean",
  "message": "string",
  "requiresVerification": "boolean" // true for consultants
}
```

#### 3. Logout
```typescript
POST /api/auth/logout
Headers:
{
  "Authorization": "Bearer <token>"
}

Response:
{
  "success": "boolean"
}
```

---

## User Roles

### 1. Client
- Can upload documents to AI
- Can browse and contact consultants
- Can exchange files with consultants
- Can rate consultants after conversation ends
- Can view list of contacted consultants

### 2. Legal Consultant
- Must be verified by admin before accessing the platform
- Can receive and manage client requests
- Can exchange files with clients
- Can send payment requests during file exchanges
- Can view their profile and request edits

### 3. Admin
- Can verify/reject consultant applications
- Can manage reported users
- Can suspend/reinstate accounts
- Can update AI dictionary

---

## API Endpoints Needed

### Consultant Management

#### Get All Consultants
```typescript
GET /api/consultants
Query Parameters:
{
  "search": "string (optional)",
  "speciality": "string (optional)",
  "minExperience": "number (optional)",
  "maxRate": "number (optional)",
  "sortBy": "rating" | "experience" | "rate"
}

Response:
{
  "consultants": [
    {
      "id": "string",
      "name": "string",
      "profilePhoto": "string (URL)",
      "yearsOfExperience": "number",
      "hourlyRate": "number",
      "rating": "number",
      "speciality": "string",
      "description": "string",
      "country": "string"
    }
  ]
}
```

#### Get Consultant by ID
```typescript
GET /api/consultants/:id
Response: Same as single consultant object above
```

#### Get Contacted Consultants (for Client)
```typescript
GET /api/client/contacted-consultants
Headers:
{
  "Authorization": "Bearer <token>"
}

Response:
{
  "consultants": [
    {
      "id": "string",
      "name": "string",
      "speciality": "string",
      "rating": "number",
      "lastContact": "ISO date string",
      "status": "active" | "finished"
    }
  ]
}
```

### File Exchange Management

#### Get File Exchange History
```typescript
GET /api/file-exchange/:consultantId
Headers:
{
  "Authorization": "Bearer <token>"
}

Response:
{
  "files": [
    {
      "id": "string",
      "sender": "client" | "consultant",
      "fileName": "string",
      "fileSize": "string",
      "timestamp": "ISO date string",
      "type": "document" | "payment",
      "amount": "number (optional, for payment type)",
      "downloadUrl": "string (optional, for document type)"
    }
  ],
  "consultantInfo": {
    "name": "string",
    "profilePhoto": "string (URL)"
  }
}
```

#### Upload File
```typescript
POST /api/file-exchange/:consultantId/upload
Headers:
{
  "Authorization": "Bearer <token>",
  "Content-Type": "multipart/form-data"
}
Request Body:
{
  "file": "File (.pdf, .doc, .docx)"
}

Response:
{
  "file": {
    "id": "string",
    "fileName": "string",
    "fileSize": "string",
    "uploadedAt": "ISO date string"
  }
}
```

#### Download File
```typescript
GET /api/file-exchange/download/:fileId
Headers:
{
  "Authorization": "Bearer <token>"
}

Response: File blob
```

#### Send Payment Request
```typescript
POST /api/payments/request
Headers:
{
  "Authorization": "Bearer <token>"
}
Request Body:
{
  "consultantId": "string",
  "amount": "number"
}

Response:
{
  "success": "boolean",
  "paymentRequestId": "string"
}
```

#### End Conversation
```typescript
POST /api/conversations/:consultantId/end
Headers:
{
  "Authorization": "Bearer <token>"
}

Response:
{
  "success": "boolean"
}
```

#### Submit Rating
```typescript
POST /api/consultants/:id/rate
Headers:
{
  "Authorization": "Bearer <token>"
}
Request Body:
{
  "rating": "number (1-5)",
  "chatId": "string"
}

Response:
{
  "success": "boolean",
  "newRating": "number (updated average)"
}
```

### Report Management

#### Report User
```typescript
POST /api/reports
Headers:
{
  "Authorization": "Bearer <token>"
}
Request Body:
{
  "reportedUserId": "string",
  "reason": "string"
}

Response:
{
  "success": "boolean",
  "reportId": "string"
}
```

### Admin Endpoints

#### Get Pending Verifications
```typescript
GET /api/admin/consultants/pending
Headers:
{
  "Authorization": "Bearer <token>"
}

Response:
{
  "applications": [
    {
      "id": "string",
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "country": "string",
      "licenseNumber": "string",
      "issuingAuthority": "string",
      "yearsOfExperience": "number",
      "lawFirm": "string",
      "speciality": "string",
      "description": "string",
      "applicationDate": "ISO date string"
    }
  ]
}
```

#### Verify/Reject Consultant
```typescript
POST /api/admin/consultants/verify
Headers:
{
  "Authorization": "Bearer <token>"
}
Request Body:
{
  "consultantId": "string",
  "action": "verify" | "reject"
}

Response:
{
  "success": "boolean"
}
Note: Should trigger email to consultant
```

#### Get Reported Users
```typescript
GET /api/admin/users/reported
Headers:
{
  "Authorization": "Bearer <token>"
}

Response:
{
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "client" | "consultant",
      "reportedBy": "string",
      "reason": "string",
      "reportDate": "ISO date string",
      "status": "active" | "suspended"
    }
  ]
}
```

#### Suspend/Reinstate User
```typescript
POST /api/admin/users/suspend
Headers:
{
  "Authorization": "Bearer <token>"
}
Request Body:
{
  "userId": "string",
  "action": "suspend" | "reinstate"
}

Response:
{
  "success": "boolean"
}
```

#### Get AI Dictionary
```typescript
GET /api/admin/dictionary
Headers:
{
  "Authorization": "Bearer <token>"
}

Response:
{
  "entries": [
    {
      "id": "string",
      "term": "string",
      "definition": "string",
      "category": "string",
      "dateAdded": "ISO date string"
    }
  ]
}
```

#### Add Dictionary Entry
```typescript
POST /api/admin/dictionary
Headers:
{
  "Authorization": "Bearer <token>"
}
Request Body:
{
  "term": "string",
  "definition": "string",
  "category": "string"
}

Response:
{
  "success": "boolean",
  "entry": {
    "id": "string",
    "term": "string",
    "definition": "string",
    "category": "string",
    "dateAdded": "ISO date string"
  }
}
```

#### Update Dictionary Entry
```typescript
PUT /api/admin/dictionary/:id
Headers:
{
  "Authorization": "Bearer <token>"
}
Request Body:
{
  "term": "string",
  "definition": "string",
  "category": "string"
}

Response:
{
  "success": "boolean"
}
```

#### Delete Dictionary Entry
```typescript
DELETE /api/admin/dictionary/:id
Headers:
{
  "Authorization": "Bearer <token>"
}

Response:
{
  "success": "boolean"
}
```

### Consultant Endpoints

#### Get Consultant Requests
```typescript
GET /api/consultant/requests
Headers:
{
  "Authorization": "Bearer <token>"
}
Query Parameters:
{
  "status": "new" | "open" | "finished"
}

Response:
{
  "requests": [
    {
      "id": "string",
      "clientName": "string",
      "subject": "string",
      "date": "ISO date string",
      "status": "new" | "open" | "finished",
      "lastMessage": "string"
    }
  ]
}
```

#### Update Profile Request
```typescript
POST /api/consultant/profile/request-edit
Headers:
{
  "Authorization": "Bearer <token>"
}
Request Body:
{
  "changes": "string (description of requested changes)"
}

Response:
{
  "success": "boolean"
}
```

#### Delete Account
```typescript
DELETE /api/consultant/profile
Headers:
{
  "Authorization": "Bearer <token>"
}

Response:
{
  "success": "boolean"
}
```

---

## AI Integration Points

### 1. Document Analysis (Client AI Assistant)

**Location**: `/src/app/pages/client/ClientAIPage.tsx`

```typescript
POST /api/ai/analyze-document
Headers:
{
  "Authorization": "Bearer <token>",
  "Content-Type": "multipart/form-data"
}
Request Body:
{
  "document": "File (.pdf or .doc/.docx)"
}

Response:
{
  "analysis": "string (formatted analysis text)",
  "documentType": "string (e.g., contract, agreement)",
  "keyPoints": ["string"],
  "recommendations": ["string"],
  "riskLevel": "low" | "medium" | "high"
}

Expected Processing Time: 3-10 seconds
```

### 2. Consultant Recommendation AI

**Location**: `/src/app/pages/client/ClientProfessionalsPage.tsx`

```typescript
POST /api/ai/suggest-consultants
Headers:
{
  "Authorization": "Bearer <token>",
  "Content-Type": "multipart/form-data"
}
Request Body:
{
  "document": "File (.pdf or .doc/.docx)"
}

Response:
{
  "suggestions": [
    {
      "consultantId": "string",
      "matchScore": "number (0-100)",
      "reason": "string (why this consultant is recommended)"
    }
  ],
  "documentCategory": "string",
  "suggestedSpeciality": "string"
}

Expected Processing Time: 3-10 seconds
```

### AI Dictionary Usage
The AI should use the dictionary entries from `/api/admin/dictionary` to improve accuracy when analyzing legal documents. The dictionary provides legal terms and definitions that should inform the AI's understanding of documents.

---

## Data Structures

### User Object
```typescript
interface User {
  id: string;
  email: string;
  role: 'client' | 'consultant' | 'admin';
  name?: string;
  profilePhoto?: string;
  verified?: boolean; // for consultants
}
```

### Consultant Object
```typescript
interface Consultant {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePhoto?: string;
  country: string;
  licenseNumber: string;
  issuingAuthority: string;
  yearsOfExperience: number;
  hourlyRate: number;
  rating: number;
  speciality: string;
  lawFirm?: string;
  description: string;
  verified: boolean;
}
```

### File Exchange Object
```typescript
interface FileExchange {
  id: string;
  sender: 'client' | 'consultant';
  fileName: string;
  fileSize: string;
  timestamp: Date;
  type: 'document' | 'payment';
  amount?: number; // for payment type
  downloadUrl?: string; // for document type
}
```

### Contacted Consultant Object (for Client Home)
```typescript
interface ContactedConsultant {
  id: string;
  name: string;
  speciality: string;
  rating: number;
  lastContact: Date;
  status: 'active' | 'finished';
}
```

### Dictionary Entry Object
```typescript
interface DictionaryEntry {
  id: string;
  term: string;
  definition: string;
  category: string;
  dateAdded: Date;
}
```

---

## File Upload Requirements

### Accepted File Types
- **Documents**: .pdf, .doc, .docx
- **Profile Photos**: .jpg, .jpeg, .png
- **File Exchange Documents**: .pdf, .doc, .docx

### File Size Limits (Recommended)
- Documents: 10 MB
- Profile Photos: 5 MB
- File Exchange Documents: 10 MB

### Storage
- Files should be stored securely with access controls
- Profile photos should be publicly accessible via URL
- File exchange documents should be accessible only to the client and consultant involved in the exchange

---

## Payment Integration

**Location**: `/src/app/pages/FileExchangePage.tsx`

The payment request system is built into the file exchange. When a consultant sends a payment request:

1. Frontend creates a payment request in the file exchange
2. Client clicks "Pay Now"
3. Backend should integrate with payment gateway (Stripe, PayPal, etc.)

```typescript
POST /api/payments/process/:fileId
Headers:
{
  "Authorization": "Bearer <token>"
}

Response:
{
  "success": "boolean",
  "transactionId": "string",
  "paymentUrl": "string (optional, for external payment)"
}
```

---

## Email Notifications Required

1. **Consultant Verification** (when admin verifies)
   - To: Consultant email
   - Subject: "Your Safahat Account Has Been Verified"

2. **Consultant Rejection** (when admin rejects)
   - To: Consultant email
   - Subject: "Safahat Account Application Update"

3. **New Client Request** (when client contacts consultant)
   - To: Consultant email
   - Subject: "New Client Request on Safahat"

4. **Payment Received** (when client pays)
   - To: Consultant email
   - Subject: "Payment Received on Safahat"

---

## Error Handling

All API responses should include proper HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

Error Response Format:
```typescript
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object (optional)"
  }
}
```

---

## Frontend Implementation Notes

### Where to Update API Calls

Search for `TODO: Replace with actual API call` or `TODO:` comments in these files:

1. **Authentication**: `/src/app/contexts/AuthContext.tsx`
2. **Client Home Page**: `/src/app/pages/client/ClientHomePage.tsx`
3. **Client AI Page**: `/src/app/pages/client/ClientAIPage.tsx`
4. **Professionals Page**: `/src/app/pages/client/ClientProfessionalsPage.tsx`
5. **File Exchange Page**: `/src/app/pages/FileExchangePage.tsx`
6. **Admin Verify**: `/src/app/pages/admin/AdminVerifyPage.tsx`
7. **Admin Manage Users**: `/src/app/pages/admin/AdminManageUsersPage.tsx`
8. **Admin AI Dictionary**: `/src/app/pages/admin/AdminAIDictionaryPage.tsx`

### Example API Integration

Replace the mock implementations with actual fetch calls:

```typescript
// Before (Mock)
const login = async (email: string, password: string) => {
  // Mock login
  setUser({ id: '1', email, role: 'client' });
};

// After (Real API)
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const data = await response.json();
  setUser(data.user);
  localStorage.setItem('token', data.token);
};
```

---

## Testing Recommendations

1. **Authentication Flow**
   - Test login for all three user types
   - Test registration for clients and consultants
   - Test logout functionality

2. **Client Flow**
   - Test AI document analysis
   - Test consultant search and filtering
   - Test file upload to consultant
   - Test file download from consultant
   - Test payment requests
   - Test rating system
   - Test viewing contacted consultants list

3. **Consultant Flow**
   - Test request management (new/open/finished)
   - Test file exchange with clients
   - Test payment request sending
   - Test profile view

4. **Admin Flow**
   - Test consultant verification/rejection
   - Test user management (suspend/reinstate)
   - Test AI dictionary CRUD operations

---

## Security Considerations

1. All authenticated endpoints should verify JWT tokens
2. File uploads should be scanned for malware
3. Rate limiting should be implemented for AI endpoints
4. CORS should be properly configured
5. Sensitive data (passwords, tokens) should be encrypted
6. Admin endpoints should have additional authorization checks

---

For questions or clarifications, please refer to the component files or contact the frontend development team.
