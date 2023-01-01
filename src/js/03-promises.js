import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const { delay, step, amount } = evt.currentTarget.elements;

  setTimeout(() => {
    let position = 1;

    createPromise(position, delay.value)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });

    if (Number(amount.value) === 1) {
      return;
    }

    const id = setInterval(() => {
      position += 1;

      createPromise(position, delay.value)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `Fulfilled promise ${position} in ${
              Number(delay) + Number(step.value) * (position - 1)
            }ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `Rejected promise ${position} in ${
              Number(delay) + Number(step.value) * (position - 1)
            }ms`
          );
        })
        .finally(() => {
          if (position === Number(amount.value)) {
            clearInterval(id);
          }
        });
    }, step.value);
  }, delay.value);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
