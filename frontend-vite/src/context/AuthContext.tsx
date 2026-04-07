import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'tourist' | 'local' | 'guide' | 'organizer' | 'admin' | 'security' | 'hotel' | 'restaurant' | 'agency' | 'artisan';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  languages?: string[];
  interests?: string[];
  location?: string;
  bio?: string;
  isVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    // Simulate loading user from localStorage or API
    const savedUser = localStorage.getItem('discoversenegal_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      // Migration: Change 'test' to a more valid name if needed
      if (parsed.name.toLowerCase() === 'test') {
        const role = parsed.role;
        if (role === 'admin') parsed.name = 'Administrateur';
        else if (role === 'guide') parsed.name = 'Amadou Sarr';
        else if (role === 'hotel') parsed.name = 'Terrou-Bi Resort';
        else if (role === 'restaurant') parsed.name = 'La Fourchette';
        else if (role === 'agency') parsed.name = 'Sénégal Découvertes';
        else if (role === 'artisan') parsed.name = 'Artisanat d\'Excellence';
        else parsed.name = 'Voyageur';
        localStorage.setItem('discoversenegal_user', JSON.stringify(parsed));
      }
      setUser(parsed);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      // Mock login - replace with actual API call
      // Déterminer le rôle basé sur l'email pour les tests
      let role: UserRole = 'tourist';
      if (email.includes('admin')) role = 'admin';
      else if (email.includes('guide')) role = 'guide';
      else if (email.includes('organizer')) role = 'organizer';
      else if (email.includes('security')) role = 'security';
      else if (email.includes('local')) role = 'local';
      else if (email.includes('restaurant')) role = 'restaurant';
      else if (email.includes('hotel') || email.includes('auberge')) role = 'hotel';
      else if (email.includes('agence') || email.includes('agency')) role = 'agency';
      else if (email.includes('artisan')) role = 'artisan';

      const nameFromEmail = email.split('@')[0];
      let name = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

      // Noms plus réalistes pour les tests
      if (nameFromEmail.toLowerCase() === 'test') {
        if (role === 'admin') name = 'Administrateur';
        else if (role === 'guide') name = 'Amadou Sarr';
        else if (role === 'hotel') name = 'Terrou-Bi Resort';
        else if (role === 'restaurant') name = 'La Fourchette';
        else if (role === 'agency') name = 'Sénégal Découvertes';
        else if (role === 'artisan') name = 'Artisanat d\'Excellence';
        else name = 'Voyageur';
      }

      const mockUser: User = {
        id: '1',
        email,
        name: name,
        role,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        languages: ['français', 'english'],
        interests: ['culture', 'histoire', 'gastronomie'],
        location: 'Dakar',
        bio: 'Passionné par la culture sénégalaise et l\'accueil des visiteurs. J\'aime partager les richesses de mon pays.',
        isVerified: true
      };

      setUser(mockUser);
      localStorage.setItem('discoversenegal_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      // Mock registration - replace with actual API call
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email!,
        name: userData.name!,
        role: userData.role || 'tourist',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        languages: userData.languages || ['français'],
        interests: userData.interests || [],
        location: userData.location,
        bio: userData.bio || '',
        isVerified: false
      };

      setUser(newUser);
      localStorage.setItem('discoversenegal_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('discoversenegal_user');
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('discoversenegal_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
