import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useStore();
    const navigate = useNavigate();
    const [email, setEmail] = useState('aluno@fitface.com');
    const [password, setPassword] = useState('123');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.message || 'Error al iniciar sesión');
            }
        } catch (err) {
            console.error(err);
            setError('Erro Técnico: ' + (err.message || JSON.stringify(err)));
        }
    };

    return (
        <div className="onboarding-container fade-in">
            <div className="onboarding-slide">
                <img src="/logo 1.png" className="logo-image" alt="Fit Face Logo" />
                <h1 style={{ fontSize: '24px', marginBottom: '32px' }}>Área de Alumnos</h1>

                <form onSubmit={handleSubmit} className="auth-form" style={{ width: '100%' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Email</label>
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Contraseña</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div style={{ color: 'red', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

                    <div style={{ textAlign: 'right', marginTop: '12px', marginBottom: '24px' }}>
                        <a href="#" style={{ fontSize: '14px', color: 'var(--primary-color)' }}>¿Olvidaste tu contraseña?</a>
                    </div>

                    <button type="submit" className="btn-primary">Ingresar</button>

                    <br />
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <button type="button" onClick={() => window.location.href = '/admin'} style={{ fontSize: '12px', color: '#ccc', cursor: 'pointer' }}>Admin Access</button>
                    </div>
                </form>
            </div>
            <style>{`
                .onboarding-container { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 32px; background: transparent; }
                .onboarding-slide { display: flex; flex-direction: column; align-items: center; width: 100%; position: relative; z-index: 2; }
                .auth-form { background: rgba(255,255,255,0.9); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); padding: 40px 24px; border-radius: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.05); text-align: left; border: 1px solid rgba(255,255,255,0.5); }
                .logo-image { width: 160px; margin-bottom: 20px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.05)); }
            `}</style>
        </div>
    );
};

export default Login;
