import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import { Home as HomeIcon, BookOpen, MessageCircle, User } from 'lucide-react';

import Login from './pages/Login';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Player from './pages/Player';
import Admin from './pages/Admin';
import Community from './pages/Community';
import Profile from './pages/Profile';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const NavItem = ({ icon: Icon, label, path }) => {
        const isActive = location.pathname === path;
        return (
            <div
                onClick={() => navigate(path)}
                style={{
                    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    color: isActive ? 'var(--primary-color)' : '#bbb',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: isActive ? 'translateY(-2px)' : 'none'
                }}
            >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span style={{
                    fontSize: '10px',
                    marginTop: '4px',
                    fontWeight: isActive ? 600 : 500,
                    opacity: isActive ? 1 : 0.8
                }}>{label}</span>
                {isActive && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary-color)', marginTop: '2px' }}></div>}
            </div>
        );
    };

    return (
        <div id="app">
            {children}
            <div className="glass-nav" style={{
                position: 'fixed', bottom: 0, width: '100%', maxWidth: '480px', height: '70px',
                display: 'flex', paddingBottom: '10px', zIndex: 1000
            }}>
                <NavItem icon={HomeIcon} label="Inicio" path="/" />
                <NavItem icon={BookOpen} label="Clases" path="/classes" />
                <NavItem icon={MessageCircle} label="Comunidad" path="/community" />
                <NavItem icon={User} label="Perfil" path="/profile" />
            </div>
        </div>
    )
}

const PrivateRoute = ({ children }) => {
    const { user } = useStore();
    return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
}

function App() {
    return (
        <StoreProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    } />
                    <Route path="/classes" element={
                        <PrivateRoute>
                            <Classes />
                        </PrivateRoute>
                    } />
                    <Route path="/community" element={
                        <PrivateRoute>
                            <Community />
                        </PrivateRoute>
                    } />
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    } />
                    <Route path="/player/:id" element={
                        <PrivateRoute>
                            <Player />
                        </PrivateRoute>
                    } />
                    <Route path="/admin" element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    } />
                </Routes>
            </Router>
        </StoreProvider>
    )
}

export default App;
