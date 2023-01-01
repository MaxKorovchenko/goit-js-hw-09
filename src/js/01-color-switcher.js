const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

const DELAY = 1000;
let id = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

stopBtn.disabled = true;

function onStartBtnClick(evt) {
  id = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);

  evt.currentTarget.disabled = true;
  evt.currentTarget.nextElementSibling.disabled = false;
}

function onStopBtnClick(evt) {
  clearInterval(id);

  evt.currentTarget.previousElementSibling.disabled = false;
  evt.currentTarget.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
