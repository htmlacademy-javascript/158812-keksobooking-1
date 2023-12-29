import { priceElement } from'./form-validator.js';
import { MAX_PRICE_PER_NIGHT } from './const.js';

const sliderElement = document.querySelector('.ad-form__slider');

const sliderPriceInit = (cb) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: MAX_PRICE_PER_NIGHT,
    },
    start: 0,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('slide', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    priceElement.value = parseInt(sliderValue, 10);
    setTimeout(cb, 100);
  });

  priceElement.addEventListener('input', () => {
    sliderElement.noUiSlider.set(priceElement.value);
  });
};

const resetSlider = () => {
  sliderElement.noUiSlider.reset();
};

export { sliderPriceInit, resetSlider };
