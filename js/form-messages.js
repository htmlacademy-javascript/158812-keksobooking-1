import { isEscapeKey } from './utils.js';

const bodyElement = document.querySelector('body');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);

const messageRemoveElement = () => successTemplate.remove() || errorTemplate.remove();

const onMessageKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bodyElement.classList.remove('modal-show');
    messageRemoveElement();
    document.removeEventListener('keydown', onMessageKeyDown);
  }
};

const closeMessage = () => {
  bodyElement.classList.remove('modal-show');
  messageRemoveElement();
  document.removeEventListener('keydown', onMessageKeyDown);
  document.removeEventListener('click', closeMessage);
};

const openSuccessMessage = () => {
  bodyElement.append(successTemplate);
  bodyElement.classList.add('modal-show');
  document.addEventListener('keydown', onMessageKeyDown);
  document.addEventListener('click', closeMessage);
};

const openErrorMessage = () => {
  bodyElement.append(errorTemplate);
  bodyElement.classList.add('modal-show');
  document.addEventListener('keydown', onMessageKeyDown);
  errorTemplate.addEventListener('click', closeMessage);
};

export { openSuccessMessage, openErrorMessage };
