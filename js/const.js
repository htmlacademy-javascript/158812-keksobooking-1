const SIMILAR_OFFERS_COUNT = 10;
const MAX_PRICE_PER_NIGHT = 100000;
const MAP_START_ZOOM = 12;
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

export { SIMILAR_OFFERS_COUNT, offerTypeToTitle, Title, MAX_PRICE_PER_NIGHT, roomsCapacity, minPrice, MAP_START_ZOOM, mainPoint };
