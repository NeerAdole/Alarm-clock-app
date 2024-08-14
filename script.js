// Get references to DOM elements
const currentTimeElem = document.getElementById('current-time');
const alarmTimeInput = document.getElementById('alarm-time');
const alarmToneInput = document.getElementById('alarm-tone');
const setAlarmBtn = document.getElementById('set-alarm-btn');
const alarmsList = document.getElementById('alarms');

// Array to hold all the alarms
let alarms = [];

// Function to update the current time
function updateCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTimeElem.textContent = `${hours}:${minutes}:${seconds}`;
}

// Function to check alarms
function checkAlarms() {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    alarms.forEach((alarm, index) => {
        if (alarm.time === currentTime && !alarm.ringing) {
            alarm.ringing = true;
            ringAlarm(alarm);
        }
    });
}

// Function to ring the alarm
function ringAlarm(alarm) {
    alert(`Alarm ringing! Time: ${alarm.time}`);
    alarm.ringing = false;
}

// Function to render alarms list
function renderAlarms() {
    alarmsList.innerHTML = '';
    alarms.forEach((alarm, index) => {
        const li = document.createElement('li');
        li.className = 'alarm-item';
        li.innerHTML = `
            <span>${alarm.time} - ${alarm.tone}</span>
            <button class="${alarm.active ? 'off' : 'on'}" onclick="toggleAlarm(${index})">${alarm.active ? 'Off' : 'On'}</button>
        `;
        alarmsList.appendChild(li);
    });
}

// Function to toggle alarm on/off
function toggleAlarm(index) {
    alarms[index].active = !alarms[index].active;
    renderAlarms();
}

// Function to set a new alarm
setAlarmBtn.addEventListener('click', () => {
    const alarmTime = alarmTimeInput.value;
    const alarmTone = alarmToneInput.value;
    if (alarmTime) {
        alarms.push({ time: alarmTime, tone: alarmTone, active: true, ringing: false });
        renderAlarms();
    }
});

// Update the time every second
setInterval(updateCurrentTime, 1000);

// Check alarms every minute
setInterval(checkAlarms, 60000);
