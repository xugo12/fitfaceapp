import { MockData } from '../services/mockData.js';
import { store } from '../store.js';

export default function Player(params) {
    const lessonId = params.get('id');
    const lesson = MockData.lessons.find(l => l.id === lessonId);

    if (!lesson) return '<div class="p-4">Aula não encontrada</div>';

    return `
        <div class="player-container fade-in">
            <button class="back-floating" onclick="history.back()">←</button>
            
            <div class="video-wrapper">
                <video controls poster="assets/video_placeholder.png" class="video-element">
                    <source src="${lesson.videoUrl}" type="video/mp4">
                    Seu navegador não suporta vídeo.
                </video>
            </div>

            <div class="lesson-content">
                <h1>${lesson.title}</h1>
                <div class="video-controls">
                    <span class="speed-control">1x</span>
                </div>
                
                <p class="description">
                    Nesta aula, vamos aprender os movimentos essenciais para ativar a musculatura.
                    Lembre-se de usar um óleo facial para deslizar melhor.
                </p>

                <div class="action-area">
                    <label class="checkbox-container">
                        <input type="checkbox" id="mark-done" ${lesson.completed ? 'checked' : ''}>
                        <span class="checkmark"></span>
                        Marcar como concluída
                    </label>
                </div>
            </div>
        </div>

        <style>
            .player-container { background: white; min-height: 100vh; }
            .back-floating {
                position: absolute;
                top: 16px; left: 16px;
                z-index: 10;
                background: rgba(0,0,0,0.5);
                color: white;
                width: 40px; height: 40px;
                border-radius: 50%;
                font-size: 20px;
            }
            .video-wrapper {
                width: 100%;
                background: black;
                aspect-ratio: 16/9;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .video-element { width: 100%; height: 100%; }
            
            .lesson-content { padding: 24px; }
            .lesson-content h1 { font-size: 22px; margin-bottom: 8px; }
            .description { margin-top: 16px; margin-bottom: 32px; }
            
            .action-area {
                padding: 16px;
                background: #f9f9f9;
                border-radius: 12px;
                display: flex;
                justify-content: center;
            }
            
            /* Custom Checkbox */
            .checkbox-container {
                display: flex;
                align-items: center;
                cursor: pointer;
                font-weight: 500;
                user-select: none;
            }
            .checkbox-container input { display: none; }
            .checkmark {
                height: 24px;
                width: 24px;
                background-color: #eee;
                border-radius: 6px;
                margin-right: 12px;
                position: relative;
            }
            .checkbox-container input:checked ~ .checkmark {
                background-color: var(--primary-color);
            }
            .checkmark:after {
                content: "";
                position: absolute;
                display: none;
                left: 9px; top: 5px;
                width: 5px; height: 10px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
            }
            .checkbox-container input:checked ~ .checkmark:after { display: block; }
        </style>
    `;
}

export function afterRender() {
    // Hide Bottom Nav when in Player
    document.getElementById('bottom-nav').classList.add('hidden');

    // Toggle Done Logic
    document.getElementById('mark-done').addEventListener('change', (e) => {
        if (e.target.checked) {
            // Animation or Toast could go here
            console.log('Marked as done');
        }
    });
}
