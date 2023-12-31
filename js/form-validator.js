import { Title, MAX_PRICE_PER_NIGHT, roomsCapacity, minPrice } from './const.js';

const formElement = document.querySelector('.ad-form');
const titleElement = formElement.querySelector('#title');
const priceElement = document.querySelector('#price');
const typeElement = document.querySelector('#type');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
});

//Валидация заголовка объявления
const validateAdTitle = (value) => value.length >= Title.MIN && value.length <= Title.MAX;

pristine.addValidator(
  titleElement,
  validateAdTitle,
  `От ${Title.MIN} до ${Title.MAX} символов`, 2, true
);

//Валидация цены за ночь и типа жилья
const validatePrice = (value) => {
  const unit = document.querySelector('#type');
  return value >= minPrice[unit.value] && value <= MAX_PRICE_PER_NIGHT;
};

const getTypeErrorMessage = () => {
  const unit = document.querySelector('#type');
  return `Минимальная цена за ночь: ${minPrice[unit.value]}`;
};

pristine.addValidator(
  priceElement,
  validatePrice,
  getTypeErrorMessage
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

//Валидация количества комнат и гостей
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

//Валидация времени заезда и выезда
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
