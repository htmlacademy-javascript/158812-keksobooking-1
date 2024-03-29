const SIMILAR_OFFERS_COUNT = 10;
const MAX_PRICE_PER_NIGHT = 100000;
const MAP_START_ZOOM = 12;
const NUMBER_AFTER_POINT = 5;
const TIMEOUT_DELAY = 500;
const DEFAULT_FILTER_VALUE = 'any';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const Title = {
  MIN: 30,
  MAX: 100,
};
const roomsCapacity = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};
const mainPoint = {
  lat: 35.68442,
  lng: 139.75425
};
const offerTypeToTitle = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const priceRanges = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10001,
    max: 50000
  },
  high: {
    min: 50001,
    max: Infinity,
  }
};

export { SIMILAR_OFFERS_COUNT, offerTypeToTitle, Title, MAX_PRICE_PER_NIGHT, roomsCapacity, minPrice, MAP_START_ZOOM, mainPoint, NUMBER_AFTER_POINT, TIMEOUT_DELAY, FILE_TYPES, DEFAULT_FILTER_VALUE, priceRanges };
