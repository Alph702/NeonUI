export const Toast = {
    init() {
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
    },

    show(message, type = 'success', duration = 3000) {
        this.init();
        const container = document.getElementById('toast-container');
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Icon based on type
        let icon = '✓';
        if (type === 'error') icon = '✕';
        if (type === 'warning') icon = '⚠';
        if (type === 'info') icon = 'ℹ';

        toast.innerHTML = `
            <div class="flex-center gap-1">
                <span style="font-size: 1.2rem;">${icon}</span>
                <span>${message}</span>
            </div>
            <button class="modal-close" style="font-size: 1rem;">&times;</button>
        `;

        // Close button logic
        toast.querySelector('button').addEventListener('click', () => {
            removeToast(toast);
        });

        container.appendChild(toast);

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                removeToast(toast);
            }, duration);
        }

        function removeToast(el) {
            el.classList.add('hiding');
            el.addEventListener('animationend', () => {
                el.remove();
            });
        }
    }
};
