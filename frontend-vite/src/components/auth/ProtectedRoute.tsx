// src/components/auth/ProtectedRoute.tsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  roles?: string[] // facultatif : si tu veux plus tard restreindre par rôle
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  // 🔒 Si pas connecté → redirige vers login
  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  // 🔐 Si restriction de rôle → vérifie
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
