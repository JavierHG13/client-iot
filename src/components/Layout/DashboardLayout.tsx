import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Header from '../Common/Header'
import AppFooter from '../Common/Footer'
import Loader from '../Common/Loader'

interface DashboardLayoutProps {
  requiredRole: 'cliente' | 'admin'
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ requiredRole }) => {

  const { user, hasRole, loading } = useAuth();

  // Si está cargando, mostrar el loader
  if (loading) {
    return (
      <div className="dashboard-layout">
        <Header />
        <div className="loader-container">
          <Loader />
        </div>
        <AppFooter />
      </div>
    );
  }

  // Verificar autenticación y rol
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="dashboard-layout">
      <Header />
      <main className="dashboard-content">
        <Outlet /> {/* Renderizar las vistas */}
      </main>
      <AppFooter />
    </div>
  );
};

export default DashboardLayout;