import { debounce } from './utils.js';
import { TIMEOUT_DELAY, SIMILAR_OFFERS_COUNT } from './const.js';
import { clearMarkers, renderMarkers } from './map.js';

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
const featuresInputs = document.querySelectorAll('input[name="features"]:checked');

const checkByType = (offer) => typeOfHousing.value === offer.type || typeOfHousing.value === DEFAULT_VALUE;

const checkByPrice = (offer) => {
  const priceOption = priceOfHousing.value;

  if (priceOption === DEFAULT_VALUE) {
    return true;
  }

  const {min, max} = priceRanges[priceOption];
  return offer.price >= min && offer.price <= max;
};

const checkByRoomsCount = (offer) => {
  if (roomsCountOfHousing.value === DEFAULT_VALUE) {
    return true;
  }
  return offer.rooms === +roomsCountOfHousing.value;
};

const checkByGuestsCount = (offer) => {
  if (guestsCountOfHousing.value === DEFAULT_VALUE) {
    return true;
  }
  return offer.guests === +guestsCountOfHousing.value;
};

const getSelectedCheckbox = () => Array.from(featuresInputs).map((featuresInput) => featuresInput.value);

const checkByFeatures = (offer) => {
  const arrayFeatures = offer.features;
  const selectedFeatures = getSelectedCheckbox();
  if (selectedFeatures.length === 0) {
    return true;
  }
  if (arrayFeatures) {
    return selectedFeatures.every((feature) => arrayFeatures.includes(feature));
  }
  return false;
};

const setFilteredOffers = (offers) => offers.filter(({offer}) => checkByType(offer) && checkByPrice(offer) && checkByRoomsCount(offer) && checkByGuestsCount(offer) && checkByFeatures(offer)).slice(0, SIMILAR_OFFERS_COUNT);

const getFilteredOffers = (data) => {
  mapFilters.addEventListener('change', debounce(() => {
    clearMarkers();

    const filteredArray = setFilteredOffers(data);
    renderMarkers(filteredArray);
  }, TIMEOUT_DELAY));
};

export { getFilteredOffers };
