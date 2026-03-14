import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'client' | 'consultant' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  profilePhoto?: string;
  verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // TODO: Replace with actual API call
    // Example: const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    
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

  const logout = () => {
    setUser(null);
    // TODO: Call backend logout endpoint
  };

  const register = async (userData: any) => {
    // TODO: Replace with actual API call
    // Example: await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(userData) });
    console.log('Registering user:', userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
