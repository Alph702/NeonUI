import { initButtons } from './components/button.js';
import { initForms } from './components/form.js';
import { Toast } from './components/toast.js';
import { Modal } from './components/modal.js';
import { initTabs } from './components/tabs.js';
import { initNavigation } from './components/navigation.js';
import { CommandPalette } from './components/command-palette.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log("NeonUI Initializing...");

    // Initialize all components
    initButtons();
    initForms();
    Modal.init();
    initTabs();
    initNavigation();
    CommandPalette.init();

    // Expose Toast to window for demo purposes
    window.Toast = Toast;

    console.log("NeonUI Ready.");
});

