import { generatePhotoId, generateRandomArrayElement, generateRandomNumber, generateRandomInteger, createRandomArray } from './utils.js';
import { TITLES, TYPES, TIMES, FEATURES, DESCRIPTIONS, PHOTOS } from './const.js';

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

const generateOffers = (offersCount) => Array.from({length: offersCount}, createOffer);

export { generateOffers };
