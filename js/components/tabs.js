export function initTabs() {
    const tabGroups = document.querySelectorAll('.tabs-container');

    tabGroups.forEach(group => {
        const tabs = group.querySelectorAll('.tab-btn');
        const contents = group.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents in this group
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab
                tab.classList.add('active');

                // Show corresponding content
                const target = group.querySelector(tab.dataset.target);
                if (target) {
                    target.classList.add('active');
                }
            });
        });
    });
}
