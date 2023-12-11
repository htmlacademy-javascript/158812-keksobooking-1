import { adType, adPrice } from'./form-validator.js';
import { MAX_PRICE_PER_NIGHT, minPrice } from './const.js';

const sliderElement = document.querySelector('.ad-form__slider');
const resetButton = document.querySelector('.ad-form__reset');

const sliderPriceInit = (state) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: minPrice[adType.value],
      max: MAX_PRICE_PER_NIGHT,
    },
    start: minPrice[adType.value],
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('slide', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    adPrice.value = parseInt(sliderValue, 10);
    setTimeout(state, 100);
  });

  adPrice.addEventListener('input', () => {
    sliderElement.noUiSlider.set(adPrice.value);
  });
};

resetButton.addEventListener('click', () => {
  sliderElement.noUiSlider.reset();
});

export { sliderPriceInit };
