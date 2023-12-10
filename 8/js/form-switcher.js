import { setElementsDisabled } from './utils.js';
import { sliderPriceInit } from './slider.js';

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('select, fieldset');

const setFormActive = () => {
  adForm.classList.remove('ad-form--disabled');
  setElementsDisabled(adFormElements, false);
  sliderPriceInit();
};

const setFormInactive = () => {
  adForm.classList.add('ad-form--disabled');
  setElementsDisabled(adFormElements, true);
};

export { setFormActive, setFormInactive };
