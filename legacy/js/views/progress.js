import { store } from '../store.js';

export default function Progress() {
    const user = store.state.user;
    const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const today = new Date().getDay();

    return `
        <div class="page-container fade-in">
            <header class="page-header">
                <h2>Seu Progresso</h2>
            </header>

            <!-- Calendar Strip -->
            <div class="card calendar-card">
                <div class="calendar-header">
                    <span>Essa semana</span>
                    <span style="color: var(--primary-color)">4/7 dias</span>
                </div>
                <div class="week-grid">
                    ${days.map((d, i) => `
                        <div class="day-col">
                            <span class="day-label">${d}</span>
                            <div class="day-circle ${i <= today ? (i % 2 === 0 ? 'active' : 'missed') : ''}">
                                ${i <= today ? (i % 2 === 0 ? '✓' : '') : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="stats-grid">
                <div class="stat-item card">
                    <span class="stat-val">12</span>
                    <span class="stat-label">Aulas Feitas</span>
                </div>
                <div class="stat-item card">
                    <span class="stat-val">4.5h</span>
                    <span class="stat-label">Tempo Total</span>
                </div>
                <div class="stat-item card">
                    <span class="stat-val">3</span>
                    <span class="stat-label">Streak Atual</span>
                </div>
            </div>

            <!-- Achievements -->
            <div class="section-title">
                <h3>Conquistas</h3>
            </div>
            
            <div class="achievements-list">
                <div class="achievement-item card">
                    <div class="badge">🥇</div>
                    <div class="achieve-info">
                        <h4>Primeiros Passos</h4>
                        <p>Completou a primeira aula</p>
                    </div>
                </div>
                <div class="achievement-item card">
                    <div class="badge">🔥</div>
                    <div class="achieve-info">
                        <h4>Em Chamas</h4>
                        <p>3 dias seguidos de prática</p>
                    </div>
                </div>
                 <div class="achievement-item card locked">
                    <div class="badge">🔒</div>
                    <div class="achieve-info">
                        <h4>Mestre da Drenagem</h4>
                        <p>Complete o Módulo 2</p>
                    </div>
                </div>
            </div>

            <div style="height: 60px"></div>
        </div>

        <style>
            .page-container { padding: 24px; }
            
            .calendar-card { padding: 20px; }
            .calendar-header { display: flex; justify-content: space-between; margin-bottom: 16px; font-weight: 500; }
            .week-grid { display: flex; justify-content: space-between; }
            .day-col { display: flex; flex-direction: column; align-items: center; gap: 8px; }
            .day-label { font-size: 12px; color: var(--text-secondary); }
            .day-circle {
                width: 32px; height: 32px;
                border-radius: 50%;
                background: #f0f0f0;
                display: flex; align-items: center; justify-content: center;
                font-size: 14px; color: white;
            }
            .day-circle.active { background: var(--primary-color); }
            .day-circle.missed { background: #eee; }

            .stats-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 32px; }
            .stat-item { padding: 16px; text-align: center; }
            .stat-val { display: block; font-size: 20px; font-weight: 700; color: var(--primary-color); }
            .stat-label { font-size: 11px; color: var(--text-secondary); }

            .achievement-item { display: flex; align-items: center; gap: 16px; padding: 16px; margin-bottom: 12px; }
            .badge { font-size: 24px; padding: 10px; background: var(--bg-color); border-radius: 50%; }
            .achieve-info h4 { font-size: 14px; margin-bottom: 4px; }
            .achieve-info p { font-size: 12px; color: var(--text-secondary); }
            .achievement-item.locked { opacity: 0.6; grayscale: 1; }
        </style>
    `;
}
