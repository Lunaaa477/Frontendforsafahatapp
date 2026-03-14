# Safahat Frontend Structure

## Project Overview
Safahat is a legal consultation platform with three user types: Clients, Legal Consultants, and Admins. The frontend is built with React, TypeScript, React Router, and Tailwind CSS with a vintage/old pages aesthetic.

## Directory Structure

```
/src/app/
├── App.tsx                          # Main app component with RouterProvider
├── routes.tsx                       # All route definitions
├── contexts/
│   └── AuthContext.tsx             # Authentication state management
├── components/
│   ├── VintageLayout.tsx           # Main layout wrapper with old pages aesthetic
│   ├── VintageButton.tsx           # Styled button component
│   └── VintageInput.tsx            # Styled input component
└── pages/
    ├── LandingPage.tsx             # Login page (all users)
    ├── RegisterPage.tsx            # Multi-step registration
    ├── ThankYouPage.tsx            # Post-registration confirmation
    ├── ChatPage.tsx                # Chat between client and consultant
    ├── NotFound.tsx                # 404 page
    ├── client/
    │   ├── ClientHomePage.tsx      # Client dashboard
    │   ├── ClientAIPage.tsx        # AI document analysis
    │   └── ClientProfessionalsPage.tsx  # Browse consultants
    ├── consultant/
    │   ├── ConsultantHomePage.tsx  # Consultant dashboard
    │   ├── ConsultantProfilePage.tsx    # View/edit profile
    │   └── ConsultantRequestsPage.tsx   # Manage client requests
    └── admin/
        ├── AdminHomePage.tsx       # Admin dashboard with sidebar
        ├── AdminVerifyPage.tsx     # Verify consultant applications
        ├── AdminManageUsersPage.tsx # Manage reported users
        └── AdminAIDictionaryPage.tsx # Update AI legal dictionary
```

## User Flows

### Client Flow
1. **Landing** → Login or Register
2. **Registration** → Type selection → Credentials → Terms → Thank you → Auto-redirect to login
3. **Login** → Client Home
4. **Client Home** → Two options:
   - Upload to AI Assistant
   - Contact Professional Consultant
5. **AI Assistant** → Upload document → Analysis → Option to contact consultant
6. **Professionals** → Search/filter or upload for AI suggestion → View profiles → Contact
7. **Chat** → Message consultant → Receive payment requests → Rate after conversation ends

### Consultant Flow
1. **Landing** → Login or Register
2. **Registration** → Type selection → Credentials → Professional identity → Terms → Thank you (wait for verification)
3. **Login** → Consultant Home (after admin verification)
4. **Consultant Home** → Three request types:
   - New unopened requests (with count badge and alert icon)
   - Opened requests (in progress)
   - Finished requests (completed)
5. **Profile** → View details → Request edit or delete account
6. **Chat** → Respond to clients → Send payment requests

### Admin Flow
1. **Landing** → Login (special admin credentials)
2. **Admin Home** → Expandable sidebar with:
   - Profile
   - Verify Consultants (with badge for pending count)
   - Manage Users
   - Update AI Dictionary
3. **Verify Consultants** → Review applications → Verify or reject (triggers email)
4. **Manage Users** → View reported users → Suspend or reinstate accounts
5. **AI Dictionary** → Add/edit/delete legal terms for AI reference

## Key Features

### Authentication
- Email/password login
- Role-based routing (client/consultant/admin)
- Mock implementation ready for backend integration
- Located in: `/src/app/contexts/AuthContext.tsx`

### Vintage Aesthetic
- Old parchment/pages visual style
- Amber/brown color palette
- Serif fonts for text
- Border and shadow styling
- Pattern background
- Feather icon branding

### AI Integration Points
1. **Document Analysis** (ClientAIPage)
   - Upload .pdf/.doc files
   - Loading state with animation
   - Display analysis results
   - Mock response included

2. **Consultant Suggestions** (ClientProfessionalsPage)
   - Upload document for AI-suggested consultants
   - Same loading state
   - Display suggested profiles
   - Mock implementation included

### Chat System
- Real-time messaging interface
- File attachments support
- Payment request functionality
- Report user option
- End conversation option
- Rating system (clients only, after conversation ends)
- Located in: `/src/app/pages/ChatPage.tsx`

### Admin Features
- **Verification System**: Review consultant credentials, verify or reject with email notifications
- **User Management**: View reported accounts with reasons, suspend or reinstate
- **AI Dictionary**: CRUD operations for legal terms used by AI
- Expandable sidebar navigation
- Badge notifications for pending actions

## Styling System

### Colors (Amber/Vintage Theme)
- Background: `#f4f1e8` (warm beige)
- Primary: `amber-800` (dark amber)
- Secondary: `amber-700` (medium amber)
- Borders: `amber-300` to `amber-900`
- Text: `amber-900` (darkest for headings), `amber-800` (body text)
- Accents: Green for success, Red for errors/warnings

### Typography
- All text uses serif fonts via font-family: 'serif'
- Tracking (letter-spacing) for emphasis on headings
- Italic for secondary/helper text

### Components
- **VintageButton**: Two variants (primary with filled amber, secondary with border only)
- **VintageInput**: Amber border inputs with focus states
- **VintageLayout**: Consistent page wrapper with logo and feather icon

## State Management

### Global State (AuthContext)
```typescript
{
  user: User | null,
  login: (email, password) => Promise<void>,
  logout: () => void,
  register: (userData) => Promise<void>
}
```

### Local State Examples
- Form inputs (controlled components)
- Modal visibility toggles
- Filtering and search states
- Expandable sections
- File upload states

## Routing

All routes use React Router v7 Data mode:
- Route definitions in `/src/app/routes.tsx`
- Navigation with `useNavigate()` hook
- Route parameters for dynamic pages (e.g., `/chat/:consultantId`)
- Protected routes should be added at backend integration

## Mock Data

Mock data is currently used for:
- Consultant profiles
- Chat messages
- Client requests
- Pending verifications
- Reported users
- AI dictionary entries

All mock data includes `TODO` comments indicating where to replace with actual API calls.

## Form Validation

Current validation approach:
- Required fields checked before submission
- Email format validation (browser native)
- File type validation (.pdf, .doc, .docx for documents)
- Toast notifications for errors
- Can be enhanced with react-hook-form for more complex validation

## Responsive Design

The application is responsive:
- Mobile-friendly layouts
- Flexible grid systems
- Scrollable content areas
- Modal dialogs adapt to screen size
- Sidebar overlay on mobile (admin)

## Next Steps for Integration

1. **Replace Mock Auth** in `AuthContext.tsx` with real API calls
2. **Update AI Endpoints** in `ClientAIPage.tsx` and `ClientProfessionalsPage.tsx`
3. **Implement Chat Backend** in `ChatPage.tsx` with WebSocket or polling
4. **Connect Admin Functions** in admin pages with real data
5. **Add File Upload** integration for documents and profile photos
6. **Implement Payment Gateway** for consultant payment requests
7. **Add Email Service** for notifications (verification, rejection, etc.)

## Environment Variables Needed

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_AI_API_URL=http://localhost:5000/api/ai
VITE_PAYMENT_GATEWAY_KEY=your_payment_key
```

## Dependencies

Already installed:
- react-router (v7) - Routing
- lucide-react - Icons
- sonner - Toast notifications
- tailwindcss (v4) - Styling

Additional packages that may be needed:
- axios or fetch wrapper for API calls
- WebSocket library for real-time chat
- Payment gateway SDK (Stripe, PayPal, etc.)
- File upload library if needed

## Testing Accounts for Development

Use these email patterns in mock login:
- Admin: Any email containing "admin" (e.g., admin@safahat.com)
- Consultant: Any email containing "consultant" (e.g., consultant@test.com)
- Client: Any other email (e.g., client@test.com)

Password: Any password (mock auth doesn't validate)

## Browser Support

Built with modern web standards:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Notes

Current implementation includes:
- Semantic HTML elements
- Keyboard navigation support
- Screen reader text for icons
- Focus states on interactive elements
- Color contrast meets WCAG AA standards

Can be enhanced with:
- ARIA labels where needed
- Skip navigation links
- Better focus management in modals
- Form error announcements

## Performance Considerations

- Lazy loading can be added for routes
- Image optimization needed for profile photos
- Consider pagination for long lists (consultants, messages, etc.)
- Debounce search inputs
- Cache frequently accessed data

## Deployment Notes

Build command: `npm run build`
Output: `/dist` folder

The app is a SPA (Single Page Application) and requires:
- Server configuration for client-side routing (redirect all to index.html)
- Environment variables configured
- CORS enabled on backend
- HTTPS in production

---

For detailed API integration instructions, see `/API_INTEGRATION.md`
