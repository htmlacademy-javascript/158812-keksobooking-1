import { pristine, formElement, priceElement } from'./validator.js';
import { openSuccessMessage, openErrorMessage } from './messages.js';
import { sendData } from './api.js';
import { resetMainPin, addressElement } from './map.js';
import { getLocationToString, setElementsDisabled } from './utils.js';
import { mainPoint, NUMBER_AFTER_POINT } from './const.js';
import { clearAllLoadPhotos } from './upload-images.js';
import { resetSliderPrice, initSliderPrice } from './slider.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const resetFormButton = document.querySelector('.ad-form__reset');
const submitButton = document.querySelector('.ad-form__submit');
const formElements = formElement.querySelectorAll('select, fieldset');

const setFormActive = () => {
  formElement.classList.remove('ad-form--disabled');
  setElementsDisabled(formElements, false);

  const validate = () => pristine.validate(priceElement);
  initSliderPrice(validate);
};

const setFormInactive = () => {
  formElement.classList.add('ad-form--disabled');
  setElementsDisabled(formElements, true);
};

const resetForm = (evt) => {
  evt.preventDefault();
  pristine.reset();
  clearAllLoadPhotos();
  formElement.reset();
  addressElement.value = getLocationToString(mainPoint, NUMBER_AFTER_POINT);
  resetMainPin();
  resetSliderPrice();
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
  addressElement.readOnly = true;
  setFormActive();
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then((onSuccess) => {
          openSuccessMessage(onSuccess);
          resetForm(evt);
        })
        .catch((err) => {
          openErrorMessage(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};

export { initForm, setFormActive, setFormInactive };
