import { store } from '../store.js';

export default function Profile() {
    const user = store.state.user || {};

    return `
        <div class="page-container fade-in">
            <header class="profile-header">
                <div class="profile-avatar-large" style="background-image: url('${user.photoUrl || ''}')">
                    <div class="edit-badge">📷</div>
                </div>
                <h2>${user.name}</h2>
                <div class="profile-tag">Membro Premium</div>
            </header>

            <div class="settings-list">
                <div class="section-label">Conta</div>
                <div class="setting-item card">
                    <span>Editar Perfil</span>
                    <span>→</span>
                </div>
                <div class="setting-item card">
                    <span>Assinatura</span>
                    <span class="active-badge">Ativa</span>
                </div>

                <div class="section-label">Preferências</div>
                <div class="setting-item card">
                    <span>Notificações</span>
                    <div class="toggle active"></div>
                </div>
                 <div class="setting-item card">
                    <span>Tema Escuro</span>
                    <div class="toggle"></div>
                </div>

                <div class="section-label">Suporte</div>
                <div class="setting-item card">
                    <span>Ajuda & FAQ</span>
                    <span>→</span>
                </div>
            </div>

            <button class="btn btn-ghost logout-btn" id="logout-btn">Sair da conta</button>
            
            <div style="height: 60px"></div>
        </div>

        <style>
            .page-container { padding: 24px; }
            .profile-header { display: flex; flex-direction: column; align-items: center; margin-bottom: 32px; }
            .profile-avatar-large {
                width: 100px; height: 100px;
                border-radius: 50%;
                background-color: #eee;
                background-size: cover;
                margin-bottom: 16px;
                position: relative;
                border: 3px solid white;
                box-shadow: var(--shadow-md);
            }
            .edit-badge {
                position: absolute; right: 0; bottom: 0;
                background: var(--primary-color);
                width: 30px; height: 30px;
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                font-size: 14px;
                border: 2px solid white;
            }
            .profile-tag {
                background: var(--primary-light);
                color: var(--primary-color);
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
                margin-top: 8px;
            }

            .section-label { font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--text-secondary); margin: 24px 0 8px 4px; }
            .setting-item {
                display: flex; justify-content: space-between; align-items: center;
                padding: 16px; margin-bottom: 8px;
            }
            .active-badge { color: var(--status-success); font-weight: 500; font-size: 14px; }

            .toggle {
                width: 40px; height: 20px;
                background: #ddd;
                border-radius: 20px;
                position: relative;
            }
            .toggle.active { background: var(--primary-color); }
            .toggle::after {
                content: '';
                position: absolute; left: 2px; top: 2px;
                width: 16px; height: 16px;
                background: white;
                border-radius: 50%;
                transition: transform 0.2s;
            }
            .toggle.active::after { transform: translateX(20px); }

            .logout-btn { color: var(--status-error); margin-top: 24px; width: 100%; text-align: center; }
        </style>
    `;
}

export function afterRender() {
    document.getElementById('logout-btn').addEventListener('click', () => {
        if (confirm('Tem certeza que deseja sair?')) {
            store.logout();
            window.navigate('/onboarding');
        }
    });
}
