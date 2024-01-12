import { Title, MAX_PRICE_PER_NIGHT, roomsCapacity, minPrice } from './const.js';

const formElement = document.querySelector('.ad-form');
const titleElement = formElement.querySelector('#title');
const priceElement = document.querySelector('#price');
const typeElement = document.querySelector('#type');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');

const validatePriceElement = (value) => value >= minPrice[typeElement.value] && value <= MAX_PRICE_PER_NIGHT;

const getTypeErrorMessageElement = () => `Минимальная цена за ночь: ${minPrice[typeElement.value]}`;

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
});

const validateAdTitle = (value) => value.length >= Title.MIN && value.length <= Title.MAX;

pristine.addValidator(
  titleElement,
  validateAdTitle,
  `От ${Title.MIN} до ${Title.MAX} символов`, 2, true
);

pristine.addValidator(
  priceElement,
  validatePriceElement,
  getTypeErrorMessageElement
);

const setMinPrice = (type, price) => {
  price.min = minPrice[type.value];
  price.placeholder = minPrice[type.value];
};

const onAdTypeChange = () => {
  setMinPrice(typeElement, priceElement);
  pristine.validate(priceElement);
};

typeElement.addEventListener('change', () => {
  onAdTypeChange();
});

const validateCapacity = () => roomsCapacity[roomNumberElement.value].includes(capacityElement.value);

const getCapacityErrorMessage = () => 'Выберите другое кол-во гостей или комнат';

roomNumberElement.addEventListener('change', () => {
  pristine.validate(capacityElement);
});

pristine.addValidator(
  capacityElement,
  validateCapacity,
  getCapacityErrorMessage
);

const setEqualSelectValues = (one, two) => {
  two.value = one.value;
};

timeInElement.addEventListener('change', () => {
  setEqualSelectValues(timeInElement, timeOutElement);
});

timeOutElement.addEventListener('change', () => {
  setEqualSelectValues(timeOutElement, timeInElement);
});

export { pristine, priceElement, formElement };
