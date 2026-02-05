import { store } from '../store.js';
import { MockData } from '../services/mockData.js';

export default function Home() {
    const user = store.state.user;
    if (!user) return '';

    const firstName = user.name.split(' ')[0];
    const modules = MockData.modules.slice(0, 2); // Show first 2 modules

    return `
        <div class="home-container fade-in">
            <!-- Header -->
            <header class="home-header">
                <div>
                    <span class="greeting">Olá, ${firstName} ✨</span>
                    <h1>Hora do seu ritual</h1>
                </div>
                <div class="user-avatar" onclick="navigate('/profile')" style="background-image: url('${user.photoUrl}')"></div>
            </header>

            <!-- Streak Card -->
            <div class="streak-card">
                <div class="streak-info">
                    <span class="streak-count">${user.streak}</span>
                    <span class="streak-label">dias seguidos</span>
                </div>
                <div class="streak-msg">Consistência > Perfeição 💛</div>
            </div>

            <!-- Resume / Start -->
            <div class="section-title">
                <h3>Continuar praticando</h3>
                <a class="see-all" onclick="navigate('/classes')">Ver tudo</a>
            </div>

            <div class="card continue-card" onclick="navigate('/player?id=l1')">
                <div class="play-icon">▶</div>
                <div class="continue-info">
                    <h4>Massagem nas Bochechas</h4>
                    <p>Módulo 1 • 5 min restantes</p>
                </div>
            </div>

            <!-- Modules List (Horizontal Scroll in real app, stacked here) -->
            <div class="section-title">
                <h3>Recomendados</h3>
            </div>
            
            <div class="modules-grid">
                ${modules.map(mod => `
                    <div class="module-card card" onclick="navigate('/classes')">
                        <div class="module-cover" style="background-image: url('${mod.coverUrl}')"></div>
                        <div class="module-info">
                            <span class="module-level">${mod.level}</span>
                            <h4>${mod.title}</h4>
                            <p>${mod.lessons.length} aulas</p>
                        </div>
                    </div>
                `).join('')}
            </div>

        </div>

        <style>
            .home-container {
                padding: 24px;
                padding-bottom: 90px;
            }
            .home-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 32px;
            }
            .greeting {
                font-size: 16px;
                color: var(--primary-color);
                font-weight: 500;
            }
            .user-avatar {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background-color: #eee;
                background-size: cover;
                border: 2px solid white;
                box-shadow: var(--shadow-sm);
            }
            
            .streak-card {
                background: linear-gradient(135deg, #FF9966, #FF5E62);
                color: white;
                padding: 20px;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 32px;
                box-shadow: 0 8px 20px rgba(255, 94, 98, 0.3);
            }
            .streak-count {
                font-size: 32px;
                font-weight: 700;
                display: block;
                line-height: 1;
            }
            .streak-label { font-size: 12px; opacity: 0.9; }
            .streak-msg { font-size: 14px; font-weight: 500; max-width: 120px; text-align: right; }

            .section-title {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                margin-bottom: 16px;
            }
            .see-all { font-size: 14px; color: var(--primary-color); cursor: pointer; }

            .continue-card {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 16px;
            }
            .play-icon {
                width: 40px;
                height: 40px;
                background: var(--primary-light);
                color: var(--primary-color);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
            }
            .continue-info h4 { font-size: 16px; margin-bottom: 4px; }
            .continue-info p { font-size: 12px; color: var(--text-secondary); }

            .module-card { padding: 0; overflow: hidden; }
            .module-cover {
                height: 140px;
                background-color: #eee;
                background-size: cover;
                background-position: center;
            }
            .module-info { padding: 16px; }
            .module-level {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: var(--primary-color);
                font-weight: 700;
            }
        </style>
    `;
}
