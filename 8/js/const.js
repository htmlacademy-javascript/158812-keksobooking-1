const SIMILAR_OFFERS_COUNT = 10;
const MAX_PRICE_PER_NIGHT = 100000;
const MAP_START_ZOOM = 12;
const MAIN_PIN = {
  lat: 35.68442,
  lng: 139.75425
};
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
const offerTypeToTitle = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
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
const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

export { SIMILAR_OFFERS_COUNT, TITLES, DESCRIPTIONS, PHOTOS, TYPES, TIMES, FEATURES, offerTypeToTitle, Title, MAX_PRICE_PER_NIGHT, roomsCapacity, minPrice, MAP_START_ZOOM, MAIN_PIN };
