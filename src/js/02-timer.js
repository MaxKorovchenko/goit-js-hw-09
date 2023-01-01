import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const mins = document.querySelector('span[data-minutes]');
const secs = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    const currentDateMs = new Date().getTime();
    const selectedDatesMs = selectedDates[0].getTime();
    const diffMs = selectedDatesMs - currentDateMs;

    if (diffMs < 0) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }

    Notiflix.Notify.success('great choice');

    startBtn.disabled = false;

    startBtn.addEventListener('click', onStartBtnClick);

    function onStartBtnClick() {
      const id = setInterval(() => {
        const diff = selectedDatesMs - new Date().getTime();
        const timeLeft = convertMs(diff);

        days.textContent = addLeadingZero(timeLeft.days);
        hours.textContent = addLeadingZero(timeLeft.hours);
        mins.textContent = addLeadingZero(timeLeft.minutes);
        secs.textContent = addLeadingZero(timeLeft.seconds);

        // if (
        //   secs.textContent == 0 &&
        //   mins.textContent == 0 &&
        //   hours.textContent == 0 &&
        //   days.textContent == 0
        // ) {
        //   clearInterval(id);
        // }

        if (Math.floor(diff / 1000) === 0) {
          clearInterval(id);
          Notiflix.Notify.info('time is over');
        }
      }, 1000);
    }
  },
};

flatpickr('#datetime-picker', options);

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
  return value.toString().padStart(2, '0');
}
