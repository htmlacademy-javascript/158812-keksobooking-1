import { pristine, formElement } from'./form-validator.js';
import { openSuccessSendMessage, openErrorSendMessage } from './form-messages.js';
import { sendData } from './api.js';
import { resetMainPin, mainPinLocation } from './map.js';
import { getLocationToString } from './utils.js';
import { mainPoint, NUMBER_AFTER_POINT } from './const.js';
import { clearAllLoadPhotos } from './load-images.js';
import { onResetSliderPriceClick } from './slider.js';
import { setFormActive } from './form-switcher.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const resetFormButton = document.querySelector('.ad-form__reset');
const submitButton = document.querySelector('.ad-form__submit');

const resetForm = (evt) => {
  evt.preventDefault();
  pristine.reset();
  clearAllLoadPhotos();
  formElement.reset();
  mainPinLocation.value = getLocationToString(mainPoint, NUMBER_AFTER_POINT);
  resetMainPin();
  onResetSliderPriceClick();
};

const onResetButtonClick = (evt) => {
  resetForm(evt);
};

resetFormButton.addEventListener('click', onResetButtonClick);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const initForm = () => {
  setFormActive();
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then((onSuccess) => {
          openSuccessSendMessage(onSuccess);
          resetForm(evt);
        })
        .catch((err) => {
          openErrorSendMessage(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};

export { initForm };
