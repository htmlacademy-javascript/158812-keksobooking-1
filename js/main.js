import { setFiltersInactive } from './filter-switcher.js';
import { setFormInactive } from './form-switcher.js';
import './form-validator.js';
import { initMap, clearMarkers, renderMarkers } from './map.js';
import './slider.js';
import { getData } from './api.js';
import { showAlert, debounce } from './utils.js';
import { setUserFormSubmit } from './form-send.js';
import { TIMEOUT_DELAY, SIMILAR_OFFERS_COUNT } from './const.js';
import { checkByType, checkByPrice, checkByRoomsCount, checkByGuestsCount, checkByFeatures } from './filters.js';

const mapFilters = document.querySelector('.map__filters');

setFormInactive();
setFiltersInactive();
setTimeout(initMap, TIMEOUT_DELAY);

const renderData = () => {
  getData()
    .then((offers) => {
      clearMarkers();

      renderMarkers(offers
        .slice()
        .filter(checkByType)
        .filter(checkByPrice)
        .filter(checkByRoomsCount)
        .filter(checkByGuestsCount)
        .sort(checkByFeatures)
        .slice(0, SIMILAR_OFFERS_COUNT));
    })
    .catch((err) => {
      showAlert(err.message);
    });
};
renderData();
mapFilters.addEventListener('change', debounce(renderData, TIMEOUT_DELAY));

setUserFormSubmit();
