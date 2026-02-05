export default function Onboarding() {
    return `
        <div class="onboarding-container fade-in">
            <div class="onboarding-slide">
                <div class="slide-image placeholder-glow"></div>
                <h1>Rejuvenesça Naturalmente</h1>
                <p>Aprenda técnicas de massagem facial para fazer em casa e transforme sua pele.</p>
            </div>
            
            <div class="auth-buttons">
                <button class="btn btn-primary" onclick="navigate('/register')">Criar Conta</button>
                <div style="height: 12px"></div>
                <button class="btn btn-ghost" onclick="navigate('/login')">Já tenho conta</button>
            </div>
        </div>

        <style>
            .onboarding-container {
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding: 32px;
                background: linear-gradient(180deg, var(--bg-color) 0%, var(--primary-light) 100%);
            }
            .onboarding-slide {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin-bottom: 40px;
            }
            .slide-image {
                width: 200px;
                height: 200px;
                background-color: rgba(255,255,255,0.5);
                border-radius: 50%;
                margin-bottom: 32px;
                box-shadow: 0 10px 30px rgba(212, 163, 115, 0.2);
            }
            .onboarding-slide h1 {
                font-size: 32px;
                color: var(--text-primary);
                margin-bottom: 16px;
                line-height: 1.2;
            }
        </style>
    `;
}
