import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

const delayInputEl = document.querySelector('input[name="delay"]');
const stepInputEl = document.querySelector('input[name="step"]');
const amountInputEl = document.querySelector('input[name="amount"]');
const createPromisesBtnEl = document.querySelector('button[type="submit"]');

// delayInputEl.value = 1000;
// stepInputEl.value = 500;
// amountInputEl.value = 5;
createPromisesBtnEl.addEventListener('click', createPromises);

function createPromises(event) {
  event.preventDefault();
  if (
    delayInputEl.value < 0 ||
    delayInputEl.value === '' ||
    stepInputEl.value < 0 ||
    stepInputEl.value === '' ||
    amountInputEl.value < 1
  ) {
    Notiflix.Notify.failure(
      'Values must be numbers, delay values must not be negative and values of amount greater than "0"'
    );
    return;
  }
  for (let i = 0; i < amountInputEl.value; i += 1) {
    const delay = Number(delayInputEl.value) + stepInputEl.value * i;
    const position = i + 1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
