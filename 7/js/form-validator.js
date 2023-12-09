const adForm = document.querySelector('.ad-form');
const adTitle = adForm.querySelector('#title');
const adPrice = document.querySelector('#price');
const adType = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE_PER_NIGHT = 100000;

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
});

//Валидация заголовка объявления
const validateAdTitle = (value) => value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE;

pristine.addValidator(
  adTitle,
  validateAdTitle,
  `От ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов`, 2, true
);


//Валидация цены за ночь и типа жилья
const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

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
const roomsCapacity = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

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
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    //console.log('Можно отправлять');
  } else {
    //console.log('Форма невалидна');
  }
});
