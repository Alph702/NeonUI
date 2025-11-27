export function initNavigation() {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Sidebar Toggle
    const toggleBtns = document.querySelectorAll('[data-toggle-sidebar]');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const closeBtns = document.querySelectorAll('[data-close-sidebar]');

    function openSidebar() {
        if (sidebar) sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggleBtns.forEach(btn => btn.addEventListener('click', openSidebar));
    closeBtns.forEach(btn => btn.addEventListener('click', closeSidebar));
    
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
}
