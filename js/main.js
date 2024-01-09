import { setFiltersInactive } from './filters.js';
import { setFormInactive } from './form.js';
import { initMap, renderMarkers } from './map.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { SIMILAR_OFFERS_COUNT } from './const.js';
import { initFilters } from './filters.js';

setFormInactive();
setFiltersInactive();

getData()
  .then((offers) => {
    initMap();
    renderMarkers(offers.slice(0, SIMILAR_OFFERS_COUNT));
    initFilters(offers);
  })
  .catch((err) => {
    showAlert(err.message);
  });

