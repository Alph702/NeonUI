
export const Modal = {
    init() {
        // Use event delegation for triggers
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-modal-target]');
            if (trigger) {
                const targetId = trigger.getAttribute('data-modal-target');
                this.open(targetId);
            }

            const closer = e.target.closest('[data-modal-close]');
            if (closer) {
                const modal = closer.closest('.modal-overlay');
                this.close(modal);
            }

            if (e.target.classList.contains('modal-overlay')) {
                this.close(e.target);
            }
        });

        // Handle Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal-overlay.open');
                if (openModal) {
                    this.close(openModal);
                }
            }
        });
    },

    open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            // Animate in
            const content = modal.querySelector('.modal');
            if (content) {
                content.style.opacity = '0';
                content.style.transform = 'scale(0.95)';
                requestAnimationFrame(() => {
                    content.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    content.style.opacity = '1';
                    content.style.transform = 'scale(1)';
                });
            }
        } else {
            console.warn(`Modal with ID "${modalId}" not found.`);
        }
    },

    close(modalElement) {
        if (modalElement) {
            const content = modalElement.querySelector('.modal');
            if (content) {
                content.style.opacity = '0';
                content.style.transform = 'scale(0.95)';
                
                // Wait for animation to finish
                setTimeout(() => {
                    modalElement.classList.remove('open');
                    document.body.style.overflow = '';
                }, 200);
            } else {
                modalElement.classList.remove('open');
                document.body.style.overflow = '';
            }
        }
    }
};
