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

const onMessageKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const closeMessageClick = () => {
  hideMessage();
  document.removeEventListener('click', closeMessageClick);
};

function hideMessage () {
  document.querySelector('.modal').remove();
  document.removeEventListener('keydown', onMessageKeyDown);
}

const openSuccessMessage = () => {
  bodyElement.append(successElement);
  successElement.addEventListener('click', closeMessageClick);
  document.addEventListener('keydown', onMessageKeyDown);
};

const openErrorMessage = () => {
  bodyElement.append(errorElement);
  errorElement.addEventListener('click', closeMessageClick);
  document.addEventListener('keydown', onMessageKeyDown);
};

export { openSuccessMessage, openErrorMessage };
