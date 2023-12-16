import { adPrice } from'./form-validator.js';
import { MAX_PRICE_PER_NIGHT } from './const.js';

const sliderElement = document.querySelector('.ad-form__slider');
const resetButton = document.querySelector('.ad-form__reset');

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
    adPrice.value = parseInt(sliderValue, 10);
    setTimeout(cb, 100);
  });

  adPrice.addEventListener('input', () => {
    sliderElement.noUiSlider.set(adPrice.value);
  });
};

resetButton.addEventListener('click', () => {
  sliderElement.noUiSlider.reset();
});

export { sliderPriceInit };
