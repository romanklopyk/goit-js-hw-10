import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';


const $input = document.querySelector('#datetime-picker');
const $button = document.querySelector('[data-start]');

let intervalId = null;
let targetDate = null;

disableEl($button);

const timerElements = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        targetDate = selectedDates;
        if (selectedDates.length && (selectedDates[0].getTime()) > new Date().getTime() ) {
            enableEl($button);
        }
        else {
            disableEl($button);
            showMessage('Please select a date in the future')
            clearInterval(intervalId);
            renderTimer()
        }
    },
};

const inst = flatpickr($input, options);

$button.addEventListener('click', (e) => {
    e.preventDefault();
    if (targetDate) {
        handleTimer(targetDate);
    } else {
        showMessage('Please select a date');
    }
})

function handleTimer(selectedDates) {
    clearInterval(intervalId);
    const target = selectedDates[0].getTime();
    intervalId = setInterval(() => {
        if (new Date().getTime() - target >= 0) {
            clearInterval(intervalId);
            renderTimer({ days: 0, hours: 0, minutes: 0, seconds: 0})
            return;
        }
        const time = convertMs(target - new Date().getTime());
        renderTimer(time);
    }, 1000);
}

function renderTimer(time = {}) {
    const { days = 0, hours = 0, minutes = 0, seconds = 0 } = time;
    timerElements.days.textContent = String(days).padStart(2, '0');
    timerElements.hours.textContent = String(hours).padStart(2, '0');
    timerElements.minutes.textContent = String(minutes).padStart(2, '0');
    timerElements.seconds.textContent = String(seconds).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function showMessage(mess) {
    const iziOptions = {
        position: 'topRight',
        theme: 'dark',
        timeout: 5000,
        backgroundColor: 'red',
        messageColor: 'white',
        messageSize: 14,
        close: true,
    };

    iziToast.error({
        message: mess,
        ...iziOptions,
    });
}

function disableEl(el) {
    el.disabled = true;
    el.classList.add('disabled');
}

function enableEl(el) {
    el.disabled = false;
    el.classList.remove('disabled');
}