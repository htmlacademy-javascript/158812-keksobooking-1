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

export { generateRandomInteger, generateRandomArrayElement, generateRandomNumber, generatePhotoId, createRandomArray, setElementsDisabled };
