import { setFiltersInactive } from './filter-switcher.js';
import { setFormInactive } from './form-switcher.js';
import './form-validator.js';
import { initMap, renderMarkers } from './map.js';
import './slider.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

import { SIMILAR_OFFERS_COUNT } from './const.js';
import { initFilters } from './filters.js';

setFormInactive();
setFiltersInactive();
initMap();

getData()
  .then((offers) => {
    renderMarkers(offers.slice(0, SIMILAR_OFFERS_COUNT));
    initFilters(offers);
  })
  .catch((err) => {
    showAlert(err.message);
  });

