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

    // File Uploader
    const fileInputs = document.querySelectorAll('.file-upload-input');
    
    fileInputs.forEach(input => {
        const wrapper = input.closest('.file-upload-wrapper');
        const label = wrapper.querySelector('.file-upload-label');
        const preview = wrapper.querySelector('.file-preview');
        
        // Drag & Drop
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            label.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            label.addEventListener(eventName, () => label.classList.add('dragover'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            label.addEventListener(eventName, () => label.classList.remove('dragover'), false);
        });

        label.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }

        input.addEventListener('change', function() {
            handleFiles(this.files);
        });

        function handleFiles(files) {
            if (files.length > 0) {
                const file = files[0];
                if (preview) {
                    preview.innerHTML = `
                        <span style="font-size: 1.5rem;">📄</span>
                        <div>
                            <div style="font-weight: 600;">${file.name}</div>
                            <div style="font-size: 0.8rem; color: #777;">${(file.size / 1024).toFixed(2)} KB</div>
                        </div>
                    `;
                    preview.classList.add('active');
                }
            }
        }
    });
}
