/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const timeDisplay = document.getElementById('time-display') as HTMLDivElement;
    const hoursInput = document.getElementById('hours-input') as HTMLInputElement;
    const minutesInput = document.getElementById('minutes-input') as HTMLInputElement;
    const secondsInput = document.getElementById('seconds-input') as HTMLInputElement;
    const startPauseButton = document.getElementById('start-pause-button') as HTMLButtonElement;
    const resetButton = document.getElementById('reset-button') as HTMLButtonElement;

    // Timer state
    let timerInterval: number | null = null;
    let totalSeconds = 0;

    const updateDisplay = () => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        timeDisplay.textContent = 
            `${String(hours).padStart(2, '0')}:` +
            `${String(minutes).padStart(2, '0')}:` +
            `${String(seconds).padStart(2, '0')}`;
    };

    const toggleInputs = (enabled: boolean) => {
        hoursInput.disabled = !enabled;
        minutesInput.disabled = !enabled;
        secondsInput.disabled = !enabled;
    };

    const handleStartPauseClick = () => {
        // If timer is running, pause it.
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            startPauseButton.textContent = 'Start';
            startPauseButton.setAttribute('aria-label', 'Start timer');
            return;
        }

        // If starting from scratch (no time left), get values from inputs.
        if (totalSeconds <= 0) {
            const h = parseInt(hoursInput.value) || 0;
            const m = parseInt(minutesInput.value) || 0;
            const s = parseInt(secondsInput.value) || 0;
            totalSeconds = (h * 3600) + (m * 60) + s;
        }

        if (totalSeconds <= 0) {
            alert("Please set a time greater than zero.");
            return;
        }
        
        // Start or resume the timer
        toggleInputs(false);
        startPauseButton.textContent = 'Pause';
        startPauseButton.setAttribute('aria-label', 'Pause timer');
        
        timerInterval = window.setInterval(() => {
            totalSeconds--;
            updateDisplay();

            if (totalSeconds <= 0) {
                clearInterval(timerInterval!);
                timerInterval = null;
                alert("Time's up!");
                resetTimer(); // Reset to initial state after finish
            }
        }, 1000);
    };
    
    const resetTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        totalSeconds = 0;
        hoursInput.value = '';
        minutesInput.value = '';
        secondsInput.value = '';
        toggleInputs(true);
        startPauseButton.textContent = 'Start';
        startPauseButton.setAttribute('aria-label', 'Start timer');
        updateDisplay();
    };

    // Event Listeners
    startPauseButton.addEventListener('click', handleStartPauseClick);
    resetButton.addEventListener('click', resetTimer);

    // Initial state
    updateDisplay();
});
