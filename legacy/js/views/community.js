import { MockData } from '../services/mockData.js';
import { store } from '../store.js';

export default function Community() {
    return `
        <div class="page-container fade-in">
            <header class="page-header flex justify-between items-center">
                <h2>Comunidade</h2>
                <div class="user-avatar-sm" style="background-image: url('${store.state.user?.photoUrl || ''}')"></div>
            </header>

            <div class="create-post-card card">
                <textarea placeholder="Compartilhe seus resultados ou dúvidas..." rows="3"></textarea>
                <div class="flex justify-between items-center mt-2">
                    <button class="btn-icon">📷</button>
                    <button class="btn btn-primary" style="width: auto; padding: 8px 24px; font-size: 14px;">Publicar</button>
                </div>
            </div>

            <div class="tags-scroller">
                <span class="tag active">Geral</span>
                <span class="tag">Dúvidas</span>
                <span class="tag">Resultados</span>
                <span class="tag">Rotina</span>
            </div>

            <div class="feed-list">
                ${MockData.posts.map(post => {
        const postUser = MockData.users.find(u => u.id === post.userId) || { name: 'Usuário', photoUrl: '' };
        return `
                        <div class="card post-card">
                            <div class="post-header">
                                <div class="post-avatar" style="background-image: url('${postUser.photoUrl}')"></div>
                                <div>
                                    <div class="post-author">${postUser.name}</div>
                                    <div class="post-time">2h atrás</div>
                                </div>
                            </div>
                            <div class="post-body">
                                <p>${post.text}</p>
                                ${post.imageUrl ? `<img src="${post.imageUrl}" class="post-image">` : ''}
                            </div>
                            <div class="post-footer">
                                <button class="action-btn">❤️ ${post.likes}</button>
                                <button class="action-btn">💬 Comentar</button>
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
            
            <div style="height: 60px"></div>
        </div>

        <style>
            .page-container { padding: 24px; }
            .user-avatar-sm { width: 32px; height: 32px; border-radius: 50%; background-color: #eee; background-size: cover; }
            
            .create-post-card textarea {
                width: 100%;
                border: none;
                resize: none;
                font-family: inherit;
                outline: none;
            }
            .mt-2 { margin-top: 8px; }
            
            .tags-scroller {
                display: flex;
                gap: 8px;
                overflow-x: auto;
                padding-bottom: 16px;
                scrollbar-width: none;
            }
            .tag {
                padding: 6px 16px;
                background: #eee;
                border-radius: 20px;
                font-size: 12px;
                white-space: nowrap;
                color: var(--text-secondary);
            }
            .tag.active {
                background: var(--primary-color);
                color: white;
            }

            .post-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
            .post-avatar { width: 40px; height: 40px; border-radius: 50%; background-color: #eee; background-size: cover; }
            .post-author { font-weight: 600; font-size: 14px; }
            .post-time { font-size: 12px; color: var(--text-secondary); }
            
            .post-footer {
                margin-top: 16px;
                padding-top: 12px;
                border-top: 1px solid #f0f0f0;
                display: flex;
                gap: 16px;
            }
            .action-btn { font-size: 12px; color: var(--text-secondary); font-weight: 500; }
        </style>
    `;
}
