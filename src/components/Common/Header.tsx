import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Dropdown, Menu,  Avatar, Badge } from 'antd'
import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    DashboardOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons'
import './Header.css'

const Header: React.FC = () => {
    const { user, logout, hasRole } = useAuth()

     // Menú desplegable para el perfil del usuario
     const menu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                <NavLink to="/perfil">Perfil</NavLink>
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
                <NavLink to="/configuracion">Configuración</NavLink>
            </Menu.Item>
            {hasRole('user') && (
                <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </Menu.Item>
            )}
            {hasRole('admin') && (
                <Menu.Item key="admin-dashboard" icon={<DashboardOutlined />}>
                    <NavLink to="/admin/dashboard">Panel de Administración</NavLink>
                </Menu.Item>
            )}
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout} danger>
                Cerrar sesión
            </Menu.Item>
        </Menu>
    );

    return (
        <header className="header">
            {/* Logo */}
            <div className="logo">
                <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                    alt="Logo"
                />
                <NavLink to="/">AquaControl</NavLink>
            </div>

            {/* Navegación principal */}
            <nav className="main-nav">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
                <NavLink to="/productos" className={({ isActive }) => (isActive ? 'active-link' : '')}>Productos</NavLink>
                <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>Sobre Nosotros</NavLink>
                <NavLink to="/contacto" className={({ isActive }) => (isActive ? 'active-link' : '')}>Contacto</NavLink>
                <NavLink to="/servicios" className={({ isActive }) => (isActive ? 'active-link' : '')}>Servicios</NavLink>
                <NavLink to="/soporte" className={({ isActive }) => (isActive ? 'active-link' : '')}>Soporte</NavLink>
            </nav>
            {/* Acciones de usuario */}
            <div className="user-actions">
                 {/* Icono de carrito de compras */}
                 <NavLink to="/carrito" className="cart-icon">
                    <Badge count={0} showZero>
                        <ShoppingCartOutlined style={{ fontSize: '30px', color: 'black' }} />
                    </Badge>
                </NavLink>
                

                {user ? (
                    <>
                        {/* Menú desplegable del perfil */}
                        <Dropdown overlay={menu} trigger={['click']}>
                            <div className="profile-dropdown">
                                <Avatar
                                    src={user.avatar}
                                    icon={<UserOutlined />}
                                    className="user-avatar"
                                />
                                <span className="user-name">{user.name}</span>
                                {hasRole('admin') && <span className="role-badge">Admin</span>}
                            </div>
                        </Dropdown>
                    </>
                ) : (
                    <NavLink
                        to="/login"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        Iniciar Sesión
                    </NavLink>
                )}
            </div>
        </header>
    )
}

export default Header