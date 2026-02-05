import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useStore();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(true);

    if (!user) return null;

    const handleLogout = () => {
        if (confirm('¿Cerrar sesión?')) {
            logout();
            navigate('/login');
        }
    };

    return (
        <div className="page-container fade-in" style={{ padding: '24px', paddingBottom: '90px' }}>
            <header className="profile-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
                <div
                    className="profile-avatar-large"
                    style={{
                        width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#eee',
                        backgroundImage: `url('${user.photoUrl || 'assets/user-placeholder.png'}')`, backgroundSize: 'cover', marginBottom: '16px',
                        border: '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                ></div>
                <h2 style={{ marginBottom: '8px' }}>{user.name}</h2>

                {user.role === 'admin' && (
                    <span
                        className="tag"
                        onClick={() => navigate('/admin')}
                        style={{
                            marginTop: '8px', background: 'var(--text-primary)', color: 'white',
                            cursor: 'pointer', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'
                        }}
                    >
                        Panel Admin
                    </span>
                )}
            </header>

            <div className="settings-list">
                <div className="setting-item card" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', alignItems: 'center' }}>
                    <span>Notificaciones</span>
                    <div
                        className="toggle"
                        onClick={() => setNotifications(!notifications)}
                        style={{
                            width: '40px', height: '20px',
                            background: notifications ? 'var(--primary-color)' : '#ccc',
                            borderRadius: '20px', position: 'relative', transition: 'all 0.3s', cursor: 'pointer'
                        }}
                    >
                        <div style={{
                            width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute',
                            top: '2px', left: notifications ? '22px' : '2px', transition: 'all 0.3s'
                        }}></div>
                    </div>
                </div>
            </div>

            <button
                className="btn btn-ghost"
                onClick={handleLogout}
                style={{ color: 'red', marginTop: '20px', width: '100%', padding: '12px', fontWeight: 'bold' }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
};

export default Profile;
