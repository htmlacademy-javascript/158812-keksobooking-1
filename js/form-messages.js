import { isEscapeKey } from './utils.js';

const bodyElement = document.querySelector('body');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successElement = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);

const hideMessage = () => {
  document.querySelector('.modal').remove();
  document.removeEventListener('keydown', documentKeydownHandler);
};

function documentKeydownHandler (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function documentClickHandler () {
  hideMessage();
  document.removeEventListener('click', documentClickHandler);
}

const openSuccessMessage = () => {
  bodyElement.append(successElement);
  successElement.addEventListener('click', documentClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
};

const openErrorMessage = () => {
  bodyElement.append(errorElement);
  errorElement.addEventListener('click', documentClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
};

export { openSuccessMessage, openErrorMessage };
