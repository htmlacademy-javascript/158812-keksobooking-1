import { Title, MAX_PRICE_PER_NIGHT, roomsCapacity, minPrice } from './const.js';

const adForm = document.querySelector('.ad-form');
const adTitle = adForm.querySelector('#title');
const adPrice = document.querySelector('#price');
const adType = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const pristine = new Pristine(adForm, {
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
  adTitle,
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
  adPrice,
  validatePrice,
  getTypeErrorMessage
);

const setMinPrice = (type, price) => {
  price.min = minPrice[type.value];
  price.placeholder = minPrice[type.value];
};

const onAdTypeChange = () => {
  setMinPrice(adType, adPrice);
  pristine.validate(adPrice);
};

adType.addEventListener('change', () => {
  onAdTypeChange();
});


//Валидация количества комнат и гостей
const validateCapacity = () => roomsCapacity[roomNumber.value].includes(capacity.value);

const getCapacityErrorMessage = () => 'Выберите другое кол-во гостей или комнат';

roomNumber.addEventListener('change', () => {
  pristine.validate(capacity);
});

pristine.addValidator(
  capacity,
  validateCapacity,
  getCapacityErrorMessage
);


//Валидация времени заезда и выезда
const setEqualSelectValues = (one, two) => {
  two.value = one.value;
};

timeIn.addEventListener('change', () => {
  setEqualSelectValues(timeIn, timeOut);
});

timeOut.addEventListener('change', () => {
  setEqualSelectValues(timeOut, timeIn);
});

adForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (isValid) {
    evt.preventDefault();
    //console.log('Можно отправлять');
  } else {
    evt.preventDefault();
    //console.log('Форма невалидна');
  }
});

export { pristine, adPrice, adType };
