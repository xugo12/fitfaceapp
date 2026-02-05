import { store } from './store.js';

// We will import Views dynamically or have a registry
// For simplicity in Vanilla JS modules, we'll define a simple registry map

const routes = {
    '/': 'home',
    '/login': 'login',
    '/register': 'register',
    '/onboarding': 'onboarding',

    '/classes': 'classes', // List of modules
    '/player': 'player', // /player?id=123

    '/community': 'community',
    '/progress': 'progress',
    '/profile': 'profile'
};

export class Router {
    constructor() {
        this.appContainer = document.getElementById('app');
        this.navContainer = document.getElementById('bottom-nav');

        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());

        // Listen to auth changes to redirect if needed
        store.subscribe((state) => {
            if (!state.user && !this.isPublicRoute(this.getCurrentPath())) {
                window.location.hash = '#/onboarding';
            }
        });
    }

    getCurrentPath() {
        return window.location.hash.slice(1) || '/';
    }

    isPublicRoute(path) {
        return ['/login', '/register', '/onboarding'].includes(path.split('?')[0]);
    }

    async handleRoute() {
        const fullPath = this.getCurrentPath();
        const [path, queryString] = fullPath.split('?');
        const viewName = routes[path] || 'home';

        // Auth Guard
        if (!store.state.user && !this.isPublicRoute(path)) {
            window.location.hash = '#/onboarding';
            return;
        }

        // If logged in and trying to go to onboarding/login, redirect home
        if (store.state.user && this.isPublicRoute(path)) {
            window.location.hash = '#/';
            return;
        }

        // Load View
        await this.renderView(viewName, queryString);

        // Update Bottom Nav Visibility
        if (this.isPublicRoute(path)) {
            this.navContainer.classList.add('hidden');
        } else {
            this.navContainer.classList.remove('hidden');
            this.updateActiveNav(path);
        }
    }

    async renderView(viewName, queryString) {
        this.appContainer.innerHTML = '<div class="loading">Carregando...</div>';

        try {
            // Dynamic import of view modules
            const module = await import(`./views/${viewName}.js`);
            const params = new URLSearchParams(queryString);
            this.appContainer.innerHTML = module.default(params);

            // Execute any after-render scripts if the view exports it
            if (module.afterRender) {
                module.afterRender();
            }
        } catch (error) {
            console.error('Error loading view:', error);
            this.appContainer.innerHTML = '<div class="error">Erro ao carregar página</div>';
        }
    }

    updateActiveNav(path) {
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.link === path) el.classList.add('active');
        });
    }
}
