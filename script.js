document.addEventListener('DOMContentLoaded', () => {
    let timers = [];

    const startButton = document.getElementById('start-timer');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const timersDisplay = document.getElementById('timers-display');

    // Function to create a new timer
    startButton.addEventListener('click', () => {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

        if (totalSeconds > 0) {
            createNewTimer(totalSeconds);
        } else {
            alert('Please enter a valid time.');
        }

        // Clear the input fields
        hoursInput.value = minutesInput.value = secondsInput.value = '';
    });

    function createNewTimer(totalSeconds) {
        const timerId = timers.length;
        const timer = {
            id: timerId,
            timeLeft: totalSeconds,
            intervalId: setInterval(() => {
                updateTimer(timer);
            }, 1000),
        };
        timers.push(timer);
        displayNewTimer(timer);
    }

    function updateTimer(timer) {
        if (timer.timeLeft > 0) {
            timer.timeLeft -= 1;
            const timerElement = document.getElementById(`timer-${timer.id}`);
            timerElement.querySelector('.time-left').innerText = formatTime(timer.timeLeft);
        } else {
            endTimer(timer);
        }
    }

    function endTimer(timer) {
        clearInterval(timer.intervalId);
        const timerElement = document.getElementById(`timer-${timer.id}`);
        timerElement.classList.add('ended');
        timerElement.querySelector('.stop-button').remove();
        new Audio('alarm.mp3').play(); // Replace with the path to your sound file
    }

    function displayNewTimer(timer) {
        const timerDiv = document.createElement('div');
        timerDiv.classList.add('timer-item');
        timerDiv.setAttribute('id', `timer-${timer.id}`);
        timerDiv.innerHTML = `
            <span class="time-left">${formatTime(timer.timeLeft)}</span>
            <button class="stop-button">Stop Timer</button>
        `;

        const stopButton = timerDiv.querySelector('.stop-button');
        stopButton.addEventListener('click', () => stopTimer(timer));

        timersDisplay.appendChild(timerDiv);
    }

    function stopTimer(timer) {
        clearInterval(timer.intervalId);
        const timerElement = document.getElementById(`timer-${timer.id}`);
        timerElement.remove();
        timers = timers.filter(t => t.id !== timer.id);
    }

    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
});
