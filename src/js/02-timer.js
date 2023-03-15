import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let timeDifference = 0;
let timerId = null;
let formatDate = null;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateDifference(selectedDates[0]);
  },
};

startBtn.addEventListener('click', onBtnStart);

flatpickr(dateInput, options);

startBtn.setAttribute('disabled', true);

function onBtnStart() {
  timerId = setInterval(startTimer, 1000);
}

function dateDifference(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    return alert('Please choose a date in the future');
  }

  timeDifference = selectedDates.getTime() - currentDate;
  startBtn.removeAttribute('disabled');
}

function startTimer() {
  startBtn.setAttribute('disabled', true);
  dateInput.setAttribute('disabled', true);

  timeDifference -= 1000;

  formatDate = convertMs(timeDifference);

  seconds.textContent = formatDate.seconds;
  minutes.textContent = formatDate.minutes;
  hours.textContent = formatDate.hours;
  days.textContent = formatDate.days;

  if (
    seconds.textContent <= 0 &&
    minutes.textContent <= 0 &&
    hours.textContent <= 0 &&
    days.textContent <= 0
  ) {
      clearInterval(timerId);
      dateInput.removeAttribute('disabled');
    return;
  }
}
