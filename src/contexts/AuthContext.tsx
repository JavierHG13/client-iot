import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
//import api from '../services/api/auth'
import mockApi from '../services/mockApi'

interface User {
    id: string
    name: string
    email: string
    role: 'user' | 'admin' | 'employee' | 'owner'
    password: string
    avatar?: string
    deviceId?: string
  }

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
  hasRole: (requiredRole: User['role']) => boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')

      console.log(token)

      if (token) {
        try {
          const user = await mockApi.auth.me()
          
          setUser(user)
        } catch (error) {
        console.log('Error al verificar la autenticación:', error)
          logout()
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (credentials: { email: string; password: string }) => {

    const { token, user } = await mockApi.auth.login(credentials)
    localStorage.setItem('token', token)
    setUser(user)
    navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  const hasRole = (requiredRole: User['role']): boolean => {
    return user?.role === requiredRole
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}