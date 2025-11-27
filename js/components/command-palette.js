export const CommandPalette = {
    isOpen: false,
    items: [
        { id: 'home', label: 'Go to Home', icon: '🏠', action: () => window.location.hash = '#hero' },
        { id: 'components', label: 'Browse Components', icon: '🧩', action: () => window.location.hash = '#buttons' },
        { id: 'docs', label: 'Read Documentation', icon: '📚', action: () => window.location.hash = '#docs' },
        { id: 'theme', label: 'Toggle Theme', icon: '🌓', action: () => alert('Theme toggle not implemented yet') },
        { id: 'settings', label: 'Settings', icon: '⚙️', action: () => alert('Settings not implemented yet') },
        { id: 'github', label: 'View on GitHub', icon: '🐙', action: () => window.open('https://github.com', '_blank') },
    ],

    init() {
        this.createDOM();
        this.bindEvents();
    },

    createDOM() {
        const overlay = document.createElement('div');
        overlay.className = 'cmd-palette-overlay';
        overlay.innerHTML = `
            <div class="cmd-palette">
                <div class="cmd-input-wrapper">
                    <span>🔍</span>
                    <input type="text" class="cmd-input" placeholder="Type a command or search...">
                </div>
                <div class="cmd-results"></div>
                <div class="cmd-footer">
                    <span>Use ⬆⬇ to navigate</span>
                    <span>Enter to select</span>
                    <span>Esc to close</span>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        this.overlay = overlay;
        this.input = overlay.querySelector('.cmd-input');
        this.resultsContainer = overlay.querySelector('.cmd-results');
    },

    bindEvents() {
        // Open with Cmd+K or Ctrl+K
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // Input handling
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
            el.className = 'cmd-item';
            el.innerHTML = `
                <div class="flex-center gap-1">
                    <span>${item.icon}</span>
                    <span>${item.label}</span>
                </div>
                <span class="cmd-shortcut">↵</span>
            `;
            el.addEventListener('click', () => {
                item.action();
                this.close();
            });
            this.resultsContainer.appendChild(el);
        });
    }
};
