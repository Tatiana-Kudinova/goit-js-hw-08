import throttle from 'lodash.throttle';
const form = document.querySelector(`.feedback-form`);

const FORM_KEY = `feedback - form - state`;
const formData = {};

form.addEventListener(`submit`, onFormSubmit);

form.addEventListener(
  `input`,
  throttle(function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
    //console.log(formData);
    localStorage.setItem(FORM_KEY, JSON.stringify(formData));
  }, 500)
);
const savedData = JSON.parse(localStorage.getItem(FORM_KEY));
console.log(savedData);

storageData();

function storageData(email, message) {
  if (savedData) {
    form.email.value = savedData.email;
    form.message.value = savedData.message;
    // console.log(savedData.message);
    //console.log(savedData.email);
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.target.reset();
  localStorage.removeItem(FORM_KEY);
}
