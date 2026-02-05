import React from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Play, Check } from 'lucide-react';

const Home = () => {
    const { user, data } = useStore();
    const navigate = useNavigate();

    if (!user) return null;

    const firstName = user.name.split(' ')[0];
    const recommendedModules = data.modules.slice(0, 2);

    // --- Calendar Logic ---
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const startOfWeek = new Date(today);
    // Adjust to make Monday the first day (optional, but common)
    const dayDiff = currentDay === 0 ? 6 : currentDay - 1;
    startOfWeek.setDate(today.getDate() - dayDiff);

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        return d;
    });

    const completedSet = new Set(user.completedDays || []);

    // Simple dynamic streak calc (consecutive days looking back from today)
    // Only logic for demo purpose; ideally calculated on backend or robust util
    let currentStreak = 0;
    const checkDate = new Date(today);
    while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (completedSet.has(dateStr)) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            // Allow "today" to be incomplete but still count streak from yesterday
            if (checkDate.toDateString() === today.toDateString()) {
                checkDate.setDate(checkDate.getDate() - 1);
                continue;
            }
            break;
        }
    }

    const dayNames = ['W', 'M', 'T', 'W', 'T', 'F', 'S']; // Initial letters

    return (
        <div className="fade-in" style={{ padding: '24px', paddingBottom: '90px' }}>
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <span style={{ fontSize: '14px', color: '#666' }}>Hola, {firstName} ✨</span>
                    <h1 style={{ margin: 0 }}>Hora de tu ritual</h1>
                </div>
                <div
                    onClick={() => navigate('/profile')}
                    style={{
                        width: '48px', height: '48px', borderRadius: '50%',
                        backgroundColor: '#eee', backgroundImage: `url('${user.photoUrl || 'assets/user-placeholder.png'}')`,
                        backgroundSize: 'cover', border: '2px solid white', cursor: 'pointer'
                    }}
                ></div>
            </header>

            {/* Enhanced Progress Card */}
            <div style={{
                background: 'white', borderRadius: '24px', padding: '24px',
                marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <span style={{ fontSize: '14px', color: '#999', display: 'block', marginBottom: '4px' }}>Racha Actual</span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary-color)' }}>{currentStreak}</span>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#444' }}>días</span>
                        </div>
                    </div>
                    {/* Fire Icon or similar badge */}
                    <div style={{ fontSize: '24px' }}>🔥</div>
                </div>

                {/* Week Calendar */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {weekDays.map((date, index) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const isCompleted = completedSet.has(dateStr);
                        const isToday = date.toDateString() === today.toDateString();
                        const dayName = date.toLocaleDateString('es-ES', { weekday: 'narrow' }).toUpperCase();

                        return (
                            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '11px', color: isToday ? 'var(--primary-color)' : '#bbb', fontWeight: isToday ? 'bold' : 'normal' }}>
                                    {dayName}
                                </span>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: isCompleted ? 'var(--primary-color)' : (isToday ? 'var(--primary-light)' : '#f0f0f0'),
                                    color: isCompleted ? 'white' : 'transparent',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: isToday && !isCompleted ? '1px solid var(--primary-color)' : 'none'
                                }}>
                                    {isCompleted && <Check size={16} strokeWidth={3} />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Continue Watching */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3>Continuar</h3>
            </div>
            <div
                className="card"
                onClick={() => navigate('/player/l1')}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', marginBottom: '24px', cursor: 'pointer' }}
            >
                <div style={{
                    width: '40px', height: '40px', background: 'var(--primary-light)', color: 'var(--primary-color)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Play size={20} fill="currentColor" />
                </div>
                <div>
                    <h4 style={{ margin: 0, fontSize: '16px' }}>Masaje de Mejillas</h4>
                    <p style={{ margin: 0, fontSize: '12px' }}>Módulo 1 • 5 min restantes</p>
                </div>
            </div>

            {/* Recommendations */}
            <div style={{ marginBottom: '16px' }}><h3>Recomendados</h3></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {recommendedModules.map(mod => (
                    <div
                        key={mod.id}
                        className="card"
                        onClick={() => navigate('/classes')}
                        style={{ padding: 0, overflow: 'hidden', marginBottom: 0, cursor: 'pointer' }}
                    >
                        <div style={{ height: '120px', backgroundImage: `url('${mod.coverUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        <div style={{ padding: '12px' }}>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>{mod.title}</h4>
                            <p style={{ margin: 0, fontSize: '11px' }}>{mod.lessons.length} clases</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
