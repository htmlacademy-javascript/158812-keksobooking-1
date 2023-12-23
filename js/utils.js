import { TIMEOUT_DELAY } from './const.js';

//получить целое случайное число из диапазона
const generateRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//получить случайный элемент из массива
const generateRandomArrayElement = (elements) => elements[generateRandomInteger(0, elements.length - 1)];

//получить случайное число с плавающей точкой из переданного диапазона
const generateRandomNumber = (min, max, numberSymbols) => {
  const randomNumber = min + Math.random() * (max - min);
  return randomNumber.toFixed(numberSymbols);
};

//получить уникальный адрес изображения аватара
const createIdGenerator = () => {
  let currentId = 0;
  return () => {
    currentId += 1;
    if (currentId < 10) {
      return `0${currentId}`;
    }
    return `${currentId}`;
  };
};
const generatePhotoId = createIdGenerator();

//получить массив случайной длины
const createRandomArray = (values) => values.sort(() => 0.5 - Math.random()).slice(0, generateRandomInteger(1, values.length));

const setElementsDisabled = (elements, isDisabled) => {
  elements.forEach((element) => {
    element.disabled = isDisabled;
  });
};

const getLocationToString = (object, number) => {
  let {lat, lng} = object;
  lat = Number(lat.toFixed(number));
  lng = Number(lng.toFixed(number));
  return `${lat}, ${lng}`;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.right = 0;
  alertContainer.style.top = 0;
  alertContainer.style.padding = '20px';
  alertContainer.style.fontSize = '16px';
  alertContainer.style.color = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

export { generateRandomInteger, generateRandomArrayElement, generateRandomNumber, generatePhotoId, createRandomArray, setElementsDisabled, getLocationToString, showAlert, isEscapeKey, debounce, throttle };
