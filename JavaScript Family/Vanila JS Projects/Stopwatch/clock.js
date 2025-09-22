const minutesElem = document.getElementById("minutes");
const secondsElem = document.getElementById("seconds");
const millisecondsElem = document.getElementById("milliseconds");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("resetBtn");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;



function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, '0');

    minutesElem.textContent = minutes;
    secondsElem.textContent = seconds;
    millisecondsElem.textContent = milliseconds;
}


startBtn.addEventListener("click", () => {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
    }
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    millisecondsEl.textContent = "00";
});

// Initialize display
minutesElem.textContent = "00";
secondsElem.textContent = "00";
millisecondsElem.textContent = "00";