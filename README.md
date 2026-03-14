# Safahat - Legal Consultation Platform

A comprehensive legal consultation web application connecting clients with verified legal consultants, featuring AI-powered document analysis and real-time chat functionality.

## 🎨 Features

### Multi-User System
- **Clients**: Upload documents for AI analysis, browse and contact legal consultants
- **Legal Consultants**: Manage client requests, conduct consultations, send payment requests
- **Admins**: Verify consultant applications, manage users, update AI legal dictionary

### Core Functionality
- ✅ Multi-step registration with role-based authentication
- ✅ AI-powered document analysis (.pdf, .doc, .docx)
- ✅ AI-suggested consultant matching based on document analysis
- ✅ Advanced consultant search and filtering
- ✅ Real-time chat system with file attachments
- ✅ Payment request system
- ✅ Rating and review system
- ✅ Report user functionality
- ✅ Admin verification workflow
- ✅ User suspension/reinstatement system
- ✅ AI legal dictionary management

### Design
- 📜 Vintage/old pages aesthetic with parchment-style layouts
- 🎨 Amber color palette with serif typography
- 📱 Fully responsive design (mobile, tablet, desktop)
- ♿ Accessibility-focused with semantic HTML

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
/src/app/
├── App.tsx                          # Main app component
├── routes.tsx                       # Route definitions
├── contexts/
│   └── AuthContext.tsx             # Authentication state
├── components/
│   ├── VintageLayout.tsx           # Main layout wrapper
│   ├── VintageButton.tsx           # Styled button
│   └── VintageInput.tsx            # Styled input
└── pages/
    ├── LandingPage.tsx             # Login page
    ├── RegisterPage.tsx            # Multi-step registration
    ├── ThankYouPage.tsx            # Post-registration
    ├── ChatPage.tsx                # Chat interface
    ├── client/                     # Client pages
    │   ├── ClientHomePage.tsx
    │   ├── ClientAIPage.tsx
    │   └── ClientProfessionalsPage.tsx
    ├── consultant/                 # Consultant pages
    │   ├── ConsultantHomePage.tsx
    │   ├── ConsultantProfilePage.tsx
    │   └── ConsultantRequestsPage.tsx
    └── admin/                      # Admin pages
        ├── AdminHomePage.tsx
        ├── AdminVerifyPage.tsx
        ├── AdminManageUsersPage.tsx
        └── AdminAIDictionaryPage.tsx
```

## 🧪 Testing (Mock Mode)

The app currently uses mock authentication. Use these email patterns:

| Role | Email Pattern | Example |
|------|--------------|---------|
| **Admin** | Contains "admin" | admin@test.com |
| **Consultant** | Contains "consultant" | consultant@test.com |
| **Client** | Any other email | client@test.com |

Password can be anything in mock mode.

## 🔌 Backend Integration

### Ready for Integration
All API endpoints are documented and marked with `TODO` comments in the code.

### Key Integration Points:
1. **Authentication** (`/src/app/contexts/AuthContext.tsx`)
2. **AI Document Analysis** (`/src/app/pages/client/ClientAIPage.tsx`)
3. **Consultant Suggestions** (`/src/app/pages/client/ClientProfessionalsPage.tsx`)
4. **Chat System** (`/src/app/pages/ChatPage.tsx`)
5. **Admin Functions** (`/src/app/pages/admin/*`)

## 📚 Documentation

Comprehensive documentation is provided:

### For Developers
- **[QUICK_START.md](./QUICK_START.md)** - Get started quickly
- **[FRONTEND_STRUCTURE.md](./FRONTEND_STRUCTURE.md)** - Complete architecture overview
- **[CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md)** - How to customize features

### For Backend Engineers
- **[API_INTEGRATION.md](./API_INTEGRATION.md)** - Complete API documentation
- **[INTEGRATION_EXAMPLE.md](./INTEGRATION_EXAMPLE.md)** - Step-by-step integration example

## 🛠 Technology Stack

- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **React Router v7** - Routing (Data mode)
- **Tailwind CSS v4** - Styling
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **Motion** - Animations
- **Vite** - Build tool

## 🎯 User Flows

### Client Journey
1. Register/Login → Client Dashboard
2. Choose: AI Assistant OR Browse Consultants
3. AI: Upload document → Get analysis → Contact consultant
4. Browse: Search/filter → View profiles → Contact consultant
5. Chat → Send messages → Rate consultant

### Consultant Journey
1. Register → Wait for admin verification
2. Login → View requests (new/open/finished)
3. Accept request → Chat with client
4. Send payment requests → Complete consultation
5. Manage profile → Request edits or delete account

### Admin Journey
1. Login (special credentials)
2. Verify consultant applications
3. Manage reported users (suspend/reinstate)
4. Update AI legal dictionary
5. Monitor platform activity

## 🔐 Security Features (To Implement)

- JWT token authentication
- Protected routes
- File upload validation
- XSS protection
- CORS configuration
- Rate limiting
- Input sanitization

## 📊 Required API Endpoints

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Consultants
- `GET /api/consultants`
- `GET /api/consultants/:id`
- `POST /api/consultants/:id/rate`

### Chat
- `GET /api/chat/:consultantId`
- `POST /api/chat/:consultantId/message`
- `POST /api/chat/:consultantId/attachment`
- `POST /api/chat/:consultantId/end`

### AI
- `POST /api/ai/analyze-document`
- `POST /api/ai/suggest-consultants`

### Admin
- `GET /api/admin/consultants/pending`
- `POST /api/admin/consultants/verify`
- `GET /api/admin/users/reported`
- `POST /api/admin/users/suspend`
- `GET /api/admin/dictionary`
- `POST /api/admin/dictionary`
- `PUT /api/admin/dictionary/:id`
- `DELETE /api/admin/dictionary/:id`

See [API_INTEGRATION.md](./API_INTEGRATION.md) for complete specifications.

## 🌐 Environment Variables

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000
VITE_AI_API_URL=http://localhost:5000/api/ai
```

## 🎨 Customization

The app uses a vintage aesthetic that can be customized:

### Change Color Theme
Replace `amber-*` classes with your preferred Tailwind color throughout components.

### Change Typography
Replace `font-serif` with `font-sans` or import custom fonts in `/src/styles/fonts.css`.

### Modify Layout
Edit `/src/app/components/VintageLayout.tsx` to change background patterns and overall structure.

See [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) for detailed instructions.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚧 Pending Implementation

These features are UI-ready but need backend integration:

- [ ] Real authentication with JWT
- [ ] WebSocket for real-time chat
- [ ] AI document analysis endpoint
- [ ] Payment gateway integration
- [ ] Email notification service
- [ ] File storage service
- [ ] Profile photo uploads
- [ ] Document attachment storage

## 🧩 Component Library

Reusable components:

- `VintageLayout` - Page wrapper with logo and background
- `VintageButton` - Styled button (primary/secondary variants)
- `VintageInput` - Styled text input with label support

## 🐛 Known Limitations

- Authentication is currently mocked
- Chat is not real-time (needs WebSocket)
- File uploads simulate but don't persist
- AI responses are mocked
- No data persistence (everything in memory)

## 📦 Build & Deploy

```bash
# Build
npm run build

# Output directory
/dist

# Deploy to any static hosting:
# - Vercel
# - Netlify
# - AWS S3 + CloudFront
# - GitHub Pages
```

**Important**: Configure your hosting for SPA routing (redirect all routes to index.html).

## 🤝 Contributing

This frontend is ready for backend and AI team integration. Follow these steps:

1. Read [API_INTEGRATION.md](./API_INTEGRATION.md)
2. Review [INTEGRATION_EXAMPLE.md](./INTEGRATION_EXAMPLE.md)
3. Search for `TODO:` comments in code
4. Replace mock implementations with real API calls
5. Test thoroughly with real data

## 📞 Support

For questions about:
- **Frontend**: Check component files in `/src/app/`
- **API Integration**: See [API_INTEGRATION.md](./API_INTEGRATION.md)
- **Structure**: See [FRONTEND_STRUCTURE.md](./FRONTEND_STRUCTURE.md)

## 📄 License

[Add your license here]

## 👥 Team

- Frontend Development: [Your Name]
- Backend Integration: [Backend Team]
- AI Integration: [AI Team]

---

**Version**: 1.0.0  
**Last Updated**: March 14, 2026  
**Status**: Ready for Backend Integration ✅
