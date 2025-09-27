document.addEventListener('DOMContentLoaded', () => {
    const typedTextSpan = document.getElementById("typed-text");
    const terminalOutputDiv = document.getElementById("terminal-output");
    const terminalOverlay = document.getElementById("terminal-overlay");
    const mainContent = document.getElementById("main-content");

    if (!typedTextSpan || !terminalOutputDiv || !terminalOverlay || !mainContent) return;

    const commands = [
        "boot --verbose --init-system",
        "fsck -a /dev/echo0",
        "systemctl status echo-core.service",
        "echo 'Welcome, Operator. System online.'"
    ];
    let commandIndex = 0;
    const typeSpeed = 20; // Typing speed
    const outputDelay = 500; // Delay before showing output

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
        // Initial boot command
        await sleep(500);
        await typeCommand(commands[commandIndex]);
        commandIndex++;
        await sleep(outputDelay);

        await displayOutput(`
            <p class="text-gray-400">BIOS: Initializing...</p>
            <p class="text-gray-400">RAM: 16384MB OK</p>
            <p class="text-gray-400">CPU: Intel(R) Core(TM) i9-9900K CPU @ 3.60GHz</p>
            <p class="text-green-400">Booting from primary drive...</p>
        `);
        await sleep(1000);

        // Filesystem check
        await typeCommand(commands[commandIndex]);
        commandIndex++;
        await sleep(outputDelay);

        await displayOutput(`
            <p class="text-green-400">/dev/echo0: clean, 123456/789012 files, 9876543/12345678 blocks</p>
            <p class="text-green-400">Filesystem check complete. No errors found.</p>
        `);
        await sleep(1000);

        // Service status
        await typeCommand(commands[commandIndex]);
        commandIndex++;
        await sleep(outputDelay);

        await displayOutput(`
            <p class="text-green-400">echo-core.service - Echo Core System</p>
            <p class="text-green-400">   Loaded: loaded (/etc/systemd/system/echo-core.service; enabled; vendor preset: enabled)</p>
            <p class="text-green-400">   Active: active (running) since Fri 2025-09-26 08:00:00 UTC; 1min 30s ago</p>
            <p class="text-blue-400"> Main PID: 1001 (echo-core)</p>
            <p class="text-blue-400">    Tasks: 5 (limit: 4915)</p>
            <p class="text-blue-400">   Memory: 12.5M</p>
            <p class="text-blue-400">   CGroup: /system.slice/echo-core.service</p>
            <p class="text-green-400">System services are fully operational.</p>
        `);
        await sleep(1000);

        // Final welcome message
        await typeCommand(commands[commandIndex]);
        commandIndex++;
        await sleep(outputDelay);

        await displayOutput(`
            <pre class="text-green-400">
███████╗██╗  ██╗███████╗ ██████╗ ██████╗
██╔════╝██║  ██║██╔════╝██╔═══██╗██╔══██╗
█████╗  ███████║█████╗  ██║   ██║██████╔╝
██╔══╝  ██╔══██║██╔══╝  ██║   ██║██╔══██╗
███████╗██║  ██║███████╗╚██████╔╝██║  ██║
╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝
            </pre>
            <p class="text-green-400 text-xl font-bold">Welcome, Operator. System online.</p>
            <p class="text-gray-400">Loading main interface...</p>
        `);
        await sleep(1500);

        // Hide terminal overlay and show main content
        terminalOverlay.style.opacity = '0';
        await sleep(500); // Wait for fade out
        terminalOverlay.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.style.opacity = '1';
    };

    runSequence();
});