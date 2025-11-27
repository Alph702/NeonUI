export const Modal = {
    init() {
        const triggers = document.querySelectorAll('[data-modal-target]');
        const closers = document.querySelectorAll('[data-modal-close]');
        
        triggers.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-modal-target');
                this.open(targetId);
            });
        });

        closers.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal-overlay');
                this.close(modal);
            });
        });

        // Close on outside click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.close(overlay);
                }
            });
        });
    },

    open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    },

    close(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
};
