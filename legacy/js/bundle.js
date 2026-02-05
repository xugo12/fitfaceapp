// Fit Face - Bundle JS (Spanish Version)

/* =========================================
   1. MOCK DATA
   ========================================= */
const DefaultData = {
    currentUser: null,
    users: [
        {
            id: '1',
            email: 'aluno@fitface.com',
            password: '123',
            name: 'Maria Silva',
            role: 'member',
            subscriptionStatus: 'active',
            photoUrl: 'assets/user-placeholder.png',
            streak: 3
        },
        {
            id: '2',
            email: 'admin@fitface.com',
            password: 'admin',
            name: 'Ana Fit',
            role: 'admin',
            subscriptionStatus: 'active',
            photoUrl: '',
            streak: 365
        }
    ],
    modules: [
        {
            id: 'mod1',
            title: 'Massagem Antienvelhecimento',
            description: 'Técnicas para suavizar linhas de expressão.',
            level: 'Principiante',
            category: 'Anti-idade',
            duration: '45 min',
            coverUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=500',
            order: 1,
            lessons: ['l1', 'l2']
        },
        {
            id: 'mod2',
            title: 'Rotina Matinal Desinchante',
            description: 'Comece o dia com o rosto leve e definido.',
            level: 'Intermedio',
            category: 'Desinchar',
            duration: '20 min',
            coverUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=500',
            order: 2,
            lessons: ['l3', 'l4']
        },
        {
            id: 'mod3',
            title: 'Ritual Noturno Relaxante',
            description: 'Prepare sua pele e mente para dormir.',
            level: 'Todos',
            category: 'Noturno',
            duration: '30 min',
            coverUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=500',
            order: 3,
            lessons: []
        },
        {
            id: 'mod4',
            title: 'Lifting Natural Facial',
            description: 'Eleve as maçãs do rosto e defina o maxilar.',
            level: 'Avançado',
            category: 'Lifting',
            duration: '35 min',
            coverUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=500',
            order: 4,
            lessons: []
        },
        {
            id: 'mod5',
            title: 'Alívio de Tensões Faciais',
            description: 'Solte a musculatura e evite rugas de tensão.',
            level: 'Iniciante',
            category: 'Relaxar',
            duration: '25 min',
            coverUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=500',
            order: 5,
            lessons: []
        }
    ],
    lessons: [
        { id: 'l1', moduleId: 'mod1', title: '¿Qué es el Yoga Facial?', duration: '5:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: true },
        { id: 'l2', moduleId: 'mod1', title: 'Postura y Respiración', duration: '8:30', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
        { id: 'l3', moduleId: 'mod2', title: 'Masaje de Mejillas', duration: '12:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
        { id: 'l4', moduleId: 'mod2', title: 'Drenaje del Cuello', duration: '10:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
    ],
    posts: [
        {
            id: 'p1',
            userId: '2',
            text: '¡Bienvenidas a nuestra comunidad! ¿Cuál es su objetivo hoy?',
            imageUrl: '',
            likes: 12,
            tags: ['Motivación'],
            timestamp: new Date().toISOString()
        },
        {
            id: 'p2',
            userId: '1',
            text: '¡Hice la clase de drenaje hoy y ya noté la diferencia! 😍',
            imageUrl: '',
            likes: 5,
            tags: ['Resultados'],
            timestamp: new Date(Date.now() - 86400000).toISOString()
        }
    ]
};

// Load from LS or use Default
let MockData = JSON.parse(localStorage.getItem('fitface_data'));
if (!MockData) {
    MockData = DefaultData;
    localStorage.setItem('fitface_data', JSON.stringify(MockData));
}

const saveData = () => {
    localStorage.setItem('fitface_data', JSON.stringify(MockData));
};

/* =========================================
   2. STORE
   ========================================= */
class Store {
    constructor() {
        this.state = {
            user: null,
            theme: 'light',
            currentModule: null,
            loading: false
        };
        this.listeners = [];

        const savedUser = localStorage.getItem('fitface_user');
        if (savedUser) {
            this.state.user = JSON.parse(savedUser);
        }
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    login(email, password) {
        const user = MockData.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.state.user = user;
            localStorage.setItem('fitface_user', JSON.stringify(user));
            this.notify();
            return { success: true };
        }
        return { success: false, message: 'Email o contraseña inválidos' };
    }

    logout() {
        this.state.user = null;
        localStorage.removeItem('fitface_user');
        this.notify();
    }
}
const store = new Store();

/* =========================================
   3. COMPONENTS & UTILS
   ========================================= */
const BottomNav = () => `
    <div class="nav-item" data-link="/" onclick="navigate('/')">
        <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        <span>Inicio</span>
    </div>
    <div class="nav-item" data-link="/classes" onclick="navigate('/classes')">
        <svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>
        <span>Clases</span>
    </div>
    <div class="nav-item" data-link="/community" onclick="navigate('/community')">
        <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
        <span>Comun.</span>
    </div>
    <div class="nav-item" data-link="/progress" onclick="navigate('/progress')">
        <svg viewBox="0 0 24 24"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>
        <span>Progreso</span>
    </div>
     <div class="nav-item" data-link="/profile" onclick="navigate('/profile')">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
        <span>Perfil</span>
    </div>
`;

/* =========================================
   4. VIEWS
   ========================================= */
const Views = {
    onboarding: () => `
        <div class="onboarding-container fade-in">
            <div class="onboarding-slide">
                <img src="logo 1.png" class="logo-image" alt="Fit Face Logo" />
                <h1 style="font-size: 24px; margin-bottom: 32px">Área de Alumnos</h1>
                
                <form id="login-form" class="auth-form" style="width: 100%">
                    <div class="input-group">
                        <label>Email</label>
                        <input type="email" name="email" class="input-field" value="aluno@fitface.com" required>
                    </div>
                    <div class="input-group">
                        <label>Contraseña</label>
                        <input type="password" name="password" class="input-field" value="123" required>
                    </div>
                    
                    <div style="text-align: right; margin-top: 12px; margin-bottom: 24px;">
                        <a href="#" style="font-size: 14px; color: var(--primary-color);">¿Olvidaste tu contraseña?</a>
                    </div>

                    <button type="submit" class="btn btn-primary">Ingresar</button>
                    
                    <p style="margin-top: 32px; font-size: 12px; color: #999;">
                        ¿Aún no eres alumna? <a href="#" style="font-weight: bold; color: var(--primary-color)">Compra el curso aquí</a>
                    </p>
                </form>
            </div>
        </div>
        <style>
            .logo-image { width: 150px; margin-bottom: 24px; }
            .onboarding-container { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 32px; background: var(--bg-color); }
            .onboarding-slide { display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%; }
            .auth-form { background: white; padding: 32px 24px; border-radius: 24px; box-shadow: var(--shadow-md); text-align: left; }
        </style>
    `,

    // Login is now merged into Onboarding (which acts as the Entry Screen)
    // We keep this just in case, or redirect
    login: () => ``,
    register: () => ``,

    home: () => {
        const user = store.state.user;
        if (!user) return '';
        const firstName = user.name.split(' ')[0];
        const modules = MockData.modules.slice(0, 2);
        return `
            <div class="home-container fade-in">
                <header class="home-header">
                    <div><span class="greeting">Hola, ${firstName} ✨</span><h1>Hora de tu ritual</h1></div>
                    <div class="user-avatar" onclick="navigate('/profile')" style="background-image: url('${user.photoUrl}')"></div>
                </header>
                <div class="streak-card">
                    <div class="streak-info"><span class="streak-count">${user.streak}</span><span class="streak-label">días seguidos</span></div>
                    <div class="streak-msg">Consistencia > Perfección 💛</div>
                </div>
                 <div class="card continue-card" onclick="navigate('/player?id=l1')">
                    <div class="play-icon">▶</div>
                    <div class="continue-info"><h4>Masaje de Mejillas</h4><p>Módulo 1 • 5 min restantes</p></div>
                </div>
                <div class="section-title"><h3>Recomendados</h3></div>
                <div class="modules-grid">
                    ${modules.map(mod => `
                        <div class="card module-card" onclick="navigate('/classes')">
                            <div class="module-cover" style="background-image: url('${mod.coverUrl}')"></div>
                            <div class="module-info"><h4>${mod.title}</h4><p>${mod.lessons.length} clases</p></div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <style>
                .home-container { padding: 24px; padding-bottom: 90px; }
                .home-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
                .streak-card { background: linear-gradient(135deg, #FF9966, #FF5E62); color: white; padding: 20px; border-radius: 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
                .streak-count { font-size: 32px; font-weight: 700; }
                .user-avatar { width: 48px; height: 48px; border-radius: 50%; background-color: #eee; background-size: cover; border: 2px solid white; }
                .module-cover { height: 120px; background-size: cover; border-radius: 12px 12px 0 0; }
                .continue-card { display: flex; align-items: center; gap: 16px; padding: 16px; margin-bottom: 24px; }
                .play-icon { width: 40px; height: 40px; background: var(--primary-light); color: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
            </style>
        `;
    },

    classes: () => `
        <div class="page-container fade-in">
            <header class="page-header" style="margin-bottom:16px">
                <h2>Clases</h2>
            </header>
            
            <div class="search-bar-container">
                <span class="search-icon">🔍</span>
                <input type="text" id="class-search" placeholder="Buscar clases..." oninput="filterClasses()">
            </div>

            <div class="filters-container">
                <div class="filter-chip active" onclick="filterClasses('Check All', this)">Todos</div>
                <div class="filter-chip" onclick="filterClasses('Antiedad', this)">Antiedad</div>
                <div class="filter-chip" onclick="filterClasses('Desinflamar', this)">Desinflamar</div>
                <div class="filter-chip" onclick="filterClasses('Nocturno', this)">Nocturno</div>
                <div class="filter-chip" onclick="filterClasses('Matutino', this)">Matutino</div>
                <div class="filter-chip" onclick="filterClasses('Lifting', this)">Lifting</div>
                <div class="filter-chip" onclick="filterClasses('Relax', this)">Relax</div>
            </div>

            <div id="classes-list" class="modules-list" style="margin-top:24px">
                <!-- Javascript will populate this -->
            </div>
            
            <div style="height: 60px"></div>
        </div>
        <style>
            .search-bar-container {
                position: relative;
                margin-bottom: 16px;
            }
            .search-bar-container input {
                width: 100%;
                padding: 12px 16px 12px 40px;
                border: 1px solid #eee;
                border-radius: 12px;
                font-family: inherit;
                outline: none;
            }
            .search-icon {
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
                color: #999;
                font-size: 14px;
            }
            
            .filters-container {
                display: flex;
                gap: 8px;
                overflow-x: auto;
                padding-bottom: 8px;
                scrollbar-width: none;
            }
            .filters-container::-webkit-scrollbar { display: none; }
            
            .filter-chip {
                padding: 6px 16px;
                border-radius: 20px;
                background: white;
                border: 1px solid #eee;
                font-size: 13px;
                white-space: nowrap;
                cursor: pointer;
                color: #666;
                transition: all 0.2s;
            }
            .filter-chip.active {
                background: var(--primary-color);
                color: white;
                border-color: var(--primary-color);
                font-weight: 500;
            }

            .horizontal-card {
                display: flex;
                background: white;
                border-radius: 16px;
                margin-bottom: 25px;
                overflow: hidden;
                cursor: pointer;
                align-items: center;
                gap: 16px;
            }
            
            .card-image-wrapper {
                position: relative;
                width: 120px;
                height: 80px;
                border-radius: 12px;
                overflow: hidden;
                flex-shrink: 0;
            }
            .card-bg {
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
            }
            .play-overlay {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 32px;
                height: 32px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--primary-color);
                font-size: 10px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }

            .card-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .card-category {
                font-size: 10px;
                text-transform: uppercase;
                color: var(--primary-color);
                font-weight: 700;
                margin-bottom: 4px;
                letter-spacing: 0.5px;
            }
            .card-title {
                font-size: 15px;
                font-weight: 700;
                color: #333;
                margin: 0 0 6px 0;
                line-height: 1.3;
            }
            .card-meta {
                display: flex;
                gap: 12px;
                font-size: 11px;
                color: #999;
                align-items: center;
            }
            .meta-item { display: flex; align-items: center; gap: 4px; }
        </style>
    `,

    player: (params) => {
        const lessonId = params.get('id');
        const lesson = MockData.lessons.find(l => l.id === lessonId);
        if (!lesson) return '<div class="p-4">Clase no encontrada</div>';
        return `
            <div class="player-container fade-in">
                <button class="back-floating" onclick="history.back()">←</button>
                <div class="video-wrapper">
                    <video controls class="video-element"><source src="${lesson.videoUrl}" type="video/mp4"></video>
                </div>
                <div class="lesson-content">
                    <h1>${lesson.title}</h1>
                    <p class="description">En esta clase, aprenderemos los movimientos esenciales.</p>
                    <div class="action-area"><label><input type="checkbox" id="mark-done"> Marcar como concluida</label></div>
                </div>
            </div>
            <style>
                .player-container { background: white; min-height: 100vh; }
                .back-floating { position: absolute; top: 16px; left: 16px; z-index: 10; background: rgba(0,0,0,0.5); color: white; width: 40px; height: 40px; border-radius: 50%; font-size: 20px; }
                .video-wrapper { width: 100%; bg: black; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; background: black; }
                .video-element { width: 100%; height: 100%; }
                .lesson-content { padding: 24px; }
                .action-area { padding: 16px; background: #f9f9f9; border-radius: 12px; margin-top: 24px; }
            </style>
        `;
    },

    community: () => `
        <div class="page-container fade-in">
             <header class="page-header"><h2>Comunidad</h2></header>
             <div class="card"><textarea style="width:100%; border:none; outline:none;" placeholder="Comparte algo..."></textarea></div>
             <div class="feed-list">
                ${MockData.posts.map(post => {
        const postUser = MockData.users.find(u => u.id === post.userId) || { name: 'User' };
        return `<div class="card post-card"><div class="post-header"><strong>${postUser.name}</strong></div><p>${post.text}</p><div style="font-size:12px; margin-top:8px">❤️ ${post.likes}</div></div>`;
    }).join('')}
             </div>
             <div style="height: 60px"></div>
        </div>
        <style>.page-container { padding: 24px; } .post-card { margin-bottom: 12px; }</style>
    `,

    progress: () => `
        <div class="page-container fade-in">
            <header class="page-header"><h2>Tu Progreso</h2></header>
            <div class="stats-grid">
                <div class="stat-item card"><span class="stat-val">12</span><span class="stat-label">Clases</span></div>
                <div class="stat-item card"><span class="stat-val">3</span><span class="stat-label">Racha</span></div>
                <div class="stat-item card"><span class="stat-val">4.5h</span><span class="stat-label">Horas</span></div>
            </div>
            <h3>Logros</h3>
             <div class="achievement-item card"><div class="badge">🥇</div><div class="achieve-info"><h4>Primeros Pasos</h4><p>Completaste la primera clase</p></div></div>
             <div style="height: 60px"></div>
        </div>
        <style>
            .stats-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 32px; }
            .stat-item { padding: 16px; text-align: center; }
            .stat-val { display: block; font-size: 20px; font-weight: 700; color: var(--primary-color); }
            .achievement-item { display: flex; align-items: center; gap: 16px; padding: 16px; margin-bottom: 12px; }
            .page-container { padding: 24px; }
        </style>
    `,

    profile: () => {
        const user = store.state.user || {};
        return `
        <div class="page-container fade-in">
            <header class="profile-header">
                <div class="profile-avatar-large" style="background-image: url('${user.photoUrl}')"></div>
                <h2>${user.name}</h2>
                ${user.role === 'admin' ? '<span class="tag" onclick="navigate(\'/admin\')" style="margin-top:8px; background:var(--text-primary); color:white; cursor:pointer">Panel Admin</span>' : ''}
            </header>
            <div class="settings-list">
                <div class="setting-item card"><span>Notificaciones</span><div class="toggle active"></div></div>
            </div>
            <button class="btn btn-ghost" id="logout-btn" style="color:red; margin-top:20px">Cerrar Sesión</button>
             <div style="height: 60px"></div>
        </div>
        <style>
            .profile-header { display: flex; flex-direction: column; align-items: center; margin-bottom: 32px; }
            .profile-avatar-large { width: 100px; height: 100px; border-radius: 50%; background-color: #eee; background-size: cover; margin-bottom: 16px; }
            .page-container { padding: 24px; }
            .setting-item { display: flex; justify-content: space-between; padding: 16px; }
            .toggle { width: 40px; height: 20px; background: var(--primary-color); border-radius: 20px; }
        </style>
        `;
    },

    admin: () => {
        // Simple client-side tab state (re-renders whole view on click for simplicity in this mock)
        const activeTab = window.currentAdminTab || 'users';

        const renderUsers = () => `
            <div style="padding: 16px;">
                <button class="btn btn-primary" style="font-size:14px; padding: 8px 16px; margin-bottom: 16px;" onclick="promptAddUser()">+ Nuevo Alumno</button>
                <div class="users-list">
                    ${MockData.users.filter(u => u.role !== 'admin').map(u => `
                        <div class="flex justify-between items-center" style="padding: 12px 0; border-bottom: 1px solid #f9f9f9">
                            <div class="flex items-center gap-3">
                                <div style="width:32px; height:32px; background:#eee; border-radius:50%"></div>
                                <div><div style="font-weight:600; font-size:14px">${u.name}</div><div style="font-size:11px; color:#999">${u.email}</div></div>
                            </div>
                            <button class="btn-sm" style="font-size:12px; color: ${u.subscriptionStatus === 'active' ? 'green' : 'red'}" onclick="toggleAccess('${u.id}')">
                                ${u.subscriptionStatus === 'active' ? 'Activo' : 'Inactivo'}
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>`;

        const renderModules = () => `
             <div style="padding: 16px;">
                <button class="btn btn-primary" style="font-size:14px; padding: 8px 16px; margin-bottom: 16px;" onclick="promptAddModule()">+ Nuevo Módulo</button>
                
                <div class="modules-list-admin">
                    ${MockData.modules.map(mod => `
                        <div class="card" style="margin-bottom: 16px; border: 1px solid #eee;">
                            <div class="flex justify-between items-center" style="margin-bottom:12px">
                                <strong>${mod.title}</strong>
                                <div class="flex gap-2">
                                    <button onclick="promptEditModule('${mod.id}')" style="font-size:12px">✏️</button>
                                    <button onclick="deleteModule('${mod.id}')" style="color:red; font-size:12px">🗑️</button>
                                </div>
                            </div>
                            <div style="background:#f9f9f9; padding:8px; border-radius:8px">
                                <small style="color:#666; display:block; margin-bottom:8px">Clases:</small>
                                ${mod.lessons.map(lid => {
            const l = MockData.lessons.find(x => x.id === lid);
            return l ? `<div style="font-size:13px; padding:4px 0; border-bottom:1px solid #eee">📄 ${l.title}</div>` : '';
        }).join('')}
                                <button onclick="promptAddLesson('${mod.id}')" style="margin-top:8px; font-size:12px; color:var(--primary-color); font-weight:600">+ Agregar Clase</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>`;

        return `
        <div class="page-container fade-in">
            <header class="page-header flex justify-between">
                 <button onclick="navigate('/profile')">←</button>
                 <h2>Panel Admin</h2>
                 <div style="width:20px"></div>
            </header>

            <div class="card" style="padding: 0; overflow: hidden; min-height: 400px">
                <div class="flex" style="border-bottom: 1px solid #eee;">
                    <button class="btn-ghost" onclick="switchAdminTab('users')" style="flex:1; padding:16px; font-weight:bold; color:${activeTab === 'users' ? 'var(--primary-color)' : '#999'}">Alumnos</button>
                    <button class="btn-ghost" onclick="switchAdminTab('modules')" style="flex:1; padding:16px; font-weight:bold; color:${activeTab === 'modules' ? 'var(--primary-color)' : '#999'}">Módulos</button>
                </div>
                ${activeTab === 'users' ? renderUsers() : renderModules()}
            </div>
        </div>
        `;
    }
};

// Global Admin Functions
window.switchAdminTab = (tab) => {
    window.currentAdminTab = tab;
    window.dispatchEvent(new Event('hashchange'));
};

window.promptAddModule = () => {
    const modalHtml = `
        <div id="module-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:999; display:flex; justify-content:center; align-items:center">
            <div style="background:white; padding:24px; border-radius:16px; width:90%; max-width:400px">
                <h3>Nuevo Módulo</h3>
                <label>Título</label>
                <input id="m-title" class="input-field" style="margin-bottom:12px">
                <label>Foto de Portada (URL)</label>
                <input id="m-cover" class="input-field" placeholder="https://..." style="margin-bottom:12px">
                <div class="flex justify-between">
                    <button onclick="document.getElementById('module-modal').remove()" style="color:red">Cancelar</button>
                    <button onclick="saveNewModule()" class="btn-primary" style="padding:8px 16px; border-radius:8px">Crear</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.saveNewModule = () => {
    const title = document.getElementById('m-title').value;
    const coverUrl = document.getElementById('m-cover').value;
    if (title) {
        const id = 'mod' + Date.now();
        MockData.modules.push({ id, title, description: '', level: 'General', coverUrl, order: 99, lessons: [] });
        saveData();
        window.dispatchEvent(new Event('hashchange'));
        document.getElementById('module-modal').remove();
    }
};

window.promptEditModule = (id) => {
    const mod = MockData.modules.find(m => m.id === id);
    if (!mod) return;

    // Generate Lessons List
    const lessonsListHtml = mod.lessons.map(lid => {
        const l = MockData.lessons.find(x => x.id === lid);
        if (!l) return '';
        return `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px; background:#f9f9f9; margin-bottom:4px; border-radius:4px">
                <span style="font-size:13px">${l.title}</span>
                <div class="flex gap-2">
                    <button onclick="promptEditLesson('${mod.id}', '${l.id}')" style="font-size:12px">✏️</button>
                    <button onclick="deleteLesson('${mod.id}', '${l.id}')" style="color:red; font-size:12px">🗑️</button>
                </div>
            </div>
        `;
    }).join('');

    const modalHtml = `
        <div id="module-edit-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:999; display:flex; justify-content:center; align-items:center">
            <div style="background:white; padding:24px; border-radius:16px; width:90%; max-width:400px; max-height:90vh; overflow-y:auto">
                <h3 style="margin-bottom:16px">Editar Módulo</h3>
                <label>Título</label>
                <input id="me-title" class="input-field" value="${mod.title}" style="margin-bottom:12px">
                
                <label>Foto de Portada</label>
                <div style="margin-bottom:12px">
                    <input id="me-cover" class="input-field" value="${mod.coverUrl || ''}" placeholder="URL..." style="margin-bottom:4px">
                    <input type="file" id="me-file" class="input-field" accept="image/*">
                </div>

                <div style="margin-bottom:16px; border-top:1px solid #eee; padding-top:12px">
                    <label>Gestionar Clases</label>
                    <div style="margin-top:8px">${lessonsListHtml || '<small style="color:#999">Sin clases</small>'}</div>
                </div>

                <div class="flex justify-between">
                    <button onclick="document.getElementById('module-edit-modal').remove()" style="color:red">Cerrar</button>
                    <button onclick="saveEditModule('${id}')" class="btn-primary" style="padding:8px 16px; border-radius:8px">Guardar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.saveEditModule = (id) => {
    const mod = MockData.modules.find(m => m.id === id);
    if (mod) {
        mod.title = document.getElementById('me-title').value;
        const urlInput = document.getElementById('me-cover').value;
        const fileInput = document.getElementById('me-file');

        mod.coverUrl = urlInput;
        if (fileInput.files.length > 0) {
            mod.coverUrl = "assets/" + fileInput.files[0].name;
        }

        saveData();
        window.dispatchEvent(new Event('hashchange'));
        document.getElementById('module-edit-modal').remove();
    }
};

window.deleteModule = (id) => {
    if (confirm('¿Eliminar módulo?')) {
        MockData.modules = MockData.modules.filter(m => m.id !== id);
        saveData();
        window.dispatchEvent(new Event('hashchange'));
    }
};

window.deleteLesson = (modId, lessonId) => {
    if (confirm('¿Eliminar clase?')) {
        const mod = MockData.modules.find(m => m.id === modId);
        if (mod) {
            mod.lessons = mod.lessons.filter(lid => lid !== lessonId);
            MockData.lessons = MockData.lessons.filter(l => l.id !== lessonId);
            saveData();
            document.getElementById('module-edit-modal').remove();
            window.dispatchEvent(new Event('hashchange'));
        }
    }
};

window.promptEditLesson = (modId, lessonId) => {
    const modModal = document.getElementById('module-edit-modal');
    if (modModal) modModal.remove();

    const l = MockData.lessons.find(x => x.id === lessonId);
    if (!l) return;

    const modalHtml = `
        <div id="lesson-edit-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:999; display:flex; justify-content:center; align-items:center">
            <div style="background:white; padding:24px; border-radius:16px; width:90%; max-width:400px; max-height:90vh; overflow-y:auto">
                <h3 style="margin-bottom:16px">Editar Clase</h3>
                
                <div class="input-group">
                    <label>Título</label>
                    <input id="le-title" class="input-field" value="${l.title}">
                </div>
                <div class="input-group">
                    <label>Video URL</label>
                    <input id="le-video" class="input-field" value="${l.videoUrl}">
                </div>
                <div class="input-group">
                    <label>Duración</label>
                    <input id="le-duration" class="input-field" value="${l.duration}">
                </div>
                <div class="input-group">
                     <label>Foto de Portada</label>
                     <input id="le-cover" class="input-field" value="${l.coverUrl || ''}">
                </div>
                <div class="input-group">
                    <label>Descripción</label>
                    <textarea id="le-desc" class="input-field" style="height:80px">${l.description || ''}</textarea>
                </div>
                 <div class="input-group">
                    <label>Anexar Nuevo PDF (Opcional)</label>
                    <input type="file" id="le-file" class="input-field" accept=".pdf,.doc,.docx">
                </div>

                <div class="flex justify-between" style="margin-top:24px">
                    <button onclick="document.getElementById('lesson-edit-modal').remove()" style="color:red">Cancelar</button>
                    <button onclick="saveEditedLesson('${lessonId}')" class="btn-primary" style="padding:8px 16px; border-radius:8px">Guardar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.saveEditedLesson = (lessonId) => {
    const l = MockData.lessons.find(x => x.id === lessonId);
    if (l) {
        l.title = document.getElementById('le-title').value;
        l.videoUrl = document.getElementById('le-video').value;
        l.duration = document.getElementById('le-duration').value;
        l.coverUrl = document.getElementById('le-cover').value;
        l.description = document.getElementById('le-desc').value;

        const fileInput = document.getElementById('le-file');
        if (fileInput.files.length > 0) {
            l.attachment = "📄 " + fileInput.files[0].name;
        }

        saveData();
        document.getElementById('lesson-edit-modal').remove();
        window.dispatchEvent(new Event('hashchange'));
    }
};

window.promptAddLesson = (modId) => {
    const modalHtml = `
        <div id="lesson-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:999; display:flex; justify-content:center; align-items:center">
            <div style="background:white; padding:24px; border-radius:16px; width:90%; max-width:400px; max-height:90vh; overflow-y:auto">
                <h3 style="margin-bottom:16px">Nueva Clase</h3>
                
                <div class="input-group">
                    <label>Título</label>
                    <input id="l-title" class="input-field">
                </div>
                
                <div class="input-group">
                    <label>Video URL (YouTube/MP4)</label>
                    <input id="l-video" class="input-field">
                </div>
                
                <div class="input-group">
                    <label>Duración (ex: 10:00)</label>
                    <input id="l-duration" class="input-field">
                </div>
                
                <div class="input-group">
                    <label>Foto de Portada (URL)</label>
                    <input id="l-cover" class="input-field" placeholder="https://...">
                    <small style="color:#999">Esta foto aparecerá en el Inicio</small>
                </div>

                <div class="input-group">
                    <label>Descripción</label>
                    <textarea id="l-desc" class="input-field" style="height:80px"></textarea>
                </div>
                
                <div class="input-group">
                    <label>Anexar PDF / Material</label>
                    <input type="file" id="l-file" class="input-field" accept=".pdf,.doc,.docx">
                    <input id="l-attach-link" class="input-field" placeholder="O pegar link externo..." style="margin-top:8px">
                </div>

                <div class="flex justify-between" style="margin-top:24px">
                    <button onclick="document.getElementById('lesson-modal').remove()" style="color:red">Cancelar</button>
                    <button onclick="saveLesson('${modId}')" class="btn-primary" style="padding:8px 16px; border-radius:8px">Guardar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.saveLesson = (modId) => {
    const title = document.getElementById('l-title').value;
    const videoUrl = document.getElementById('l-video').value;
    const duration = document.getElementById('l-duration').value;
    const description = document.getElementById('l-desc').value;
    const coverUrl = document.getElementById('l-cover').value;

    // File handling simulation
    const fileInput = document.getElementById('l-file');
    let attachment = document.getElementById('l-attach-link').value;

    if (fileInput.files.length > 0) {
        attachment = "📄 " + fileInput.files[0].name; // Mocking upload
    }

    if (title && videoUrl) {
        const lId = 'l' + Date.now();
        // Save lesson
        MockData.lessons.push({ id: lId, moduleId: modId, title, videoUrl, duration, description, coverUrl, attachment, completed: false });

        const mod = MockData.modules.find(m => m.id === modId);
        if (mod) {
            mod.lessons.push(lId);
        }

        saveData();
        document.getElementById('lesson-modal').remove();
        window.dispatchEvent(new Event('hashchange'));
    } else {
        alert('Título y Video son obligatorios');
    }
};

window.promptAddUser = () => {
    const name = prompt("Nombre del alumno:");
    const email = prompt("Email del alumno:");
    if (name && email) {
        MockData.users.push({ id: Date.now().toString(), name, email, password: '123', role: 'member', subscriptionStatus: 'active', photoUrl: '' });
        saveData();
        window.dispatchEvent(new Event('hashchange'));
    }
};

window.toggleAccess = (id) => {
    const user = MockData.users.find(u => u.id === id);
    if (user) {
        user.subscriptionStatus = user.subscriptionStatus === 'active' ? 'inactive' : 'active';
        saveData();
        window.dispatchEvent(new Event('hashchange'));
    }
};

window.toggleModule = (id) => {
    const el = document.getElementById(`lessons-${id}`);
    if (el) el.classList.toggle('hidden');
};

/* =========================================
   5. ROUTER
   ========================================= */
const routes = {
    '/': 'home',
    '/login': 'login',
    '/register': 'register',
    '/onboarding': 'onboarding',
    '/classes': 'classes',
    '/player': 'player',
    '/community': 'community',
    '/progress': 'progress',
    '/profile': 'profile',
    '/admin': 'admin'
};

class Router {
    constructor() {
        this.appContainer = document.getElementById('app');
        this.navContainer = document.getElementById('bottom-nav');

        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());

        store.subscribe((state) => {
            if (!state.user && !this.isPublicRoute(this.getCurrentPath())) {
                window.location.hash = '#/onboarding';
            }
        });
    }

    getCurrentPath() { return window.location.hash.slice(1) || '/'; }
    isPublicRoute(path) { return ['/login', '/register', '/onboarding'].includes(path.split('?')[0]); }

    handleRoute() {
        const fullPath = this.getCurrentPath();
        const [path, queryString] = fullPath.split('?');
        const viewName = routes[path] || 'home';

        if (!store.state.user && !this.isPublicRoute(path)) {
            window.location.hash = '#/onboarding';
            return;
        }

        if (store.state.user && this.isPublicRoute(path)) {
            window.location.hash = '#/';
            return;
        }

        // Render View
        const params = new URLSearchParams(queryString);
        this.appContainer.innerHTML = Views[viewName](params);

        // Post-Render Logic
        this.runAfterRender(viewName);

        // Nav Visibility
        if (this.isPublicRoute(path) || path === '/player') {
            this.navContainer.classList.add('hidden');
        } else {
            this.navContainer.classList.remove('hidden');
            this.updateActiveNav(path);
        }
    }

    updateActiveNav(path) {
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.link === path) el.classList.add('active');
        });
    }

    runAfterRender(viewName) {
        if (viewName === 'onboarding') {
            document.getElementById('login-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const result = store.login(e.target.email.value, e.target.password.value);
                if (result.success) window.location.hash = '#/';
                else alert(result.message);
            });
        }
        // Removed separate login/register handlers
        if (viewName === 'classes') {
            // Initial render of classes list
            if (window.filterClasses) window.filterClasses();
        }
        if (viewName === 'profile') {
            document.getElementById('logout-btn').addEventListener('click', () => {
                if (confirm('¿Cerrar sesión?')) store.logout();
            });
        }
        if (viewName === 'player') {
            document.getElementById('mark-done').addEventListener('change', (e) => {
                if (e.target.checked) alert('¡Clase completada!');
            });
        }
    }
}

/* =========================================
   6. INIT
   ========================================= */
document.getElementById('bottom-nav').innerHTML = BottomNav();
window.navigate = (path) => { window.location.hash = '#' + path; };
const router = new Router();

// Classes Filter Logic
window.filterClasses = (category, chipElement) => {
    // 1. Update Chips UI
    if (chipElement) {
        document.querySelectorAll('.filter-chip').forEach(el => el.classList.remove('active'));
        chipElement.classList.add('active');
        window.currentCategory = category === 'Check All' ? null : category;
        window.currentCategory = (category === 'Check All' || category === 'Todos' || category === 'Todas' || category === 'Todos') ? null : category;
    }

    // 2. Search Query
    const searchInput = document.getElementById('class-search');
    const query = searchInput ? searchInput.value.toLowerCase() : '';

    // 3. Filter Data
    const filtered = MockData.modules.filter(m => {
        const matchesCategory = !window.currentCategory || (m.category === window.currentCategory);
        const matchesSearch = m.title.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    // 4. Render
    const listEl = document.getElementById('classes-list');
    if (!listEl) return;

    if (filtered.length === 0) {
        listEl.innerHTML = '<div style="text-align:center; color:#999; margin-top:32px">No se encontraron clases</div>';
        return;
    }

    listEl.innerHTML = filtered.map(mod => `
        <div class="horizontal-card" onclick="toggleModule('${mod.id}')">
            <div class="card-image-wrapper">
                <div class="card-bg" style="background-image: url('${mod.coverUrl}')"></div>
                <div class="play-overlay">▶</div>
            </div>
            <div class="card-content">
                <div class="card-category">${mod.category || 'General'}</div>
                <h4 class="card-title">${mod.title}</h4>
                <div class="card-meta">
                    <span class="meta-item">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        ${mod.duration || '0 min'}
                    </span>
                    <span class="meta-item">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        ${mod.lessons.length} clases
                    </span>
                </div>
            </div>
        </div>
        
         <div id="lessons-${mod.id}" class="lessons-container hidden" style="margin-bottom:24px; border-radius:12px; border:1px solid #f0f0f0; margin-top:-10px">
            ${mod.lessons.map(lessonId => {
        const lesson = MockData.lessons.find(l => l.id === lessonId);
        return `
                    <div class="lesson-item" onclick="event.stopPropagation(); navigate('/player?id=${lesson.id}')">
                        <div class="status-icon">${lesson.completed ? '✓' : '○'}</div>
                        <div class="lesson-details">
                            <span class="lesson-title" style="font-size:13px; font-weight:600">${lesson.title}</span>
                            <span class="lesson-duration" style="font-size:11px; color:#999">${lesson.duration}</span>
                        </div>
                        <div class="play-btn" style="font-size:12px; color:var(--primary-color)">▶</div>
                    </div>`;
    }).join('')}
        </div>
    `).join('');
};
