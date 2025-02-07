import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PublicLayout from './components/Layout/PublicLayout'
import DashboardLayout from './components/Layout/DashboardLayout'

import Home from './pages/public/Home'
import Login from './pages/public/Auth/Login'
import UserDashboard from './pages/private/client/UserDashboard'
import AdminDashboard from './pages/private/Admin/AdminDashboard'
import Productos from './pages/public/Productos'
import Loader from './components/Common/Loader'
import Registro from './pages/public/Auth/Register'
import Contacto from './pages/public/Contacto'
import About from './pages/public/About'
import Verificacion from './pages/public/Auth/Verfificacion'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/about" element={<About />} />
         
            <Route path="/contacto" element={<Contacto/>}/>

            <Route path="/loader" element={<Loader/>}/>
            <Route path="/verificacion" element={<Verificacion/>}/>
          </Route>

          {/* Rutas privadas para usuarios */}
          <Route element={<DashboardLayout requiredRole="cliente" />}>
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