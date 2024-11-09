import React, { createContext, useContext, useState, useEffect } from 'react';
import { addAdmin, getAdmin, AdminCredentials } from '../utils/adminDB';

interface User {
  id: string;
  role: 'admin';
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
  addNewAdmin: (admin: AdminCredentials) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize with a default admin if none exists
const initializeDefaultAdmin = () => {
  const defaultAdmin: AdminCredentials = {
    email: 'admin@xylearn.com',
    password: 'admin123',
    name: 'Admin User'
  };
  
  if (!getAdmin(defaultAdmin.email)) {
    addAdmin(defaultAdmin);
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    initializeDefaultAdmin();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const login = async (credentials: { email: string; password: string }) => {
    const admin = getAdmin(credentials.email);
    
    if (!admin || admin.password !== credentials.password) {
      throw new Error('Invalid credentials');
    }

    setUser({
      id: admin.email,
      role: 'admin',
      name: admin.name,
      email: admin.email
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const addNewAdmin = async (adminData: AdminCredentials) => {
    if (!isAdmin()) {
      throw new Error('Unauthorized');
    }
    await addAdmin(adminData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, addNewAdmin }}>
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