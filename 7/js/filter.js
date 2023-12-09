import { setElementsDisabled } from './utils.js';

const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('select, fieldset');

const setFiltersActive = () => {
  mapFilters.classList.add('map__filters--disabled');
  setElementsDisabled(mapFiltersElements, true);
};

const setFiltersInactive = () => {
  mapFilters.classList.remove('map__filters--disabled');
  setElementsDisabled(mapFiltersElements, false);
};

export { setFiltersActive, setFiltersInactive };
