// src/types/backend.ts

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
}

export enum UserRole {
  VISITOR = 'VISITOR',
  LOCAL = 'LOCAL',
  GUIDE = 'GUIDE',
  ORGANIZER = 'ORGANIZER',
  ADMIN = 'ADMIN'
}

export interface UserEntity {
  id: number;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
  profile?: ProfileEntity;
}

export interface ProfileEntity {
  id: number;
  userId: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  languages?: string[];
  interests?: string[];
  location?: string;
  isVerified: boolean;
}

// Types pour le JWT Token Payload
export interface JwtPayload {
  sub: string; // email
  userId: number;
  role: UserRole;
  iat: number; // issued at
  exp: number; // expiration
}