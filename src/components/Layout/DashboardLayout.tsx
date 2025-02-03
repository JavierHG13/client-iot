import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Header from '../Common/Header'
import AppFooter from '../Common/Footer'

interface DashboardLayoutProps {
  requiredRole: 'user' | 'admin' | 'employee' | 'owner'
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ requiredRole }) => {
  const { user, hasRole } = useAuth()

  // Verificar autenticación y rol
  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!hasRole(requiredRole)) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="dashboard-layout">
      <Header />
      <main className="dashboard-content">
        <Outlet /> {/* Aquí se renderizan las rutas privadas */}
      </main>
      <AppFooter />
    </div>
  )
}

export default DashboardLayout