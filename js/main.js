import { createPopup, similarListElement } from './popup.js';
import { generateOffers } from './data.js';
import { SIMILAR_OFFERS_COUNT } from './const.js';

const data = generateOffers(SIMILAR_OFFERS_COUNT);
similarListElement.append(createPopup(data.at(0)));
