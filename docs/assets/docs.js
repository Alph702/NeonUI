
// Shared Layout Logic for Documentation
document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectSidebar();
    highlightCurrentLink();
    setupMobileMenu();
});

function injectHeader() {
    const header = document.createElement('nav');
    header.className = 'navbar glass sticky-top';
    header.innerHTML = `
        <div class="container flex-between">
            <div class="flex-center gap-2">
                <button class="btn btn-icon btn-ghost mobile-only" id="docs-menu-toggle">☰</button>
                <a href="../index.html" class="logo text-large text-primary animate-flicker" style="text-decoration: none;">NeonUI</a>
            </div>
            <ul class="nav-links flex gap-2">
                <li><a href="../index.html" class="nav-link">Home</a></li>
                <li><a href="index.html" class="nav-link active">Docs</a></li>
                <li><a href="https://github.com" target="_blank" class="nav-link">GitHub</a></li>
            </ul>
        </div>
    `;
    document.body.prepend(header);
}

function injectSidebar() {
    const sidebar = document.createElement('aside');
    sidebar.className = 'docs-sidebar';
    
    const menuItems = [
        {
            title: 'Getting Started',
            links: [
                { text: 'Introduction', href: 'index.html' },
                { text: 'Installation', href: 'installation.html' },
            ]
        },
        {
            title: 'Core',
            links: [
                { text: 'Design Tokens', href: 'tokens.html' },
                { text: 'Utilities', href: 'utilities.html' },
                { text: 'Animations', href: 'animations.html' },
            ]
        },
        {
            title: 'Components',
            links: [
                { text: 'Buttons', href: 'components/button.html' },
                { text: 'Cards', href: 'components/card.html' },
                { text: 'Forms', href: 'components/forms.html' },
                { text: 'Modals', href: 'components/modal.html' },
                { text: 'Navigation', href: 'components/navigation.html' },
                { text: 'Feedback', href: 'components/feedback.html' },
                { text: 'Interactive', href: 'components/interactive.html' },
            ]
        }
    ];

    let sidebarHtml = '';
    menuItems.forEach(group => {
        sidebarHtml += `
            <div class="docs-sidebar-group">
                <div class="docs-sidebar-title">${group.title}</div>
                ${group.links.map(link => {
                    // Adjust path based on current depth
                    const isComponentPage = window.location.pathname.includes('/components/');
                    let href = link.href;
                    if (isComponentPage && !link.href.includes('components/')) {
                        href = '../' + link.href;
                    } else if (!isComponentPage && link.href.includes('components/')) {
                        // href is already correct relative to docs root
                    } else if (isComponentPage && link.href.includes('components/')) {
                         // link is components/button.html, we are in components/card.html
                         // we want just button.html
                         href = link.href.split('/')[1];
                    }
                    
                    return `<a href="${href}" class="docs-nav-link">${link.text}</a>`;
                }).join('')}
            </div>
        `;
    });

    sidebar.innerHTML = sidebarHtml;
    
    // Insert sidebar before the main content
    const main = document.querySelector('.docs-content');
    if (main) {
        main.parentNode.insertBefore(sidebar, main);
    }
}

function highlightCurrentLink() {
    const currentPath = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.docs-nav-link');
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

function setupMobileMenu() {
    // Delegate event since header is injected
    document.addEventListener('click', (e) => {
        if (e.target.id === 'docs-menu-toggle') {
            document.querySelector('.docs-sidebar').classList.toggle('active');
        }
    });
}
