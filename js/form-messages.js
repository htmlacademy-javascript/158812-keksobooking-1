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

const onEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bodyElement.classList.remove('modal-show');
    messageRemoveElement();
    document.removeEventListener('keydown', onEscapeKeyDown);
  }
};

const closeMessage = () => {
  bodyElement.classList.remove('modal-show');
  messageRemoveElement();
  document.removeEventListener('keydown', onEscapeKeyDown);
  document.removeEventListener('click', closeMessage);
};

const openSuccessSendMessage = () => {
  bodyElement.append(successTemplate);
  bodyElement.classList.add('modal-show');
  document.addEventListener('keydown', onEscapeKeyDown);
  document.addEventListener('click', closeMessage);
};

const openErrorSendMessage = () => {
  bodyElement.append(errorTemplate);
  bodyElement.classList.add('modal-show');
  document.addEventListener('keydown', onEscapeKeyDown);
  errorTemplate.addEventListener('click', closeMessage);
};

export { openSuccessSendMessage, openErrorSendMessage };
