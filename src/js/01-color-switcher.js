function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const bodyColor = document.querySelector('body');
// const text = document.querySelector('.color');
// const btn = document.querySelector('.change-color');

const saveBtn = document.querySelector('button[data-start]');
const closeBtn = document.querySelector('button[data-stop]');

// console.log("text");

saveBtn.addEventListener('click', () => {
  const hexColor = getRandomHexColor();
  bodyColor.style.backgroundColor = hexColor;
});
