import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtnEL = document.querySelector('[data-start]');
startBtnEL.setAttribute('disabled', true);
const numberOfDaysEl = document.querySelector('[data-days]');
const numberOfHoursEl = document.querySelector('[data-hours]');
const numberOfMinuteEl = document.querySelector('[data-minutes]');
const numberOfSecondEL = document.querySelector('[data-seconds]');
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange() {
    startBtnEL.setAttribute('disabled', true);
  },
  onClose(selectedDates) {
    checkSelectedDate(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function checkSelectedDate(selectedDate) {
  if (selectedDate < Date.now()) {
    window.alert('Please choose a date in the future');
    startBtnEL.setAttribute('disabled', true);
  } else {
    startBtnEL.removeAttribute('disabled');
    startTimer(selectedDate);
  }
}

function startTimer(selectedDate) {
  startBtnEL.addEventListener('click', () => {
    startBtnEL.setAttribute('disabled', true);
    let timeDifference = selectedDate - Date.now();
    timerId = setInterval(() => {
      if (timeDifference > 1000) {
        timeDifference -= 1000;
        updateTimerOnPage(timeDifference);
      } else {
        clearInterval(timerId);
      }
    }, 1000);
  });
}

function updateTimerOnPage(value) {
  const { days, hours, minutes, seconds } = convertMs(value);
  numberOfDaysEl.textContent = addLeadingZero(days);
  numberOfHoursEl.textContent = addLeadingZero(hours);
  numberOfMinuteEl.textContent = addLeadingZero(minutes);
  numberOfSecondEL.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
