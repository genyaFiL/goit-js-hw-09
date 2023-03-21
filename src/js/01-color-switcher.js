const bodyColorEl = document.querySelector('body');
const saveBtnEL = document.querySelector('[data-start]');
const stopBtnEL = document.querySelector('[data-stop]');

stopBtnEL.setAttribute('disabled', true);

saveBtnEL.addEventListener('click', () => {
  setRandomBodyColor();
  saveBtnEL.setAttribute('disabled', true);
  stopBtnEL.removeAttribute('disabled');
});

stopBtnEL.addEventListener('click', () => {
  clearInterval(timerId);
  saveBtnEL.removeAttribute('disabled');
  stopBtnEL.setAttribute('disabled', true);
});

function setRandomBodyColor() {
  timerId = setInterval(() => {
    bodyColorEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
