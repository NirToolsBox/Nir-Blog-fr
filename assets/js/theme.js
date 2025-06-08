document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const setTheme = (theme) => {
        if (theme === 'dark-mode') {
            htmlElement.classList.add('dark-mode');
        } else {
            htmlElement.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', theme);
    };

    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    setTheme(savedTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = htmlElement.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
            const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
            setTheme(newTheme);
        });
    }
});