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
delayInputEl.value = 1000;
stepInputEl.value = 500;
amountInputEl.value = 5;
createPromisesBtnEl.addEventListener('click', createPromises);

function createPromises(event) {
  event.preventDefault();

  for (let i = 0; i < amountInputEl.value; i += 1) {
    let delay = Number(delayInputEl.value) + stepInputEl.value * i;
    let position = i + 1;
    // createPromise(position, delay);////////
    ////////////////
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    ///////////////

    console.log('delay: ', delay);
    console.log('position: ', position);

    // const promise = new Promise((createPromise, reject) => {
    //   setTimeout(() => {
    //     console.log('amountInputEl.value: ', amountInputEl.value);
    //     console.log('i: ', i);
    //     // createPromise();
    //   }, delay);
    // });
  }
}
