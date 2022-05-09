import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

const KEY = 'feedback-form-state';

const formData = { email: '', message: '' };

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

const createFormData = () => {
  const email = refs.email.value;
  const message = refs.message.value;

  formData.email = email;
  formData.message = message;
};

const renderPage = () => {
  const checkFormData = loadFormData(KEY);

  if (checkFormData) {
    refs.email.value = checkFormData.email;
    refs.message.value = checkFormData.message;
  }
};

const handleFormInput = () => {
  createFormData();

  saveFormData(KEY, formData);
};

const handleFormSubmit = event => {
  event.preventDefault();

  createFormData();

  console.log(formData);

  localStorage.removeItem(KEY);

  event.currentTarget.reset();
};

renderPage();

refs.form.addEventListener('input', throttle(handleFormInput, 500));
refs.form.addEventListener('submit', handleFormSubmit);
