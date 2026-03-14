# Safahat Frontend - Quick Start Guide

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `/dist` folder.

## Testing the Application

### Login Credentials (Mock)

The authentication is currently mocked. Use these patterns to test different user types:

| User Type | Email Pattern | Password | Redirect To |
|-----------|--------------|----------|-------------|
| **Admin** | Contains "admin" (e.g., `admin@test.com`) | Any password | `/admin/home` |
| **Consultant** | Contains "consultant" (e.g., `consultant@test.com`) | Any password | `/consultant/home` |
| **Client** | Any other email (e.g., `client@test.com`) | Any password | `/client/home` |

### User Flows to Test

#### 1. Client Registration & Usage
```
1. Click "Register" on landing page
2. Select "Client" user type
3. Enter email (e.g., client@test.com)
4. Fill in: Name, Password, Phone
5. Accept terms and conditions
6. See thank you message → Auto-redirect to login
7. Login with credentials
8. Test AI Assistant: Upload a .pdf or .doc file
9. Test Browse Professionals: Search, filter, view profiles
10. Click "Contact" on a consultant → Opens chat
11. Send messages in chat
12. End conversation → Rate the consultant
```

#### 2. Consultant Registration & Usage
```
1. Click "Register" on landing page
2. Select "Legal Consultant" user type
3. Enter email (e.g., consultant@test.com)
4. Fill in: Name, Password, Phone
5. Fill professional info: Country, License #, Authority, Experience, etc.
6. Upload profile photo (optional)
7. Accept terms and conditions
8. See thank you message (account needs verification)
9. Admin must verify before consultant can login
```

#### 3. Admin Functions
```
1. Login with admin credentials (e.g., admin@test.com)
2. Test Sidebar: Click menu icon in top-left
3. View pending verifications → Verify or reject consultants
4. Manage Users → View reported users → Suspend/reinstate
5. AI Dictionary → Add/edit/delete legal terms
```

## Project Structure

```
/src/app/
├── App.tsx                    # Root component
├── routes.tsx                 # All routes defined here
├── contexts/
│   └── AuthContext.tsx       # Global auth state
├── components/               # Reusable components
│   ├── VintageLayout.tsx
│   ├── VintageButton.tsx
│   └── VintageInput.tsx
└── pages/                    # All page components
    ├── LandingPage.tsx       # Login
    ├── RegisterPage.tsx      # Multi-step registration
    ├── client/              # Client pages
    ├── consultant/          # Consultant pages
    └── admin/              # Admin pages
```

## Key Features Implemented

✅ **Authentication System**
- Login/Register flows
- Role-based routing
- Mock implementation (ready for backend)

✅ **Client Features**
- AI document analysis (mock)
- Browse and filter consultants
- Chat with consultants
- Rating system

✅ **Consultant Features**
- Profile management
- Request management (new/open/finished)
- Chat with clients
- Payment requests

✅ **Admin Features**
- Verify consultant applications
- Manage reported users
- Update AI dictionary (CRUD)
- Expandable sidebar navigation

✅ **Chat System**
- Real-time messaging interface
- File attachments
- Payment requests
- Report functionality
- End conversation & rating

✅ **Vintage Aesthetic**
- Old pages/parchment style
- Amber color scheme
- Serif typography
- Decorative borders and patterns

## API Integration Points

All API integration points are marked with `TODO` comments in the code. Key files to update:

1. **Authentication**: `/src/app/contexts/AuthContext.tsx`
2. **AI Analysis**: `/src/app/pages/client/ClientAIPage.tsx`
3. **Consultant Suggestions**: `/src/app/pages/client/ClientProfessionalsPage.tsx`
4. **Chat**: `/src/app/pages/ChatPage.tsx`
5. **Admin Verify**: `/src/app/pages/admin/AdminVerifyPage.tsx`
6. **Admin Users**: `/src/app/pages/admin/AdminManageUsersPage.tsx`
7. **AI Dictionary**: `/src/app/pages/admin/AdminAIDictionaryPage.tsx`

See `/API_INTEGRATION.md` for complete API documentation.

## Common Tasks

### Adding a New Page

1. Create component in `/src/app/pages/`
2. Add route in `/src/app/routes.tsx`
3. Import and navigate using `useNavigate()` hook

```typescript
// In routes.tsx
{
  path: "/new-page",
  Component: NewPage,
}

// In any component
import { useNavigate } from 'react-router';
const navigate = useNavigate();
navigate('/new-page');
```

### Making API Calls

Replace mock data with actual API calls:

```typescript
// Current (Mock)
const data = mockData;

// Replace with (Real API)
const response = await fetch('/api/endpoint', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
const data = await response.json();
```

### Using Authentication

```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, login, logout } = useAuth();
  
  // Check user role
  if (user?.role === 'admin') {
    // Admin-specific code
  }
  
  // Login
  await login(email, password);
  
  // Logout
  logout();
}
```

### Styling Components

Use Tailwind classes with the vintage theme:

```typescript
<div className="bg-amber-50 border-2 border-amber-800 p-4">
  <h2 className="text-amber-900 font-serif text-xl">Title</h2>
  <p className="text-amber-800 font-serif">Content</p>
</div>
```

Or use the provided components:

```typescript
import { VintageButton } from './components/VintageButton';
import { VintageInput } from './components/VintageInput';

<VintageInput 
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<VintageButton onClick={handleSubmit}>
  Submit
</VintageButton>
```

## Mock Data Locations

All mock data is currently hardcoded in components:

- **Consultants**: `/src/app/pages/client/ClientProfessionalsPage.tsx` (mockConsultants)
- **Chat Messages**: `/src/app/pages/ChatPage.tsx` (messages state)
- **Requests**: `/src/app/pages/consultant/ConsultantRequestsPage.tsx` (mockRequests)
- **Verifications**: `/src/app/pages/admin/AdminVerifyPage.tsx` (mockApplications)
- **Reported Users**: `/src/app/pages/admin/AdminManageUsersPage.tsx` (mockReportedUsers)
- **Dictionary**: `/src/app/pages/admin/AdminAIDictionaryPage.tsx` (mockDictionary)

## Notifications

Toast notifications use `sonner`. Import and use anywhere:

```typescript
import { toast } from 'sonner';

toast.success('Success message');
toast.error('Error message');
toast.info('Info message');
```

## File Uploads

Current file upload validation:
- Documents: `.pdf`, `.doc`, `.docx` only
- Profile photos: Image files
- Max size: 10MB (recommended backend limit)

Example:

```typescript
<input
  type="file"
  accept=".pdf,.doc,.docx"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Process file
    }
  }}
/>
```

## Environment Variables

Create a `.env` file in the root (if needed):

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_AI_API_URL=http://localhost:5000/api/ai
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## Troubleshooting

### Routes not working
- Check `/src/app/routes.tsx` for correct path
- Ensure component is imported correctly
- Verify RouterProvider is used in App.tsx

### Styles not applying
- Tailwind classes should work automatically
- Check if custom classes use the amber color scheme
- Verify font-serif is applied for text

### Authentication not working
- Remember it's mocked! Use the email patterns above
- Check AuthContext for mock logic
- User state is stored in React state (not persisted)

## Next Steps for Development

1. **Backend Integration**
   - Replace all mock auth in AuthContext
   - Connect all API endpoints
   - Add real-time chat (WebSocket)

2. **AI Integration**
   - Connect document analysis endpoint
   - Connect consultant suggestion endpoint
   - Test with real documents

3. **Additional Features**
   - Email notifications
   - Payment gateway integration
   - File storage system
   - Search optimization

4. **Testing**
   - Unit tests for components
   - Integration tests for flows
   - E2E tests for critical paths

5. **Deployment**
   - Configure environment variables
   - Set up CI/CD
   - Configure server for SPA routing

## Support

For detailed information:
- **API Documentation**: See `/API_INTEGRATION.md`
- **Project Structure**: See `/FRONTEND_STRUCTURE.md`
- **Component Files**: Check `/src/app/` directory

## Development Tips

1. **Hot Reload**: Changes auto-refresh in development
2. **Console Logs**: Check browser console for TODO comments and errors
3. **Mock Data**: Edit mock data directly in component files for testing
4. **Responsive**: Test on different screen sizes (mobile/tablet/desktop)
5. **Icons**: Use lucide-react for additional icons if needed

---

Happy coding! 🎨📜
