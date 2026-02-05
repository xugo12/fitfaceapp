import { Router } from './router.js';
import { BottomNav } from './components/BottomNav.js';

// Initialize Components
document.getElementById('bottom-nav').innerHTML = BottomNav();

// Initialize Router
const router = new Router();

// Global navigate helper for onclick events
window.navigate = (path) => {
    window.location.hash = '#' + path;
};
