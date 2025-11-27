
import { Icons } from '../icons.js';

export const CommandPalette = {
    isOpen: false,
    items: [
        { id: 'home', label: 'Go to Home', icon: 'home', action: () => window.location.href = '/index.html' },
        { id: 'docs', label: 'Documentation', icon: 'docs', action: () => window.location.href = '/docs/index.html' },
        { id: 'components', label: 'Browse Components', icon: 'components', action: () => window.location.href = '/docs/components/button.html' },
        { id: 'github', label: 'View on GitHub', icon: 'github', action: () => window.open('https://github.com', '_blank') },
        { id: 'theme', label: 'Toggle Theme', icon: 'moon', action: () => alert('Theme toggle coming soon') },
    ],

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    },

    setup() {
        this.createDOM();
        this.bindEvents();
    },

    createDOM() {
        // Remove existing if any
        const existing = document.querySelector('.cmd-palette-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'cmd-palette-overlay';
        overlay.innerHTML = `
            <div class="cmd-palette glass">
                <div class="cmd-input-wrapper border-bottom">
                    <span class="text-muted">${Icons.search}</span>
                    <input type="text" class="cmd-input" placeholder="Type a command or search...">
                </div>
                <div class="cmd-results"></div>
                <div class="cmd-footer text-small text-muted border-top">
                    <div class="flex-between w-full">
                        <span>Use ⬆⬇ to navigate</span>
                        <span>Esc to close</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        this.overlay = overlay;
        this.input = overlay.querySelector('.cmd-input');
        this.resultsContainer = overlay.querySelector('.cmd-results');
    },

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        this.input.addEventListener('input', (e) => this.filter(e.target.value));
    },

    toggle() {
        if (this.isOpen) this.close();
        else this.open();
    },

    open() {
        this.isOpen = true;
        this.overlay.classList.add('open');
        this.input.value = '';
        this.input.focus();
        this.renderResults(this.items);
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.isOpen = false;
        this.overlay.classList.remove('open');
        document.body.style.overflow = '';
    },

    filter(query) {
        const lowerQuery = query.toLowerCase();
        const filtered = this.items.filter(item => 
            item.label.toLowerCase().includes(lowerQuery)
        );
        this.renderResults(filtered);
    },

    renderResults(items) {
        this.resultsContainer.innerHTML = '';
        if (items.length === 0) {
            this.resultsContainer.innerHTML = '<div class="p-2 text-center text-muted">No results found.</div>';
            return;
        }

        items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'cmd-item flex-between align-center p-2';
            // Use icon from Icons object if available, else fallback
            const iconSvg = Icons[item.icon] || Icons.zap;
            
            el.innerHTML = `
                <div class="flex-center gap-2">
                    <span class="text-muted">${iconSvg}</span>
                    <span>${item.label}</span>
                </div>
                <span class="text-small text-muted">↵</span>
            `;
            el.addEventListener('click', () => {
                item.action();
                this.close();
            });
            this.resultsContainer.appendChild(el);
        });
    }
};
