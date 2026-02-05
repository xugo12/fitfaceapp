import { store } from '../store.js';

export default function Register() {
    return `
        <div class="auth-container fade-in">
            <header class="auth-header">
                <button class="back-btn" onclick="navigate('/onboarding')">←</button>
                <h2>Criar conta</h2>
            </header>

            <form id="register-form" class="auth-form">
                <div class="input-group">
                    <label>Nome Completo</label>
                    <input type="text" class="input-field" placeholder="Seu nome" required>
                </div>

                <div class="input-group">
                    <label>Email</label>
                    <input type="email" class="input-field" placeholder="seu@email.com" required>
                </div>
                
                <div class="input-group">
                    <label>Senha</label>
                    <input type="password" class="input-field" placeholder="******" required>
                </div>

                <button type="submit" class="btn btn-primary" style="margin-top: 24px">Começar Jornada</button>
            </form>
             <p class="text-center small mt-4" style="margin-top: 24px; color: var(--text-secondary)">
                Ao criar conta, você aceita os <br> <a href="#">Termos de Uso</a> e <a href="#">Privacidade</a>.
            </p>
        </div>

        <style>
             .auth-container {
                padding: 24px;
                min-height: 100vh;
                background: var(--bg-color);
            }
            .auth-header {
                display: flex;
                align-items: center;
                gap: 16px;
                margin-bottom: 40px;
                margin-top: 20px;
            }
            .back-btn {
                font-size: 24px;
                color: var(--text-primary);
                padding: 8px;
            }
            .auth-form {
                background: white;
                padding: 24px;
                border-radius: 20px;
                box-shadow: var(--shadow-sm);
            }
        </style>
    `;
}

export function afterRender() {
    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real app, integrate with API. Here we just mock success.
        alert('Cadastro realizado com sucesso! Faça login.');
        window.navigate('/login');
    });
}
