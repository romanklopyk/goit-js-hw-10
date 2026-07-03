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
                resolve();
            } else if (state === 'rejected') {
                reject();
            }
        }, delay);
    })
    formPromise.then(() => {
        iziToast.success({
            message: 'Form submitted successfully',
            position: 'topRight',

        });
    }).catch(() => {
        iziToast.error({
            message: 'Form submission failed',
            position: 'topRight',
        })
    })
}