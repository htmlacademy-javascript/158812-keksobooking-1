import { setElementsDisabled } from './utils.js';
import { sliderPriceInit } from './slider.js';
import { pristine, priceElement } from './form-validator.js';

const formElement = document.querySelector('.ad-form');
const formElements = formElement.querySelectorAll('select, fieldset');

const setFormActive = () => {
  formElement.classList.remove('ad-form--disabled');
  setElementsDisabled(formElements, false);

  const validate = () => pristine.validate(priceElement);
  sliderPriceInit(validate);
};

const setFormInactive = () => {
  formElement.classList.add('ad-form--disabled');
  setElementsDisabled(formElements, true);
};

export { setFormActive, setFormInactive };
