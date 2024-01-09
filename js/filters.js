import { debounce } from './utils.js';
import { SIMILAR_OFFERS_COUNT, DEFAULT_FILTER_VALUE, TIMEOUT_DELAY, priceRanges } from './const.js';
import { clearMarkers, renderMarkers } from './map.js';
import { setElementsDisabled } from './utils.js';

const filtersElement = document.querySelector('.map__filters');
const filtersDisabledElement = document.querySelector('.map__filters--disabled');
const typeFilterElement = filtersElement.querySelector('[name="housing-type"]');
const priceFilterElement = filtersElement.querySelector('[name="housing-price"]');
const roomsCountFilterElement = filtersElement.querySelector('[name="housing-rooms"]');
const guestsCountFilterElement = filtersElement.querySelector('[name="housing-guests"]');
const featuresFilterElements = filtersElement.querySelectorAll('[name=features]');
const filterElements = filtersElement.querySelectorAll('select, fieldset');

const setFiltersActive = () => {
  filtersElement.classList.remove(filtersDisabledElement);
  setElementsDisabled(filterElements, false);
};

const setFiltersInactive = () => {
  filtersElement.classList.add(filtersDisabledElement);
  setElementsDisabled(filterElements, true);
};

const checkByType = ({offer}) => typeFilterElement.value === offer.type || typeFilterElement.value === DEFAULT_FILTER_VALUE;

const checkByPrice = ({offer}) => {
  const priceOption = priceFilterElement.value;

  if (priceOption === DEFAULT_FILTER_VALUE) {
    return true;
  }

  const {min, max} = priceRanges[priceOption];
  return offer.price >= min && offer.price <= max;
};

const checkByRoomsCount = ({offer}) => {
  if (roomsCountFilterElement.value === DEFAULT_FILTER_VALUE) {
    return true;
  }
  return offer.rooms === +roomsCountFilterElement.value;
};

const checkByGuestsCount = ({offer}) => {
  if (guestsCountFilterElement.value === DEFAULT_FILTER_VALUE) {
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

const getFilterOffers = (offers) => {

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

  return filteredOffers;
};

const renderFilteredOffers = (offers) => {
  clearMarkers();
  const filteredOffers = getFilterOffers(offers);
  renderMarkers(filteredOffers);
};

const initFilters = (offers) => {
  setFiltersActive();

  filtersElement.addEventListener('change', debounce(() => {
    renderFilteredOffers(offers);
  }, TIMEOUT_DELAY));

  filtersElement.addEventListener('reset', () => {
    renderFilteredOffers(offers);
  });
};

export { initFilters, setFiltersInactive, setFiltersActive };
