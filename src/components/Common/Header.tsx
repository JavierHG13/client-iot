import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Dropdown, Menu, Avatar, Badge, Drawer, Button } from 'antd'

import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    DashboardOutlined,
    ShoppingCartOutlined,
    MenuOutlined,

} from '@ant-design/icons'
import './Header.css'

const Header: React.FC = () => {

    const [visible, setVisible] = useState<boolean>(false) // Estado para controlar el menú hamburguesa
    const { user, logout, hasRole } = useAuth()


    // Menú desplegable para el perfil del usuario
    const profileMenu: React.ReactNode = user ? (
        <Menu>
            <Menu.Item>
                <span className="user-name">{user.nombre} {user.apellidos}</span>
            </Menu.Item>

            <Menu.Item key="profile" icon={<UserOutlined />}>
                <NavLink to="/perfil">Perfil</NavLink>
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
                <NavLink to="/configuracion">Configuración</NavLink>
            </Menu.Item>
            {hasRole('cliente') && (
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
    ) : null;

    // Menú para el Drawer (menú hamburguesa)
    const navMenu = (
        <Menu mode="vertical">
            <Menu.Item key="home">
                <NavLink to="/" onClick={() => setVisible(false)}>
                    Home
                </NavLink>
            </Menu.Item>
            <Menu.Item key="productos">
                <NavLink to="/productos" onClick={() => setVisible(false)}>
                    Productos
                </NavLink>
            </Menu.Item>
            <Menu.Item key="about">
                <NavLink to="/about" onClick={() => setVisible(false)}>
                    Sobre Nosotros
                </NavLink>
            </Menu.Item>
            <Menu.Item key="contacto">
                <NavLink to="/contacto" onClick={() => setVisible(false)}>
                    Contacto
                </NavLink>
            </Menu.Item>
            <Menu.Item key="servicios">
                <NavLink to="/servicios" onClick={() => setVisible(false)}>
                    Servicios
                </NavLink>
            </Menu.Item>
            <Menu.Item key="soporte">
                <NavLink to="/soporte" onClick={() => setVisible(false)}>
                    Soporte
                </NavLink>
            </Menu.Item>
        </Menu>
    )

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

            {/* Navegación principal (visible en pantallas grandes) */}
            <nav className="main-nav">
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/productos"
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                    Productos
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                    Sobre Nosotros
                </NavLink>
                <NavLink
                    to="/contacto"
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                    Contacto
                </NavLink>
                <NavLink
                    to="/servicios"
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                    Servicios
                </NavLink>
                <NavLink
                    to="/soporte"
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                    Soporte
                </NavLink>
            </nav>

            {/* Acciones de usuario */}
            <div className="user-actions">
                {/* Icono de carrito de compras */}
                <NavLink to="/carrito" className="cart-icon">
                    <Badge count={0} showZero>
                        <ShoppingCartOutlined style={{ fontSize: '24px', color: 'black' }} />
                    </Badge>
                </NavLink>

                {user ? (
                    <>
                        <Dropdown overlay={profileMenu ?? <div>No menu available</div>} trigger={['click']}>
                            
                            <div className="profile-dropdown">
                                <Avatar
                                    src={user.avatar}
                                    icon={<UserOutlined />}
                                    className="user-avatar"
                                />
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


                {/* Menú hamburguesa (visible en pantallas pequeñas) */}
                <Button
                    type="text"
                    icon={<MenuOutlined style={{ fontSize: '24px' }} />}
                    onClick={() => setVisible(true)}
                    className="menu-toggle"
                />
            </div>

            {/* Drawer (menú lateral para pantallas pequeñas) */}
            <Drawer
                title="Menú"
                placement="right"
                onClose={() => setVisible(false)}
                visible={visible}
                width={250}
            >
                {navMenu}
            </Drawer>
        </header>
    )
}

export default Header