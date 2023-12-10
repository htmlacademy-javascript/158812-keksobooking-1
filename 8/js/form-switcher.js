import { setElementsDisabled } from './utils.js';
import { sliderPriceInit } from './slider.js';
import { pristine, adPrice } from './form-validator.js';

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('select, fieldset');

const setFormActive = () => {
  adForm.classList.remove('ad-form--disabled');
  setElementsDisabled(adFormElements, false);

  const validate = () => pristine.validate(adPrice);
  sliderPriceInit(validate);
};

const setFormInactive = () => {
  adForm.classList.add('ad-form--disabled');
  setElementsDisabled(adFormElements, true);
};

export { setFormActive, setFormInactive };
