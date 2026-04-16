# File Exchange System - Complete Guide

## Overview
The Safahat platform now uses a **file-based exchange system** instead of traditional chat messaging. This document explains how the system works and what your backend team needs to implement.

---

## Communication Flow

### Client Perspective
1. Client browses or searches for legal consultants
2. Client selects a consultant and clicks "Contact Consultant"
3. Client is taken to the File Exchange page
4. Client uploads their legal document (.pdf, .doc, .docx)
5. Client waits for consultant to upload a response document
6. Client can download consultant's response
7. Client can end the conversation and rate the consultant

### Consultant Perspective
1. Consultant sees new client request notification
2. Consultant clicks on request to open File Exchange page
3. Consultant sees and downloads client's uploaded document
4. Consultant reviews the document
5. Consultant uploads their response/analysis document
6. Consultant can send payment requests if needed
7. Consultant can end the conversation when work is complete

---

## File Exchange Page

**Location**: `/src/app/pages/FileExchangePage.tsx`

### Features
- **File Upload**: Upload .pdf, .doc, or .docx documents
- **File Download**: Download any previously exchanged files
- **File History**: Visual timeline showing all exchanged files
- **Sender Identification**: Color-coded to show who sent what
- **Payment Requests**: Consultants can request payment
- **Report User**: Either party can report inappropriate behavior
- **End Conversation**: Either party can end the exchange
- **Rating System**: Clients rate consultants after ending

### Visual Design
- Files sent by current user appear on the right (amber/dark)
- Files received appear on the left (lighter amber)
- Payment requests appear in green boxes with dollar icon
- Uploading files show animation
- Empty state when no files exchanged yet

---

## Backend API Requirements

### 1. Get File Exchange History
```http
GET /api/file-exchange/:consultantId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "files": [
    {
      "id": "string",
      "sender": "client" | "consultant",
      "fileName": "document.pdf",
      "fileSize": "1.2 MB",
      "timestamp": "2026-03-31T10:30:00Z",
      "type": "document",
      "downloadUrl": "https://..."
    }
  ],
  "consultantInfo": {
    "name": "Mohammed Hassan",
    "profilePhoto": "https://..."
  }
}
```

### 2. Upload File
```http
POST /api/file-exchange/:consultantId/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
- `file`: File (.pdf, .doc, .docx)

**Response:**
```json
{
  "file": {
    "id": "file123",
    "fileName": "legal_analysis.pdf",
    "fileSize": "2.1 MB",
    "uploadedAt": "2026-03-31T10:35:00Z"
  }
}
```

### 3. Download File
```http
GET /api/file-exchange/download/:fileId
Authorization: Bearer <token>
```

**Response:** File blob with appropriate headers

### 4. Send Payment Request
```http
POST /api/payments/request
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "consultantId": "consultant123",
  "amount": 150.00
}
```

**Response:**
```json
{
  "success": true,
  "paymentRequestId": "payment456"
}
```

### 5. Process Payment
```http
POST /api/payments/process/:fileId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "transactionId": "trans789",
  "paymentUrl": "https://..." // optional
}
```

### 6. End Conversation
```http
POST /api/conversations/:consultantId/end
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true
}
```

### 7. Submit Rating
```http
POST /api/consultants/:id/rate
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "rating": 5
}
```

**Response:**
```json
{
  "success": true,
  "newRating": 4.8
}
```

### 8. Report User
```http
POST /api/reports
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "consultantId": "consultant123",
  "reason": "Inappropriate behavior"
}
```

**Response:**
```json
{
  "success": true,
  "reportId": "report999"
}
```

---

## Client Home Page - Contacted Consultants

**Location**: `/src/app/pages/client/ClientHomePage.tsx`

### New Feature: Contacted Legal Assistants List

Shows all consultants the client has previously contacted.

### Backend API Required

```http
GET /api/client/contacted-consultants
Authorization: Bearer <token>
```

**Response:**
```json
{
  "consultants": [
    {
      "id": "consultant123",
      "name": "Mohammed Hassan",
      "speciality": "Contract Law",
      "rating": 4.9,
      "lastContact": "2026-03-30T14:20:00Z",
      "status": "active"
    },
    {
      "id": "consultant456",
      "name": "Sarah Ahmed",
      "speciality": "Corporate Law",
      "rating": 4.8,
      "lastContact": "2026-03-28T09:15:00Z",
      "status": "finished"
    }
  ]
}
```

**Status Values:**
- `"active"`: File exchange is ongoing
- `"finished"`: Conversation has been ended

---

## File Validation

### Frontend Validation (Already Implemented)
- Only accepts: .pdf, .doc, .docx
- Shows error toast if invalid file type

### Backend Validation (Required)
- Verify file extension
- Check file size (recommended max: 10 MB)
- Scan for malware/viruses
- Validate file is not corrupted

---

## Security & Storage

### File Storage Requirements
1. **Secure Storage**: Store files in encrypted storage (AWS S3, Azure Blob, etc.)
2. **Access Control**: Files should only be accessible to:
   - The client who uploaded it
   - The consultant who received it
   - Admin (for moderation purposes)
3. **File URLs**: Generate signed/temporary URLs for downloads
4. **Retention Policy**: Define how long files are stored

### Security Best Practices
1. Authenticate all requests with JWT tokens
2. Validate user has permission to access specific files
3. Scan uploaded files for malware
4. Log all file access for audit trail
5. Implement rate limiting on uploads

---

## Email Notifications

### When to Send Emails

1. **New File Uploaded**
   - To: Consultant (when client uploads)
   - To: Client (when consultant uploads)
   - Subject: "New Document from [Name] on Safahat"

2. **Payment Request Received**
   - To: Client
   - Subject: "Payment Request from [Consultant Name]"

3. **Payment Processed**
   - To: Consultant
   - Subject: "Payment Received on Safahat"

4. **Conversation Ended**
   - To: Both parties
   - Subject: "File Exchange Completed"

---

## Integration Checklist

### Backend Tasks
- [ ] Implement file upload endpoint with multipart/form-data support
- [ ] Set up secure file storage (S3, Azure Blob, etc.)
- [ ] Create file download endpoint with access control
- [ ] Implement file exchange history endpoint
- [ ] Add payment request/process endpoints
- [ ] Create contacted consultants list endpoint for clients
- [ ] Set up malware scanning for uploaded files
- [ ] Configure email notifications for file uploads
- [ ] Implement audit logging for file access
- [ ] Add rate limiting for uploads

### Testing Tasks
- [ ] Test file upload with various file types
- [ ] Test file download permissions
- [ ] Test file exchange between client and consultant
- [ ] Test payment request flow
- [ ] Test conversation ending and rating
- [ ] Test contacted consultants list display
- [ ] Test file size limits
- [ ] Test invalid file type rejection
- [ ] Test concurrent uploads
- [ ] Test file storage limits

---

## Frontend Pages Modified

1. `/src/app/pages/FileExchangePage.tsx` - **NEW** file exchange interface
2. `/src/app/pages/client/ClientHomePage.tsx` - Added contacted consultants list
3. `/src/app/pages/client/ClientProfessionalsPage.tsx` - Updated to navigate to file-exchange
4. `/src/app/pages/consultant/ConsultantRequestsPage.tsx` - Updated to navigate to file-exchange
5. `/src/app/routes.tsx` - Changed route from `/chat/:id` to `/file-exchange/:id`

---

## Migration Notes

### Old System (Chat)
- Text-based messaging
- Real-time or near-real-time communication
- Multiple short messages
- Attachments as secondary feature

### New System (File Exchange)
- Document-based communication
- Asynchronous file exchange
- Focus on document review workflow
- Files as primary communication method

### What Was Preserved
- Payment request system
- Rating system
- Report user functionality
- End conversation flow
- User authentication and roles

---

## Questions?

For any clarifications or questions about the file exchange system:
1. Review the code in `/src/app/pages/FileExchangePage.tsx`
2. Check TODO comments in the code for specific integration points
3. Refer to the API_INTEGRATION.md file for complete API documentation
