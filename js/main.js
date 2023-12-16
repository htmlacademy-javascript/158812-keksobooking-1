import { setFiltersInactive } from './filter-switcher.js';
import { setFormInactive } from './form-switcher.js';
import './form-validator.js';
import { renderMarkers, initMap } from './map.js';
import './slider.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { SIMILAR_OFFERS_COUNT } from './const.js';
import { setUserFormSubmit } from './form-send.js';

setFormInactive();
setFiltersInactive();
setTimeout(initMap, 1000);

getData()
  .then((offers) => {
    renderMarkers(offers.slice(0, SIMILAR_OFFERS_COUNT));
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit();
