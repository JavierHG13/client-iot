import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header: React.FC = () => {
    const { user, logout, hasRole } = useAuth();

    return (
        <header className="header">
            <div className="logo">
                <NavLink to="/">AquaControl</NavLink>
            </div>

            <nav className="main-nav">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
                <NavLink to="/productos" className={({ isActive }) => (isActive ? 'active-link' : '')}>Productos</NavLink>
                {/*user && (
                    <>
                        {hasRole('user') && (
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : '')}>Dashboard</NavLink>
                        )}
                        {hasRole('admin') && (
                            <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? 'active-link' : '')}>Panel de Administración</NavLink>
                        )}
                    </>
                )*/}
            </nav>


            {/* Acciones de usuario */}
            <div className="user-actions">
                {user ? (
                    <>
                        {/* Botón de cerrar sesión */}
                        <button onClick={logout} className="logout-button">
                            Cerrar sesión
                        </button>

                        {/* Avatar y nombre del usuario */}
                        <NavLink
                            to={hasRole('admin') ? '/admin/dashboard' : '/dashboard'}
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            {user.avatar && (
                                <img
                                    src={user.avatar}
                                    alt={`Avatar de ${user.name}`}
                                    className="user-avatar"
                                />
                            )}
                            <span>{user.name}</span>
                            {hasRole('admin') && <span className="role-badge">Admin</span>}
                        </NavLink>
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
    );
};

export default Header;
