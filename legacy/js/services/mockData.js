export const MockData = {
    currentUser: null, // Will be set on login

    users: [
        {
            id: '1',
            email: 'aluno@fitface.com',
            password: '123', // In real app: hashed
            name: 'Maria Silva',
            role: 'member', // visitor, member, admin
            subscriptionStatus: 'active',
            photoUrl: 'assets/user-placeholder.png',
            streak: 3
        },
        {
            id: '2',
            email: 'admin@fitface.com',
            password: 'admin',
            name: 'Ana Fit',
            role: 'admin',
            subscriptionStatus: 'active',
            photoUrl: 'assets/admin.png',
            streak: 365
        }
    ],

    modules: [
        {
            id: 'mod1',
            title: 'Introdução ao Face Yoga',
            description: 'Aprenda os movimentos básicos e a fisiologia do rosto.',
            level: 'Iniciante',
            coverUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=500', 
            order: 1,
            lessons: ['l1', 'l2']
        },
        {
            id: 'mod2',
            title: 'Drenagem Linfática',
            description: 'Reduza o inchaço e defina o contorno facial.',
            level: 'Intermediário',
            coverUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=500',
            order: 2,
            lessons: ['l3', 'l4']
        }
    ],

    lessons: [
        { id: 'l1', moduleId: 'mod1', title: 'O que é Face Yoga?', duration: '5:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: true },
        { id: 'l2', moduleId: 'mod1', title: 'Postura e Respiração', duration: '8:30', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
        { id: 'l3', moduleId: 'mod2', title: 'Massagem nas Bochechas', duration: '12:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
        { id: 'l4', moduleId: 'mod2', title: 'Drenagem do Pescoço', duration: '10:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
    ],

    posts: [
        {
            id: 'p1',
            userId: '2',
            text: 'Bem-vindas à nossa comunidade! Qual o objetivo de vocês hoje?',
            imageUrl: '',
            likes: 12,
            tags: ['Motivação'],
            timestamp: new Date().toISOString()
        },
        {
            id: 'p2',
            userId: '1',
            text: 'Fiz a aula de drenagem hoje e já senti diferença no inchaço matinal! 😍',
            imageUrl: '',
            likes: 5,
            tags: ['Resultados'],
            timestamp: new Date(Date.now() - 86400000).toISOString()
        }
    ]
};
