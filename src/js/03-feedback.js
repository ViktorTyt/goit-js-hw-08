import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const KEY = 'feedback-form-state';
const formData = { email: '', message: '' };

const createFormData = handleEvent => {
  const formElements = handleEvent.currentTarget.elements;
  const email = formElements.email.value;
  const message = formElements.message.value;
  formData.email = email;
  formData.message = message;
};

const handleFormInput = event => {
  createFormData(event);

  saveFormData(KEY, formData);
};

const saveFormData = (key, value) => {
  try {
    const saveData = JSON.stringify(value);
    localStorage.setItem(key, saveData);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const loadFormData = key => {
  try {
    const getData = localStorage.getItem(key);
    return getData === null ? undefined : JSON.parse(getData);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const renderPage = () => {
  const checkFormData = loadFormData(KEY);
  console.log(checkFormData);
  if (checkFormData) {
    form.email.value = checkFormData.email;
    form.message.value = checkFormData.message;
  }
};

const handleFormSubmit = event => {
  event.preventDefault();

  createFormData(event);

  console.log(formData);

  event.currentTarget.reset();
  localStorage.removeItem(KEY);
};

renderPage();

form.addEventListener('input', throttle(handleFormInput, 500));
form.addEventListener('submit', handleFormSubmit);
