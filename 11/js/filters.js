import { debounce } from './utils.js';
import { SIMILAR_OFFERS_COUNT, DEFAULT_VALUE, TIMEOUT_DELAY } from './const.js';
import { clearMarkers, renderMarkers } from './map.js';
import { setFiltersActive } from './filter-switcher.js';

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

const filtersElement = document.querySelector('.map__filters');
const typeFilterElement = filtersElement.querySelector('[name="housing-type"]');
const priceFilterElement = filtersElement.querySelector('[name="housing-price"]');
const roomsCountFilterElement = filtersElement.querySelector('[name="housing-rooms"]');
const guestsCountFilterElement = filtersElement.querySelector('[name="housing-guests"]');
const featuresFilterElements = filtersElement.querySelectorAll('[name=features]');

const checkByType = ({offer}) => typeFilterElement.value === offer.type || typeFilterElement.value === DEFAULT_VALUE;

const checkByPrice = ({offer}) => {
  const priceOption = priceFilterElement.value;

  if (priceOption === DEFAULT_VALUE) {
    return true;
  }

  const {min, max} = priceRanges[priceOption];
  return offer.price >= min && offer.price <= max;
};

const checkByRoomsCount = ({offer}) => {
  if (roomsCountFilterElement.value === DEFAULT_VALUE) {
    return true;
  }
  return offer.rooms === +roomsCountFilterElement.value;
};

const checkByGuestsCount = ({offer}) => {
  if (guestsCountFilterElement.value === DEFAULT_VALUE) {
    return true;
  }
  return offer.guests === +guestsCountFilterElement.value;
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

const setFilterOffers = (offers, isInit = false) => {

  if (isInit) {
    return offers.slice(0, SIMILAR_OFFERS_COUNT);
  }

  const filteredOffers = [];

  const checkedFeatures = Array
    .from(featuresFilterElements)
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

const getFilteredOffers = (offers) => {
  const filteredOffers = setFilterOffers(offers);
  renderMarkers(filteredOffers);
};

const initFilters = (offers) => {
  setFiltersActive();

  filtersElement.addEventListener('change', debounce(() => {
    getFilteredOffers(offers);
  }, TIMEOUT_DELAY));

  filtersElement.addEventListener('reset', () => {
    getFilteredOffers(offers);
  });
};

export { initFilters };
