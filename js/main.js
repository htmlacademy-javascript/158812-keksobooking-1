import { createPopup, similarListElement } from './popup.js';
import { generateOffers } from './data.js';
import { SIMILAR_OFFERS_COUNT } from './const.js';
import { disableForms } from './form.js';

const offers = generateOffers(SIMILAR_OFFERS_COUNT);
similarListElement.append(createPopup(offers[0]));

disableForms();
