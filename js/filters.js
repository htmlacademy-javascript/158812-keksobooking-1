import { debounce } from './utils.js';
import { SIMILAR_OFFERS_COUNT } from './const.js';
import { clearMarkers } from './map.js';

const DEFAULT_VALUE = 'any';

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

const mapFilters = document.querySelector('.map__filters');
const typeOfHousing = document.querySelector('[name="housing-type"]');
const priceOfHousing = document.querySelector('[name="housing-price"]');
const roomsCountOfHousing = document.querySelector('[name="housing-rooms"]');
const guestsCountOfHousing = document.querySelector('[name="housing-guests"]');
const featuresInputs = mapFilters.querySelectorAll('[name=features]');

const checkByType = ({offer}) => typeOfHousing.value === offer.type || typeOfHousing.value === DEFAULT_VALUE;

const checkByPrice = ({offer}) => {
  const priceOption = priceOfHousing.value;

  if (priceOption === DEFAULT_VALUE) {
    return true;
  }

  const {min, max} = priceRanges[priceOption];
  return offer.price >= min && offer.price <= max;
};

const checkByRoomsCount = ({offer}) => {
  if (roomsCountOfHousing.value === DEFAULT_VALUE) {
    return true;
  }
  return offer.rooms === +roomsCountOfHousing.value;
};

const checkByGuestsCount = ({offer}) => {
  if (guestsCountOfHousing.value === DEFAULT_VALUE) {
    return true;
  }
  return offer.guests === +guestsCountOfHousing.value;
};

const checkByFeatures = ({offer}, checkedFeatures) => {
  if (checkedFeatures.length === 0) {
    return true;
  }
  if (!offer.features) {
    return false;
  }
  return checkedFeatures.every((feature) => offer.features.includes(feature));
};

const getFilteredOffers = (offers, isInit = false) => {

  if (isInit) {
    return offers.slice(0, SIMILAR_OFFERS_COUNT);
  }

  const filteredOffers = [];

  const checkedFeatures = Array
    .from(featuresInputs)
    .filter((feature) => feature.checked === true)
    .map((feature) => feature.value);

  for (const offer of offers) {
    if (filteredOffers.length >= SIMILAR_OFFERS_COUNT) {
      break;
    }
    if (
      checkByType(offer) &&
      checkByPrice(offer) &&
      checkByRoomsCount(offer) &&
      checkByGuestsCount(offer) &&
      checkByFeatures(offer, checkedFeatures)
    ) {
      filteredOffers.push(offer);
    }
  }

  clearMarkers();

  return filteredOffers;
};

const initFilters = (offers, cb) => {
  cb(getFilteredOffers(offers));
  mapFilters.addEventListener('change', debounce(() => cb(getFilteredOffers(offers))));

  mapFilters.addEventListener('reset', () => {
    cb(getFilteredOffers(offers, true));
  });
};

export { initFilters };
