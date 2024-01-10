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

const removeMessageElement = () => successElement.remove() || errorElement.remove();

const hideMessage = () => {
  document.removeEventListener('click', onMessageClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessageElement();
    hideMessage();
  }
}

function onMessageClick () {
  removeMessageElement();
  hideMessage();
}

const openSuccessMessage = () => {
  bodyElement.append(successElement);
  document.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const openErrorMessage = () => {
  bodyElement.append(errorElement);
  document.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { openSuccessMessage, openErrorMessage };
