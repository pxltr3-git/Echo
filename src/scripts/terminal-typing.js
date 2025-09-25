document.addEventListener('DOMContentLoaded', () => {
    const typedTextSpan = document.getElementById("typed-text");
    const terminalOutput = document.getElementById("terminal-output");
    if (!typedTextSpan || !terminalOutput) return;

    const textToType = "./initialize-portfolio.sh";
    const typeSpeed = 100;

    function type() {
        let i = 0;
        terminalOutput.style.display = 'none'; // Hide output initially
        const typeInterval = setInterval(() => {
            typedTextSpan.textContent += textToType.charAt(i);
            i++;
            if (i > textToType.length - 1) {
                clearInterval(typeInterval);
                // After typing, show the output
                setTimeout(() => {
                    terminalOutput.style.display = 'block';
                }, 300);
            }
        }, typeSpeed);
    }
    
    // Small delay before starting
    setTimeout(() => type(), 500);
});