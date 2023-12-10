import { generateOffers } from './data.js';
import { SIMILAR_OFFERS_COUNT, MAP_START_ZOOM, MAIN_PIN } from './const.js';
import { createPopup } from './popup.js';
import { setFormActive } from './form-switcher.js';
import { setFiltersActive } from './filter-switcher.js';
import { getLocationToString } from './utils.js';

const mainPinLocation = document.querySelector('#address');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const similarPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

//добавляет на карту специальную, «главную», метку
const loadMainPin = (map) => {
  const mainPinMarker = L.marker(
    MAIN_PIN,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);
  mainPinLocation.value = getLocationToString(mainPinMarker.getLatLng(), 5);

  mainPinMarker.on('moveend', (evt) => {
    mainPinLocation.value = getLocationToString(evt.target.getLatLng(), 5);
  });
};

//добавляет на карту метки объявлений, «обычные»
const loadSimilarPins = (map) => {
  const offers = generateOffers(SIMILAR_OFFERS_COUNT);
  const markerGroup = L.layerGroup().addTo(map);

  const renderMarker = (object) => {
    const marker = L.marker(
      {
        lat: object.offer.location.lat,
        lng: object.offer.location.lng,
      },
      {
        icon: similarPinIcon,
      }
    );
    marker
      .addTo(markerGroup)
      .bindPopup(createPopup(object));
  };

  offers.forEach((offer) => {
    renderMarker(offer);
  });
};

//инициализирует карту
const initMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      setFormActive();
      setFiltersActive();
    })
    .setView(MAIN_PIN, MAP_START_ZOOM);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  loadMainPin(map);
  loadSimilarPins(map);
};

export { initMap };
