document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Make "Start" active on the homepage ('/') and other links active on their respective pages.
        if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
            link.classList.add('current-page');
            link.classList.remove('opacity-50'); // Make it fully visible
        }
    });
});