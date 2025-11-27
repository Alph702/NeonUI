export function initForms() {
    // Autosize Textarea
    const textareas = document.querySelectorAll('textarea.autosize');
    
    const resize = (el) => {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    };

    textareas.forEach(el => {
        el.addEventListener('input', () => resize(el));
        // Initial resize
        resize(el);
    });

    // Custom Select (Optional enhancement, for now standard select is styled)
    // Future: Implement custom dropdown for select
}
