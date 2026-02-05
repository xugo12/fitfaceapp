import { store } from '../store.js';

export default function Login() {
    return `
        <div class="auth-container fade-in">
            <header class="auth-header">
                <button class="back-btn" onclick="navigate('/onboarding')">←</button>
                <h2>Bem-vinda de volta</h2>
            </header>

            <form id="login-form" class="auth-form">
                <div class="input-group">
                    <label>Email</label>
                    <input type="email" name="email" class="input-field" placeholder="seu@email.com" value="aluno@fitface.com" required>
                </div>
                
                <div class="input-group">
                    <label>Senha</label>
                    <input type="password" name="password" class="input-field" placeholder="******" value="123" required>
                </div>

                <div class="form-footer">
                    <a href="#" class="forgot-link">Esqueceu a senha?</a>
                </div>

                <button type="submit" class="btn btn-primary" style="margin-top: 24px">Entrar</button>
            </form>
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
            .form-footer {
                text-align: right;
                margin-top: 12px;
                font-size: 14px;
                color: var(--primary-color);
            }
        </style>
    `;
}

export function afterRender() {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const result = store.login(email, password);

        if (result.success) {
            window.location.hash = '#/';
        } else {
            alert(result.message);
        }
    });
}
