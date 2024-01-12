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

const hideMessage = (element) => {
  document.removeEventListener('click', onMessageClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  element.remove();
};

const checkElementByRemoved = () => {
  if (bodyElement.contains(successElement)) {
    hideMessage(successElement);
  } else {
    hideMessage(errorElement);
  }
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    checkElementByRemoved();
  }
}

function onMessageClick () {
  checkElementByRemoved();
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
