import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const $form = document.querySelector('.form');

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData($form);
  handleForm(formData)

});


function handleForm(formData) {
    const { delay, state } = Object.fromEntries(formData);
    console.log(delay, state);
    const formPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else if (state === 'rejected') {
                reject(delay);
            }
        }, delay);
    })
    formPromise.then((delay) => {
        iziToast.success({
            message: `Fulfilled promise in ${delay}ms`,
            position: 'topRight',

        });
    }).catch((delay) => {
        iziToast.error({
            message: `Rejected promise in ${delay}ms`,
            position: 'topRight',
        })
    })
}