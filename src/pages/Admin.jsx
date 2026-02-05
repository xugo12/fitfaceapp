
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit2, Plus, ArrowLeft, Mail, UserPlus } from 'lucide-react';

const Admin = () => {
    const { data, setData, refreshData, seedDatabase, inviteUser, user } = useStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users');

    const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState(null);
    const [currentModuleId, setCurrentModuleId] = useState(null);

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    // Security Check
    if (!user || user.role !== 'admin') {
        return <div style={{ padding: '24px' }}>Acceso denegado. Requiere rol de Admin.</div>;
    }

    const handleInviteSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const name = e.target.name.value;

        try {
            const success = await inviteUser(name, email);
            if (success) {
                alert('Usuario invitado con éxito!');
                setIsInviteModalOpen(false);
                refreshData(); // Refresh data to show new user if added immediately
            } else {
                alert('Error al invitar usuario. El email ya podría estar registrado o hubo un problema.');
            }
        } catch (error) {
            alert(`Error al invitar usuario: ${error.message} `);
        }
    }

    const saveData = (newData) => {
        setData(newData); // Context handles localStorage sync
    };

    const toggleUserStatus = (id) => {
        const updatedUsers = data.users.map(u => {
            if (u.id === id) return { ...u, subscriptionStatus: u.subscriptionStatus === 'active' ? 'inactive' : 'active' };
            return u;
        });
        saveData({ ...data, users: updatedUsers });
    };

    const deleteModule = (id) => {
        if (confirm('¿Eliminar módulo?')) {
            const updatedModules = data.modules.filter(m => m.id !== id);
            saveData({ ...data, modules: updatedModules });
        }
    };

    const handleSaveModule = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const coverUrl = e.target.cover.value;
        const fileInput = e.target.file; // Mock file handling

        let finalCover = coverUrl;
        if (fileInput && fileInput.files.length > 0) {
            finalCover = "assets/" + fileInput.files[0].name;
        }

        if (editingModule) {
            const updatedModules = data.modules.map(m => {
                if (m.id === editingModule.id) return { ...m, title, coverUrl: finalCover };
                return m;
            });
            saveData({ ...data, modules: updatedModules });
        } else {
            const newMod = {
                id: 'mod' + Date.now(),
                title,
                description: '',
                level: 'General',
                coverUrl: finalCover,
                order: 99,
                lessons: [],
                category: 'General'
            };
            saveData({ ...data, modules: [...data.modules, newMod] });
        }
        setIsModuleModalOpen(false);
        setEditingModule(null);
    };

    const deleteLesson = (modId, lessonId) => {
        if (confirm('¿Eliminar clase?')) {
            const updatedModules = data.modules.map(m => {
                if (m.id === modId) return { ...m, lessons: m.lessons.filter(lid => lid !== lessonId) };
                return m;
            });
            const updatedLessons = data.lessons.filter(l => l.id !== lessonId);
            saveData({ ...data, modules: updatedModules, lessons: updatedLessons });
        }
    };

    const handleSaveLesson = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const videoUrl = e.target.video.value;
        const duration = e.target.duration.value;

        if (editingLesson) {
            const updatedLessons = data.lessons.map(l => {
                if (l.id === editingLesson.id) return { ...l, title, videoUrl, duration };
                return l;
            });
            saveData({ ...data, lessons: updatedLessons });
        } else {
            const newLesson = {
                id: 'l' + Date.now(),
                moduleId: currentModuleId,
                title,
                duration,
                videoUrl,
                completed: false
            };
            const updatedLessons = [...data.lessons, newLesson];
            const updatedModules = data.modules.map(m => {
                if (m.id === currentModuleId) return { ...m, lessons: [...m.lessons, newLesson.id] };
                return m;
            });
            saveData({ ...data, modules: updatedModules, lessons: updatedLessons });
        }
        setIsLessonModalOpen(false);
        setEditingLesson(null);
    };

    return (
        <div className="fade-in" style={{ padding: '24px', paddingBottom: '90px' }}>
            <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <button onClick={() => navigate('/profile')}><ArrowLeft /></button>
                <h2>Panel Admin</h2>
                <button onClick={seedDatabase} style={{ fontSize: '11px', background: '#333', color: 'white', padding: '6px 12px', borderRadius: '6px', border: 'none' }}>
                    Restaurar Dados
                </button>
            </header>

            <div className="card" style={{ padding: 0, overflow: 'hidden', minHeight: '400px' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
                    <button
                        onClick={() => setActiveTab('users')}
                        style={{ flex: 1, padding: '16px', fontWeight: 'bold', color: activeTab === 'users' ? 'var(--primary-color)' : '#999', borderBottom: activeTab === 'users' ? '2px solid var(--primary-color)' : 'none' }}
                    >
                        Alumnos
                    </button>
                    <button
                        onClick={() => setActiveTab('modules')}
                        style={{ flex: 1, padding: '16px', fontWeight: 'bold', color: activeTab === 'modules' ? 'var(--primary-color)' : '#999', borderBottom: activeTab === 'modules' ? '2px solid var(--primary-color)' : 'none' }}
                    >
                        Módulos
                    </button>
                </div>

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div style={{ padding: '16px' }}>
                        <button className="btn-primary" style={{ fontSize: '14px', padding: '8px 16px', marginBottom: '16px', width: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setIsInviteModalOpen(true)}>
                            <UserPlus size={16} /> Agregar Alumna
                        </button>

                        <div className="users-list">
                            {data.users.filter(u => u.role !== 'admin').map(u => (
                                <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9f9f9' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '32px', height: '32px', background: '#eee', borderRadius: '50%' }}></div>
                                        <div><div style={{ fontWeight: 600, fontSize: '14px' }}>{u.name}</div><div style={{ fontSize: '11px', color: '#999' }}>{u.email}</div></div>
                                    </div>
                                    <button
                                        onClick={() => toggleUserStatus(u.id)}
                                        style={{ fontSize: '12px', color: u.subscriptionStatus === 'active' ? 'green' : 'red', fontWeight: 'bold' }}
                                    >
                                        {u.subscriptionStatus === 'active' ? 'Activo' : 'Inactivo'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Modules Tab */}
                {activeTab === 'modules' && (
                    <div style={{ padding: '16px' }}>
                        <button className="btn-primary" style={{ fontSize: '14px', padding: '8px 16px', marginBottom: '16px', width: 'auto' }} onClick={() => { setEditingModule(null); setIsModuleModalOpen(true); }}>
                            + Nuevo Módulo
                        </button>

                        <div className="modules-list-admin">
                            {data.modules.map(mod => (
                                <div key={mod.id} className="card" style={{ marginBottom: '16px', border: '1px solid #eee', boxShadow: 'none' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <strong>{mod.title}</strong>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button onClick={() => { setEditingModule(mod); setIsModuleModalOpen(true); }}><Edit2 size={16} /></button>
                                            <button onClick={() => deleteModule(mod.id)} style={{ color: 'red' }}><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    <div style={{ background: '#f9f9f9', padding: '8px', borderRadius: '8px' }}>
                                        <small style={{ color: '#666', display: 'block', marginBottom: '8px' }}>Clases:</small>
                                        {mod.lessons.map(lid => {
                                            const l = data.lessons.find(x => x.id === lid);
                                            return l ? (
                                                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0', borderBottom: '1px solid #eee' }}>
                                                    <span>📄 {l.title}</span>
                                                    <div style={{ display: 'flex', gap: '4px' }}>
                                                        <button onClick={() => { setEditingLesson(l); setIsLessonModalOpen(true); }}><Edit2 size={12} /></button>
                                                        <button onClick={() => deleteLesson(mod.id, l.id)} style={{ color: 'red' }}><Trash2 size={12} /></button>
                                                    </div>
                                                </div>
                                            ) : null;
                                        })}
                                        <button
                                            onClick={() => { setCurrentModuleId(mod.id); setEditingLesson(null); setIsLessonModalOpen(true); }}
                                            style={{ marginTop: '8px', fontSize: '12px', color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                                        >
                                            <Plus size={12} /> Agregar Clase
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Invite Modal */}
            {isInviteModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', width: '90%', maxWidth: '400px' }}>
                        <h3>Mandar Convite</h3>
                        <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>El alumno recibirá un email mágico para entrar sin contraseña.</p>
                        <form onSubmit={handleInviteSubmit}>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>Nombre</label>
                            <input name="name" className="input-field" placeholder="Maria Silva" required />

                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>Email</label>
                            <input name="email" type="email" className="input-field" placeholder="maria@email.com" required />

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                                <button type="button" onClick={() => setIsInviteModalOpen(false)} style={{ color: 'red' }}>Cancelar</button>
                                <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Mail size={14} /> Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Module Modal */}
            {isModuleModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', width: '90%', maxWidth: '400px' }}>
                        <h3>{editingModule ? 'Editar Módulo' : 'Nuevo Módulo'}</h3>
                        <form onSubmit={handleSaveModule}>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>Título</label>
                            <input name="title" defaultValue={editingModule?.title} className="input-field" required />

                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>Foto URL</label>
                            <input name="cover" defaultValue={editingModule?.coverUrl} className="input-field" placeholder="https://..." />

                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>O subir archivo</label>
                            <input name="file" type="file" className="input-field" />

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                                <button type="button" onClick={() => setIsModuleModalOpen(false)} style={{ color: 'red' }}>Cancelar</button>
                                <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '8px 16px' }}>Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Lesson Modal */}
            {isLessonModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', width: '90%', maxWidth: '400px' }}>
                        <h3>{editingLesson ? 'Editar Clase' : 'Nueva Clase'}</h3>
                        <form onSubmit={handleSaveLesson}>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>Título</label>
                            <input name="title" defaultValue={editingLesson?.title} className="input-field" required />

                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>Video URL</label>
                            <input name="video" defaultValue={editingLesson?.videoUrl} className="input-field" required />

                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>Duración (ex: 10:00)</label>
                            <input name="duration" defaultValue={editingLesson?.duration} className="input-field" />

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                                <button type="button" onClick={() => setIsLessonModalOpen(false)} style={{ color: 'red' }}>Cancelar</button>
                                <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '8px 16px' }}>Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
