import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';

const Player = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, setData } = useStore();
    const lesson = data.lessons.find(l => l.id === id);
    const [isCompleted, setIsCompleted] = useState(lesson ? lesson.completed : false);

    if (!lesson) return <div style={{ padding: '24px' }}>Clase no encontrada</div>;

    const toggleCompletion = () => {
        const newState = !isCompleted;
        setIsCompleted(newState);

        // Update in store/localStorage logic
        // For now, updating local state reference in data for consistency during session
        lesson.completed = newState;
        // Force update to persistence
        setData({ ...data });
    };

    return (
        <div className="fade-in" style={{ background: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Floating Back Button */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    position: 'absolute', top: '16px', left: '16px', zIndex: 10,
                    background: 'rgba(0,0,0,0.5)', color: 'white', width: '40px', height: '40px',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
            >
                <ArrowLeft size={24} />
            </button>

            {/* Video Area */}
            <div style={{ width: '100%', background: 'black', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <video controls style={{ width: '100%', height: '100%' }}>
                    <source src={lesson.videoUrl} type="video/mp4" />
                    Tu navegador no soporta videos.
                </video>
            </div>

            {/* Content Area */}
            <div style={{ padding: '24px' }}>
                <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>{lesson.title}</h1>
                <div style={{ display: 'flex', gap: '12px', color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                    <span>{lesson.duration}</span>
                    <span>•</span>
                    <span>Módulo {lesson.moduleId.replace('mod', '')}</span>
                </div>

                <p style={{ lineHeight: 1.6, color: '#444' }}>
                    {lesson.description || "En esta clase, aprenderemos los movimientos esenciales para tonificar y relajar la musculatura facial."}
                </p>

                {/* Attachments (if any) */}
                {lesson.attachment && (
                    <div style={{ marginTop: '24px', padding: '12px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd', color: '#0369a1', fontSize: '14px' }}>
                        🖇️ Material de apoyo: {lesson.attachment}
                    </div>
                )}

                {/* Action Area */}
                <div
                    onClick={toggleCompletion}
                    style={{
                        marginTop: '32px', padding: '16px', background: isCompleted ? '#ecfccb' : '#f9f9f9',
                        borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
                        border: isCompleted ? '1px solid #84cc16' : '1px solid #eee', transition: 'all 0.2s'
                    }}
                >
                    <div style={{ color: isCompleted ? '#65a30d' : '#ccc' }}>
                        {isCompleted ? <CheckCircle size={24} fill="#65a30d" color="white" /> : <Circle size={24} />}
                    </div>
                    <span style={{ fontWeight: 600, color: isCompleted ? '#3f6212' : '#666' }}>
                        {isCompleted ? '¡Clase completada!' : 'Marcar como concluida'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Player;
