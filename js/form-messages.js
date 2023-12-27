import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);
const closeButton = errorElement.querySelector('.error__button');

const onMessageSuccessEscapeDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeSuccessSendMessage();
  }
};

const onMouseSuccessClickDown = () => {
  // eslint-disable-next-line no-use-before-define
  closeSuccessSendMessage();
};

const openSuccessSendMessage = () => {
  body.appendChild(successElement);

  body.addEventListener('keydown', onMessageSuccessEscapeDown);
  successElement.addEventListener('click', onMouseSuccessClickDown);
};

const closeSuccessSendMessage = () => {
  body.removeChild(successElement);

  body.removeEventListener('keydown', onMessageSuccessEscapeDown);
  successElement.removeEventListener('mousedown', onMouseSuccessClickDown);
};

const onMessageErrorEscapeDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeErrorSendMessage();
  }
};

const onMouseErrorClickDown = () => {
  // eslint-disable-next-line no-use-before-define
  closeErrorSendMessage();
};

const openErrorSendMessage = () => {
  body.appendChild(errorElement);

  closeButton.addEventListener('click', onMouseErrorClickDown);
  body.addEventListener('keydown', onMessageErrorEscapeDown);
};

const closeErrorSendMessage = () => {
  body.removeChild(errorElement);

  body.removeEventListener('keydown', onMessageErrorEscapeDown);
  errorElement.removeEventListener('mousedown', onMouseErrorClickDown);
};

export { openSuccessSendMessage, openErrorSendMessage };
