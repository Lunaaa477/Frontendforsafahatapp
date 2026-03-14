# Team Integration Quick Start Guide

## 🚀 For Backend Engineers

### Where to Start
All backend integration points are marked with `TODO: BACKEND` comments in the code.

### Key Files to Review
1. **Authentication Context**: `/src/app/contexts/AuthContext.tsx`
   - Login endpoint
   - Register endpoint
   - Token management

2. **Client Pages**:
   - `/src/app/pages/client/ClientAIPage.tsx` - AI document analysis
   - `/src/app/pages/client/ClientProfessionalsPage.tsx` - Consultant listing & AI suggestions
   
3. **Consultant Pages**:
   - `/src/app/pages/consultant/ConsultantHomePage.tsx` - Request counts
   - `/src/app/pages/consultant/ConsultantRequestsPage.tsx` - Consultation requests
   - `/src/app/pages/consultant/ConsultantProfilePage.tsx` - Profile updates

4. **Admin Pages**:
   - `/src/app/pages/admin/AdminVerifyPage.tsx` - Consultant verification
   - `/src/app/pages/admin/AdminManageUsersPage.tsx` - User management
   - `/src/app/pages/admin/AdminAIDictionaryPage.tsx` - AI dictionary updates

5. **Chat**: `/src/app/pages/ChatPage.tsx`
   - Real-time messaging
   - Payment requests
   - Rating system

### Quick Integration Pattern
```typescript
// Find this pattern in the code:
// TODO: BACKEND - Replace with actual API call
// Mock implementation (remove when integrating):
setTimeout(() => {
  // Mock response
}, 1000);

// Replace with:
const response = await fetch('/api/your-endpoint', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
const result = await response.json();
```

---

## 🤖 For AI Engineers

### Where to Start
All AI integration points are marked with `TODO: AI` or `TODO: BACKEND/AI TEAM` comments.

### Key AI Services Needed

#### 1. Document Analysis Service
**File**: `/src/app/pages/client/ClientAIPage.tsx`

**Endpoint**: `POST /api/ai/analyze-document`

**Input**: PDF/DOC/DOCX file

**Expected Output**:
```json
{
  "analysis": "Full text analysis with key findings...",
  "documentId": "unique_id"
}
```

**Requirements**:
- Extract text from documents
- Identify document type (contract, agreement, legal notice, etc.)
- Analyze key clauses and terms
- Identify potential legal issues
- Provide plain-language summary
- Highlight areas requiring legal review

#### 2. Consultant Suggestion Service
**File**: `/src/app/pages/client/ClientProfessionalsPage.tsx`

**Endpoint**: `POST /api/ai/suggest-consultants`

**Input**: PDF/DOC/DOCX file

**Expected Output**:
```json
{
  "consultants": [
    {
      "id": "consultant_id",
      "name": "Name",
      "speciality": "Corporate Law",
      "yearsOfExperience": 15,
      "hourlyRate": 150,
      "rating": 4.8,
      "description": "Brief description",
      "country": "Saudi Arabia",
      "matchScore": 0.95
    }
  ]
}
```

**Requirements**:
- Analyze document to determine legal domain
- Match with consultant specialties in database
- Consider consultant experience and ratings
- Return top 2-3 most suitable consultants
- Include match confidence score

#### 3. AI Dictionary Management
**File**: `/src/app/pages/admin/AdminAIDictionaryPage.tsx`

**Endpoint**: `POST /api/admin/ai-dictionary`

**Input**: PDF file with legal terms

**Expected Output**:
```json
{
  "success": true,
  "message": "Dictionary updated successfully",
  "termsAdded": 150,
  "termsUpdated": 50
}
```

**Requirements**:
- Extract legal terms and definitions from PDF
- Update AI knowledge base
- Improve document analysis accuracy
- Support Arabic and English terms

### Integration Example for Document Analysis

```typescript
// In ClientAIPage.tsx, replace the mock implementation:

const handleUpload = async () => {
  if (!file) {
    toast.error('Please select a file first');
    return;
  }

  setAnalyzing(true);

  try {
    const formData = new FormData();
    formData.append('document', file);

    const response = await fetch('/api/ai/analyze-document', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
      body: formData
    });

    if (!response.ok) throw new Error('Analysis failed');

    const data = await response.json();
    setAnalysis(data.analysis);
    setAnalyzing(false);
    toast.success('Analysis complete!');
  } catch (error) {
    console.error('Error:', error);
    setAnalyzing(false);
    toast.error('Failed to analyze document');
  }
};
```

---

## 📱 Mobile Responsiveness

All pages are now optimized for mobile devices with:
- Responsive text sizes (`text-sm sm:text-base md:text-lg`)
- Flexible layouts (`flex-col sm:flex-row`)
- Touch-friendly buttons and inputs
- Proper spacing on small screens
- Truncated text where needed
- Adaptive padding (`p-4 sm:p-6 md:p-8`)

### Testing on Different Devices
- Mobile: 375px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

---

## 🔑 Authentication Flow

### Current Mock Implementation
Any email/password combination works. User role is determined by email:
- `admin@...` → Admin dashboard
- `consultant@...` → Consultant dashboard
- Other → Client dashboard

### Required Implementation
1. Hash passwords with bcrypt
2. Generate JWT tokens
3. Validate credentials against database
4. Return user object with role
5. Handle token expiration and refresh

---

## 📧 Email Notifications Required

### 1. Consultant Verification Email
**Trigger**: Admin approves consultant
**To**: Consultant email
**Subject**: "Your Safahat Account Has Been Verified"
**Content**: Welcome message, login link, next steps

### 2. Consultant Rejection Email
**Trigger**: Admin rejects consultant
**To**: Consultant email
**Subject**: "Safahat Account Application Update"
**Content**: Polite message with optional reason

### 3. New Consultation Request
**Trigger**: Client contacts consultant
**To**: Consultant email
**Subject**: "New Consultation Request"
**Content**: Client name, subject, preview, link to platform

---

## 🗄️ Database Schema Recommendations

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(50),
  role ENUM('client', 'consultant', 'admin') NOT NULL,
  status ENUM('active', 'suspended', 'pending_verification') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Consultants Table (extends users)
```sql
CREATE TABLE consultants (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  years_of_experience INT NOT NULL,
  hourly_rate DECIMAL(10,2) NOT NULL,
  speciality VARCHAR(255) NOT NULL,
  description TEXT,
  country VARCHAR(100) NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0,
  credentials_url VARCHAR(500),
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP
);
```

### Consultation Requests Table
```sql
CREATE TABLE consultation_requests (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES users(id),
  consultant_id UUID REFERENCES users(id),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  document_url VARCHAR(500),
  status ENUM('new', 'open', 'finished') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Chat Messages Table
```sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY,
  sender_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  attachment_url VARCHAR(500),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🛠️ Development Tips

### Finding Integration Points
Search for these in your code editor:
- `TODO: BACKEND`
- `TODO: AI`
- `Mock implementation`
- `setTimeout`

### Error Handling
All pages use `toast` for notifications:
```typescript
import { toast } from 'sonner';

toast.success('Success message');
toast.error('Error message');
toast.info('Info message');
```

### Loading States
Loading states are already implemented in UI:
- Spinner components
- Disabled buttons during loading
- Loading text indicators

### Testing Locally
1. Start the frontend: `npm run dev`
2. Backend should run on different port
3. Update fetch URLs to point to your backend
4. Use CORS headers on backend

---

## 📚 Additional Documentation

- **Full API Specification**: `/BACKEND_AI_INTEGRATION_GUIDE.md`
- **Project Structure**: `/FRONTEND_STRUCTURE.md`
- **API Integration Examples**: `/INTEGRATION_EXAMPLE.md`
- **Customization Guide**: `/CUSTOMIZATION_GUIDE.md`

---

## ❓ Common Questions

**Q: Where do I store uploaded files?**
A: Use cloud storage (AWS S3, Google Cloud Storage) and store only URLs in database.

**Q: How to handle real-time chat?**
A: Implement WebSocket server or use service like Pusher/Socket.io. Connection code ready in ChatPage.tsx.

**Q: What about payment integration?**
A: Integrate Stripe, PayPal, or local payment gateway. Payment button handlers are in ChatPage.tsx.

**Q: How to handle file size limits?**
A: Frontend validates file size. Backend should also validate and limit to 10MB.

**Q: What about security?**
A: Always validate JWT tokens, sanitize inputs, scan uploaded files for malware, use HTTPS in production.

---

## 🎯 Priority Integration Order

1. **Authentication** - Login/Register endpoints
2. **Client AI Analysis** - Document upload and analysis
3. **Consultant Suggestions** - AI-powered matching
4. **Chat System** - Real-time messaging
5. **Admin Panel** - User and consultant management
6. **Email Notifications** - Verification and updates
7. **Payment System** - Payment requests and processing

---

## 📞 Need Help?

If you encounter any issues or need clarification:
1. Check the detailed integration guide
2. Review the code comments
3. Contact the frontend team
4. Check existing mock implementations for expected data structure

Good luck with the integration! 🚀
