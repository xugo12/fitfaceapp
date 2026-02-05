import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Send } from 'lucide-react';

const Community = () => {
    const { data, setData, user } = useStore();
    const [newPostText, setNewPostText] = useState('');

    const handlePublish = () => {
        if (!newPostText.trim()) return;

        const newPost = {
            id: 'p' + Date.now(),
            userId: user.id || 'current',
            text: newPostText,
            imageUrl: '',
            likes: 0,
            tags: [],
            timestamp: new Date().toISOString()
        };

        // Add new post to the beginning of the list
        const updatedPosts = [newPost, ...data.posts];
        setData({ ...data, posts: updatedPosts });
        setNewPostText('');
    };

    return (
        <div className="page-container fade-in" style={{ padding: '24px', paddingBottom: '90px' }}>
            <header className="page-header" style={{ marginBottom: '16px' }}>
                <h2>Comunidad</h2>
            </header>

            <div className="card" style={{ marginBottom: '24px' }}>
                <textarea
                    style={{
                        width: '100%', border: 'none', outline: 'none', fontFamily: 'inherit',
                        resize: 'none', minHeight: '60px', padding: '8px', fontSize: '15px'
                    }}
                    placeholder={`¿Qué estás pensando, ${user ? user.name.split(' ')[0] : ''}?`}
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                ></textarea>
                <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f0f0f0', paddingTop: '12px', marginTop: '8px' }}>
                    <button
                        className="btn-primary"
                        onClick={handlePublish}
                        style={{ width: 'auto', padding: '8px 20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}
                        disabled={!newPostText.trim()}
                    >
                        Publicar <Send size={14} />
                    </button>
                </div>
            </div>

            <div className="feed-list">
                {data.posts.map(post => {
                    const postUser = data.users.find(u => u.id === post.userId) || { name: 'User' };
                    return (
                        <div key={post.id} className="card post-card" style={{ marginBottom: '12px' }}>
                            <div className="post-header" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#eee', backgroundImage: `url('${postUser.photoUrl || 'assets/user-placeholder.png'}')`, backgroundSize: 'cover' }}></div>
                                <strong>{postUser.name}</strong>
                                <span style={{ fontSize: '11px', color: '#999', marginLeft: 'auto' }}>{new Date(post.timestamp).toLocaleDateString()}</span>
                            </div>
                            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#444', lineHeight: '1.5' }}>{post.text}</p>
                            <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                ❤️ {post.likes}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Community;
