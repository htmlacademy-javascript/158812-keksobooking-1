const SIMILAR_OFFERS_COUNT = 10;
const TITLES = ['Квартира', 'Бунгало', 'Отель'];
const DESCRIPTIONS = ['Описание помещения 01', 'Описание помещения 02', 'Описание помещения 03'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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

const createOffer = () => ({
  author: {
    avatar: `img/avatars/user${generatePhotoId()}.png`,
  },
  offer: {
    title: generateRandomArrayElement(TITLES),
    address: String(generateRandomNumber(35.65000, 35.70000, 5), generateRandomNumber(139.70000, 139.80000, 5)),
    price: generateRandomInteger(100, 1000),
    type: generateRandomArrayElement(TYPES),
    rooms: generateRandomInteger(1, 100),
    guests: generateRandomInteger(1, 3),
    checkin: generateRandomArrayElement(TIMES),
    checkout: generateRandomArrayElement(TIMES),
    features: createRandomArray(FEATURES),
    description: generateRandomArrayElement(DESCRIPTIONS),
    photos: generateRandomArrayElement(PHOTOS),
    location: {
      lat: generateRandomNumber(35.65000, 35.70000, 5),
      lng: generateRandomNumber(139.70000, 139.80000, 5)
    }
  },
});

Array.from({length: SIMILAR_OFFERS_COUNT}, createOffer);
