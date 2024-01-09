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
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onMessageClick () {
  hideMessage();
  document.removeEventListener('click', onMessageClick);
}

const openSuccessMessage = () => {
  bodyElement.append(successElement);
  successElement.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const openErrorMessage = () => {
  bodyElement.append(errorElement);
  errorElement.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { openSuccessMessage, openErrorMessage };
