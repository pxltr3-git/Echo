document.addEventListener('DOMContentLoaded', () => {
    const typedTextSpan = document.getElementById("typed-text");
    const terminalOutputDiv = document.getElementById("terminal-output");
    if (!typedTextSpan || !terminalOutputDiv) return;

    const commands = [
        "systemctl start echo-service.target",
        "echo 'Accessing secure logs...'",
        "grep -r 'critical' /var/log/echo-system/",
        "cat /etc/echo-motd"
    ];
    let commandIndex = 0;
    const typeSpeed = 70; // Faster typing for commands
    const outputDelay = 800; // Delay before showing output

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const typeCommand = async (command) => {
        typedTextSpan.textContent = ''; // Clear previous command
        let i = 0;
        return new Promise(resolve => {
            const typeInterval = setInterval(() => {
                typedTextSpan.textContent += command.charAt(i);
                i++;
                if (i > command.length - 1) {
                    clearInterval(typeInterval);
                    resolve();
                }
            }, typeSpeed);
        });
    };

    const displayOutput = async (outputHtml) => {
        terminalOutputDiv.style.opacity = '0'; // Fade out current output
        await sleep(300); // Short delay for fade out
        terminalOutputDiv.innerHTML = outputHtml;
        terminalOutputDiv.style.display = 'block';
        terminalOutputDiv.style.opacity = '1'; // Fade in new output
    };

    const runSequence = async () => {
        // Initial command
        await sleep(500);
        await typeCommand(commands[commandIndex]);
        commandIndex++;
        await sleep(outputDelay);

        // First output
        await displayOutput(`
            <p class="text-green-400">echo-service.target loaded successfully.</p>
            <p class="text-yellow-400">Warning: Non-critical system log overflow detected. Auto-purging...</p>
            <p class="text-blue-400">Establishing secure connection to PXLTR3 mainframe...</p>
        `);
        await sleep(2000);

        // Second command
        await typeCommand(commands[commandIndex]);
        commandIndex++;
        await sleep(outputDelay);

        // Second output
        await displayOutput(`
            <p class="text-red-400">ERROR: Access denied. Insufficient privileges for /var/log/echo-system/.</p>
            <p class="text-gray-400">Attempting alternative access route...</p>
        `);
        await sleep(2000);

        // Third command
        await typeCommand(commands[commandIndex]);
        commandIndex++;
        await sleep(outputDelay);

        // Third output
        await displayOutput(`
            <p class="text-red-400">No critical anomalies found in public logs.</p>
            <p class="text-green-400">System status: OPTIMAL</p>
        `);
        await sleep(2000);

        // Final command
        await typeCommand(commands[commandIndex]);
        commandIndex++;
        await sleep(outputDelay);

        // Final output (the actual hero content)
        await displayOutput(`
            <h1 class="m-0 mb-2 font-mono font-medium text-heading text-3xl md:text-4xl lg:text-5xl">John Ogletree</h1>
            <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
                <p class="m-0 text-text-light text-base md:text-lg">Digital Creator. Problem Solver. Lifelong Learner.</p>
                <button type="submit" class="w-full inline-flex items-center justify-center rounded-md border border-heading bg-heading py-3 px-8 font-mono font-bold text-text no-underline transition-colors duration-200 hover:border-[#D36C52] hover:bg-[#D36C52] hover:text-text">Subscribe</button>
            </div>
        `);
        typedTextSpan.style.display = 'none'; // Hide the command line after sequence
    };

    runSequence();
});