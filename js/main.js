import { setFiltersInactive } from './filter-switcher.js';
import { setFormInactive } from './form-switcher.js';
import './form-validator.js';
import { initMap, renderMarkers } from './map.js';
import './slider.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { setUserFormSubmit } from './form-send.js';
import { TIMEOUT_DELAY } from './const.js';
import { initFilters } from './filters.js';

setFormInactive();
setFiltersInactive();
setTimeout(initMap, TIMEOUT_DELAY);

getData()
  .then((offers) => {
    initFilters(offers, (filteredOffers) => renderMarkers(filteredOffers));
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit();
