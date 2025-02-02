import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PublicLayout from './components/Layout/PublicLayout'
import DashboardLayout from './components/Layout/DashboardLayout'

import Home from './pages/public/Home'
import Login from './pages/public/Auth/Login'
import UserDashboard from './pages/private/User/UserDashboard'
import AdminDashboard from './pages/private/Admin/AdminDashboard'
import Productos from './pages/public/Productos'
import Loader from './components/Common/Loader'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/loader" element={<Loader/>}/>
          </Route>

          {/* Rutas privadas para usuarios */}
          <Route element={<DashboardLayout requiredRole="user" />}>
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>

          {/* Rutas privadas para administradores */}
          <Route element={<DashboardLayout requiredRole="admin" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App