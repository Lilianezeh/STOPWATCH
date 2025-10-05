let startTime = 0;
let stopTime = 0
let elapsedTime = 0;
let timerInterval;
let lastLapTime = 0;
let lapCount = 0;
let isRunning = false;

const timeDisplay = document.getElementById("time");
const msDisplay = document.getElementById("milliseconds");
const startBtn = document.getElementById("start");
const StopBtn = document.getElementById("Stop");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapsContainer = document.getElementById("laps");
const themeToggle = document.getElementById("themeToggle");

function updateDisplay(time) {
  const hrs = Math.floor(time / 3600000);
  const mins = Math.floor((time % 3600000) / 60000);
  const secs = Math.floor((time % 60000) / 1000);
  const ms = time % 1000;

  timeDisplay.textContent = `${String(hrs).padStart(2, "0")}:${String(
    mins
  ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  msDisplay.textContent = String(ms).padStart(3, "0");
}

function startTimer() {
  if (isRunning) return; //  Prevent multiple starts
  isRunning = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
  }, 10);
  startBtn.textContent = "Start";
}

function stopTimer() {
  clearInterval(timerInterval);
  StopBtn.textContent = "Stop";
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  lastLapTime = 0;
  lapCount = 0;
  updateDisplay(0);
  lapsContainer.innerHTML = "";
  startStopBtn.textContent = "Stop";
}

function recordLap() {
  if (!elapsedTime) return;
  lapCount++;
  const total = elapsedTime;
  const lapTime = total - lastLapTime;
  lastLapTime = total;

  const lapDiv = document.createElement("div");
  lapDiv.className = "lap-item";
  lapDiv.innerHTML = `
    <span>Lap ${lapCount}</span>
    <span>${new Date(lapTime).toISOString().substr(11, 8)} 
      <small>(Split: ${new Date(total).toISOString().substr(11, 8)})</small>
    </span>`;
  lapsContainer.prepend(lapDiv);
}

startBtn.addEventListener("click",startTimer );

StopBtn.addEventListener("click",  stopTimer);

lapBtn.addEventListener("click", recordLap);
resetBtn.addEventListener("click", resetTimer);

themeToggle.addEventListener("change", () => {
  document.body.dataset.theme = themeToggle.checked ? "light" : "";
});


