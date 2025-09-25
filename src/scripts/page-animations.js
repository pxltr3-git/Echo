document.addEventListener('DOMContentLoaded', function() {
    // --- Profile Card Logic ---
    const profileCard = document.getElementById('profile-card');
    if (profileCard) {
        const animateStats = () => {
            const statValues = profileCard.querySelectorAll('.stat-value[data-value]');
            statValues.forEach(stat => {
                const finalValue = parseInt(stat.getAttribute('data-value'), 10);
                const duration = 2000;
                const startTime = performance.now();
                const animate = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    stat.textContent = Math.floor(progress * finalValue).toLocaleString();
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(profileCard);
    }

    // --- Animated Skills Logic ---
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const targetWidth = progressBar.getAttribute('data-width');
                progressBar.style.width = targetWidth;
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
});