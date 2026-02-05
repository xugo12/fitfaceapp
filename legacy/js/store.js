import { MockData } from './services/mockData.js';

class Store {
    constructor() {
        this.state = {
            user: null, // null = not logged in
            theme: 'light',
            currentModule: null,
            loading: false
        };
        this.listeners = [];

        // Restore session if exists
        const savedUser = localStorage.getItem('fitface_user');
        if (savedUser) {
            this.state.user = JSON.parse(savedUser);
        }
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    // Actions
    login(email, password) {
        const user = MockData.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.state.user = user;
            localStorage.setItem('fitface_user', JSON.stringify(user));
            this.notify();
            return { success: true };
        }
        return { success: false, message: 'Email ou senha inválidos' };
    }

    logout() {
        this.state.user = null;
        localStorage.removeItem('fitface_user');
        this.notify();
    }

    updateUserProgress(lessonId) {
        // In a real app, API call. Here, just log.
        console.log(`Lesson ${lessonId} completed`);
        // We could verify updates in local mock state if needed
    }
}

export const store = new Store();
