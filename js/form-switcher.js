import { setElementsDisabled } from './utils.js';

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('select, fieldset');

const setFormActive = () => {
  adForm.classList.remove('ad-form--disabled');
  setElementsDisabled(adFormElements, false);
};

const setFormInactive = () => {
  adForm.classList.add('ad-form--disabled');
  setElementsDisabled(adFormElements, true);
};

export { setFormActive, setFormInactive };
