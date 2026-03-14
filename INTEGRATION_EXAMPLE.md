# API Integration Example

This document shows a complete example of integrating the authentication system with a real backend API.

## Example: Implementing Real Authentication

### 1. Current Mock Implementation

**File**: `/src/app/contexts/AuthContext.tsx`

```typescript
// CURRENT MOCK VERSION
const login = async (email: string, password: string) => {
  // Mock login - check if admin
  if (email.includes('admin')) {
    setUser({
      id: '1',
      email,
      role: 'admin',
      name: 'Admin User',
    });
  } else if (email.includes('consultant')) {
    setUser({
      id: '2',
      email,
      role: 'consultant',
      name: 'Legal Consultant',
      verified: true,
    });
  } else {
    setUser({
      id: '3',
      email,
      role: 'client',
      name: 'Client User',
    });
  }
};
```

### 2. Real API Implementation

Replace the mock login function with this real implementation:

```typescript
// REAL API VERSION
const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Include cookies if using sessions
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store user data
    setUser(data.user);
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Re-throw to handle in component
  }
};
```

### 3. Backend API Endpoint

Your backend should implement this endpoint:

```javascript
// Node.js/Express example
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: {
          code: 'INVALID_INPUT',
          message: 'Email and password are required',
        },
      });
    }
    
    // Find user in database
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
    }
    
    // Verify password (using bcrypt)
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
    }
    
    // Check if consultant is verified
    if (user.role === 'consultant' && !user.verified) {
      return res.status(403).json({
        error: {
          code: 'NOT_VERIFIED',
          message: 'Your account is pending verification',
        },
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Return user data and token
    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.fullName,
        profilePhoto: user.profilePhoto,
        verified: user.verified,
      },
      token,
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred during login',
      },
    });
  }
});
```

### 4. Update Login Component

**File**: `/src/app/pages/LandingPage.tsx`

Update the handleLogin function to handle errors properly:

```typescript
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!email || !password) {
    toast.error('Please fill in all fields');
    return;
  }

  try {
    await login(email, password);
    
    // Get the updated user from context
    // Note: This will be available after login() sets it
    
    // For now, we check localStorage or make a separate API call
    const token = localStorage.getItem('authToken');
    if (token) {
      // Decode token to get role (or make GET /api/auth/me request)
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Redirect based on role
      if (payload.role === 'admin') {
        navigate('/admin/home');
      } else if (payload.role === 'consultant') {
        navigate('/consultant/home');
      } else {
        navigate('/client/home');
      }
    }
    
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Login failed');
  }
};
```

### 5. Better Approach: Store User in Context

Update AuthContext to better manage user state:

```typescript
// Enhanced AuthContext.tsx
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Login failed');
    }

    const data = await response.json();
    setUser(data.user);
    localStorage.setItem('authToken', data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    // Optional: Call backend logout endpoint
  };

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 6. Simplified Login Component

Now the login component is cleaner:

```typescript
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!email || !password) {
    toast.error('Please fill in all fields');
    return;
  }

  try {
    await login(email, password);
    // User is now set in context, we can access it
    // Redirect is handled by useEffect that watches user state
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Login failed');
  }
};

// Add this useEffect to handle redirects
useEffect(() => {
  if (user) {
    if (user.role === 'admin') {
      navigate('/admin/home');
    } else if (user.role === 'consultant') {
      navigate('/consultant/home');
    } else {
      navigate('/client/home');
    }
  }
}, [user, navigate]);
```

---

## Example: Protected Routes

Create a protected route wrapper:

```typescript
// /src/app/components/ProtectedRoute.tsx
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<'client' | 'consultant' | 'admin'>;
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
```

Use in routes:

```typescript
// routes.tsx
import { ProtectedRoute } from './components/ProtectedRoute';

{
  path: "/admin/home",
  element: (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminHomePage />
    </ProtectedRoute>
  ),
}
```

---

## Example: Making Authenticated API Calls

Create a fetch wrapper that includes the auth token:

```typescript
// /src/app/utils/api.ts
export async function authenticatedFetch(
  endpoint: string, 
  options: RequestInit = {}
) {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('authToken');
    window.location.href = '/';
    throw new Error('Session expired');
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Request failed');
  }

  return response.json();
}
```

Use it in components:

```typescript
// Example: Get consultants
import { authenticatedFetch } from '../utils/api';

const fetchConsultants = async () => {
  try {
    const data = await authenticatedFetch('/consultants?sortBy=rating');
    setConsultants(data.consultants);
  } catch (error) {
    toast.error('Failed to load consultants');
  }
};
```

---

## Example: File Upload

```typescript
// Upload profile photo during registration
const handleRegister = async () => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('fullName', fullName);
    formData.append('phone', phone);
    formData.append('userType', userType);
    
    if (userType === 'consultant') {
      formData.append('country', country);
      formData.append('licenseNumber', licenseNumber);
      // ... other consultant fields
      
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto);
      }
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: formData, // Note: No Content-Type header for FormData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Registration failed');
    }

    const data = await response.json();
    navigate('/thank-you', { state: { userType } });
    
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Registration failed');
  }
};
```

---

## Example: WebSocket for Real-time Chat

```typescript
// /src/app/hooks/useChat.ts
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useChat(consultantId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const socket = new WebSocket(
      `${import.meta.env.VITE_WS_URL}/chat/${consultantId}?token=${token}`
    );

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [consultantId]);

  const sendMessage = (content: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'message',
        content,
        sender: user?.role,
      }));
    }
  };

  return { messages, sendMessage };
}
```

Use in ChatPage:

```typescript
// In ChatPage.tsx
import { useChat } from '../hooks/useChat';

export function ChatPage() {
  const { consultantId } = useParams();
  const { messages, sendMessage } = useChat(consultantId!);

  const handleSend = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  // Rest of component...
}
```

---

## Testing the Integration

### 1. Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"client@test.com","password":"password123"}'
```

Expected response:
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "client@test.com",
    "role": "client",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Test Protected Endpoint
```bash
curl -X GET http://localhost:3000/api/consultants \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Test File Upload
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -F "email=consultant@test.com" \
  -F "password=password123" \
  -F "fullName=Jane Smith" \
  -F "phone=+1234567890" \
  -F "userType=consultant" \
  -F "country=USA" \
  -F "licenseNumber=BAR-2020-12345" \
  -F "profilePhoto=@/path/to/photo.jpg"
```

---

## Environment Setup

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000
```

For production:

```env
VITE_API_BASE_URL=https://api.safahat.com/api
VITE_WS_URL=wss://api.safahat.com
```

---

This example demonstrates the complete flow from mock to real implementation. Apply the same pattern to all other API endpoints!
