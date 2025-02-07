import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import api from "../services/axios";

interface User {
    id: string;
    nombre: string;
    apellidos: string;
    email: string;
    rol: "cliente" | "admin" | "empleado" | "propietario"; 
    avatar?: string;
}


interface AuthContextValue {
    user: User | null;
    loading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    hasRole: (requiredRole: User["rol"]) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    // Verificar autenticación al cargar la aplicación
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get("/verify");
                setUser({
                    id: response.data.id,
                    nombre: response.data.nombre,
                    apellidos: response.data.apellidos,
                    email: response.data.email,
                    rol: response.data.rol,
                    avatar: response.data.avatar,
                });
            } catch (error) {
                console.error("Error al verificar autenticación:", error);
                setUser(null);
            }
            setLoading(false); // Marcar como completado
        };

        checkAuth();
    }, []);

    // Función para iniciar sesión
    const login = async (credentials: { email: string; password: string }) => {
        setLoading(true);
        try {
            const response = await api.post("/login", credentials);
            setUser({
                id: response.data.id,
                nombre: response.data.nombre,
                apellidos: response.data.apellidos,
                email: response.data.email,
                rol: response.data.rol,
                avatar: response.data.avatar,
            });
            // Redirigir según el rol
            navigate(response.data.rol === "admin" ? "/admin/dashboard" : "/dashboard");
            message.success("Inicio de sesión exitoso!");
        } catch (error: any) {
            
            console.error("Error al iniciar sesión:", error);
            message.error(error.response?.data.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    // Función para cerrar sesión
    const logout = async ():Promise<void> => {
        try {
            await api.post("/logout");
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    // Función para verificar si el usuario tiene un rol específico
    const hasRole = (requiredRole: User["rol"]): boolean => {
        return user?.rol === requiredRole;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto de autenticación
export const useAuth = (): AuthContextValue => {

    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};