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

const onMessageKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const onMessageClick = () => {
  hideMessage();
  document.removeEventListener('click', onMessageClick);
};

function hideMessage () {
  document.querySelector('.modal').remove();
  document.removeEventListener('keydown', onMessageKeydown);
}

const openSuccessMessage = () => {
  bodyElement.append(successElement);
  successElement.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onMessageKeydown);
};

const openErrorMessage = () => {
  bodyElement.append(errorElement);
  errorElement.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onMessageKeydown);
};

export { openSuccessMessage, openErrorMessage };
