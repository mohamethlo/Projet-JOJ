import React, { createContext, useContext, useState, useEffect } from 'react';

// Mapping des rôles backend vers frontend
export type UserRole = 'VISITOR' | 'LOCAL' | 'GUIDE' | 'ORGANIZER' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  role: UserRole;
  token: string;
  createdAt?: string;
  lastLogin?: string;
  profile?: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Charger l'utilisateur depuis le localStorage au démarrage
    const savedUser = localStorage.getItem('lateranga_user');
    const savedToken = localStorage.getItem('lateranga_token');
    
    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser({ ...parsedUser, token: savedToken });
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
        localStorage.removeItem('lateranga_user');
        localStorage.removeItem('lateranga_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Email ou mot de passe incorrect');
        }
        throw new Error('Erreur de connexion au serveur');
      }

      const data = await response.json();
      
      // Décoder le token JWT pour obtenir les informations utilisateur
      const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
      
      const userData: User = {
        id: tokenPayload.userId || tokenPayload.sub,
        email: tokenPayload.sub || email,
        role: tokenPayload.role || 'VISITOR',
        token: data.token,
      };

      setUser(userData);
      localStorage.setItem('lateranga_user', JSON.stringify(userData));
      localStorage.setItem('lateranga_token', data.token);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error instanceof Error ? error : new Error('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'VISITOR' }), // rôle fixé à VISITOR
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Cet email est déjà utilisé');
      }
      throw new Error('Erreur lors de l\'inscription');
    }

    const data = await response.json();
    const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));

    const userData: User = {
      id: tokenPayload.userId || tokenPayload.sub,
      email: tokenPayload.sub || email,
      role: 'VISITOR',
      token: data.token,
    };

    setUser(userData);
    localStorage.setItem('lateranga_user', JSON.stringify(userData));
    localStorage.setItem('lateranga_token', data.token);

  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    throw error instanceof Error ? error : new Error('Erreur lors de l\'inscription');
  } finally {
    setIsLoading(false);
  }
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('lateranga_user');
    localStorage.removeItem('lateranga_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};