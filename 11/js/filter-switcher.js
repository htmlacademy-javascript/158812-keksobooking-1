import { setElementsDisabled } from './utils.js';

const filtersElement = document.querySelector('.map__filters');
const filterElements = filtersElement.querySelectorAll('select, fieldset');

const setFiltersActive = () => {
  filtersElement.classList.remove('map__filters--disabled');
  setElementsDisabled(filterElements, false);
};

const setFiltersInactive = () => {
  filtersElement.classList.add('map__filters--disabled');
  setElementsDisabled(filterElements, true);
};

export { setFiltersActive, setFiltersInactive };
