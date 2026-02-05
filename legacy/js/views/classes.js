import { MockData } from '../services/mockData.js';

export default function Classes() {
    return `
        <div class="page-container fade-in">
            <header class="page-header">
                <h2>Aulas e Módulos</h2>
            </header>

            <div class="modules-list">
                ${MockData.modules.map(mod => `
                    <div class="card module-row" onclick="toggleModule('${mod.id}')">
                        <div class="row-cover" style="background-image: url('${mod.coverUrl}')"></div>
                        <div class="row-info">
                            <span class="module-level">${mod.level}</span>
                            <h3>${mod.title}</h3>
                            <p>${mod.lessons.length} aulas</p>
                        </div>
                        <div class="row-arrow">▼</div>
                    </div>
                    
                    <div id="lessons-${mod.id}" class="lessons-container hidden">
                        ${mod.lessons.map(lessonId => {
        const lesson = MockData.lessons.find(l => l.id === lessonId);
        return `
                                <div class="lesson-item ${lesson.completed ? 'completed' : ''}" onclick="navigate('/player?id=${lesson.id}')">
                                    <div class="status-icon">${lesson.completed ? '✓' : '○'}</div>
                                    <div class="lesson-details">
                                        <span class="lesson-title">${lesson.title}</span>
                                        <span class="lesson-duration">${lesson.duration}</span>
                                    </div>
                                    <div class="play-btn">▶</div>
                                </div>
                            `;
    }).join('')}
                    </div>
                `).join('')}
            </div>
            
            <div style="height: 60px"></div>
        </div>

        <style>
            .page-container { padding: 24px; }
            .page-header { margin-bottom: 24px; }
            
            .module-row {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 12px;
                cursor: pointer;
            }
            .row-cover {
                width: 60px;
                height: 60px;
                background-color: #eee;
                background-size: cover;
                border-radius: 8px;
            }
            .row-info { flex: 1; }
            .row-info h3 { font-size: 16px; margin: 0; margin-bottom: 4px; }
            
            .lessons-container {
                margin-top: -16px;
                margin-bottom: 16px;
                background: white;
                border-radius: 0 0 12px 12px;
                overflow: hidden;
            }
            .lesson-item {
                display: flex;
                align-items: center;
                padding: 16px;
                border-bottom: 1px solid #f0f0f0;
                cursor: pointer;
            }
            .lesson-item:hover { background-color: #f9f9f9; }
            .status-icon {
                margin-right: 16px;
                color: var(--primary-color);
                font-weight: bold;
            }
            .lesson-details { flex: 1; }
            .lesson-title { display: block; font-size: 14px; font-weight: 500; }
            .lesson-duration { font-size: 12px; color: var(--text-secondary); }
            
            .lesson-item.completed .lesson-title { color: var(--text-secondary); text-decoration: line-through; }
        </style>
    `;
}

export function afterRender() {
    window.toggleModule = (id) => {
        const el = document.getElementById(`lessons-${id}`);
        el.classList.toggle('hidden');
    };
}
