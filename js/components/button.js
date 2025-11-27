export function initButtons() {
    const buttons = document.querySelectorAll('.ripple');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Make ripple size proportional to button
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.marginLeft = ripple.style.marginTop = `-${size/2}px`;

            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Magnetic effect (optional, simple version)
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}
