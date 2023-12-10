import { setFiltersInactive } from './filter-switcher.js';
import { setFormInactive } from './form-switcher.js';
import './form-validator.js';
import { initMap } from './map.js';
import './slider.js';

setFormInactive();
setFiltersInactive();
setTimeout(initMap, 1000);
