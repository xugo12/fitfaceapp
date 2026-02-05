import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Search, Play, CheckCircle, Circle } from 'lucide-react';

const Classes = () => {
    const { data } = useStore();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [expandedModule, setExpandedModule] = useState(null);

    const categories = [
        'Antiedad', 'Desinflamar', 'Nocturno', 'Matutino', 'Lifting', 'Relax'
    ];

    const toggleModule = (id) => {
        setExpandedModule(expandedModule === id ? null : id);
    };

    const handleFilter = (cat) => {
        // "Todos" logic: if clicking active category, or "Check All", reset to null
        if (categoryFilter === cat) setCategoryFilter(null);
        else setCategoryFilter(cat);
    };

    const filteredModules = data.modules.filter(mod => {
        const matchesSearch = mod.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter ? mod.category === categoryFilter : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="page-container fade-in" style={{ padding: '24px', paddingBottom: '80px' }}>
            <header className="page-header" style={{ marginBottom: '16px' }}>
                <h2>Clases</h2>
            </header>

            <div className="search-bar-container" style={{ position: 'relative', marginBottom: '16px' }}>
                <Search className="search-icon" size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input
                    type="text"
                    placeholder="Buscar clases..."
                    className="input-field"
                    style={{ paddingLeft: '40px', marginTop: 0 }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="filters-container" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
                <div
                    className={`filter-chip ${categoryFilter === null ? 'active' : ''}`}
                    onClick={() => setCategoryFilter(null)}
                    style={{
                        padding: '6px 16px', borderRadius: '20px', background: categoryFilter === null ? 'var(--primary-color)' : 'white',
                        color: categoryFilter === null ? 'white' : '#666', border: '1px solid #eee', whiteSpace: 'nowrap', fontSize: '13px', cursor: 'pointer'
                    }}
                >
                    Todos
                </div>
                {categories.map(cat => (
                    <div
                        key={cat}
                        className={`filter-chip ${categoryFilter === cat ? 'active' : ''}`}
                        onClick={() => handleFilter(cat)}
                        style={{
                            padding: '6px 16px', borderRadius: '20px', background: categoryFilter === cat ? 'var(--primary-color)' : 'white',
                            color: categoryFilter === cat ? 'white' : '#666', border: '1px solid #eee', whiteSpace: 'nowrap', fontSize: '13px', cursor: 'pointer'
                        }}
                    >
                        {cat}
                    </div>
                ))}
            </div>

            <div className="modules-list" style={{ marginTop: '24px' }}>
                {filteredModules.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#999', marginTop: '32px' }}>No se encontraron clases</div>
                ) : filteredModules.map(mod => (
                    <div key={mod.id}>
                        {/* Horizontal Card */}
                        <div className="horizontal-card" onClick={() => toggleModule(mod.id)}
                            style={{ display: 'flex', background: 'white', borderRadius: '16px', marginBottom: '24px', overflow: 'hidden', cursor: 'pointer', alignItems: 'center', gap: '16px', paddingRight: '16px' }}>

                            <div className="card-image-wrapper" style={{ position: 'relative', width: '120px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                                <div style={{ width: '100%', height: '100%', backgroundImage: `url('${mod.coverUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                <div className="play-overlay" style={{
                                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    width: '32px', height: '32px', background: 'white', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                    <Play size={10} fill="currentColor" />
                                </div>
                            </div>

                            <div className="card-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div className="card-category" style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--primary-color)', fontWeight: 700, marginBottom: '4px', letterSpacing: '0.5px' }}>
                                    {mod.category || 'General'}
                                </div>
                                <h4 className="card-title" style={{ fontSize: '15px', fontWeight: 700, color: '#333', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                                    {mod.title}
                                </h4>
                                <div className="card-meta" style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#999', alignItems: 'center' }}>
                                    <span className="meta-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Circle size={10} /> {mod.duration || '0 min'}
                                    </span>
                                    <span className="meta-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Play size={10} /> {mod.lessons.length} clases
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Lessons Expansion */}
                        {expandedModule === mod.id && (
                            <div className="lessons-container fade-in" style={{ marginBottom: '24px', borderRadius: '12px', border: '1px solid #f0f0f0', marginTop: '-10px', overflow: 'hidden' }}>
                                {mod.lessons.map(lessonId => {
                                    const lesson = data.lessons.find(l => l.id === lessonId);
                                    if (!lesson) return null;
                                    return (
                                        <div key={lesson.id} className="lesson-item"
                                            onClick={(e) => { e.stopPropagation(); navigate(`/player/${lesson.id}`); }}
                                            style={{ display: 'flex', alignItems: 'center', padding: '12px', borderBottom: '1px solid #f9f9f9', cursor: 'pointer', background: 'white' }}>

                                            <div className="status-icon" style={{ marginRight: '12px', color: lesson.completed ? 'var(--primary-color)' : '#eee' }}>
                                                {lesson.completed ? <CheckCircle size={16} /> : <Circle size={16} />}
                                            </div>

                                            <div className="lesson-details" style={{ flex: 1 }}>
                                                <div className="lesson-title" style={{ fontSize: '13px', fontWeight: 600, color: '#444' }}>{lesson.title}</div>
                                                <div className="lesson-duration" style={{ fontSize: '11px', color: '#999' }}>{lesson.duration}</div>
                                            </div>

                                            <div className="play-btn" style={{ fontSize: '12px', color: 'var(--primary-color)' }}>
                                                <Play size={14} fill="currentColor" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;
