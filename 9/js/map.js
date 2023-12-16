import { MAP_START_ZOOM, mainPoint } from './const.js';
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

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//добавляет на карту специальную, «главную», метку
const mainPinMarker = L.marker(
  mainPoint,
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

//добавляет на карту метки объявлений, «обычные»
const markerGroup = L.layerGroup().addTo(map);

const renderMarker = (object) => {
  const marker = L.marker(
    {
      lat: object.location.lat,
      lng: object.location.lng,
    },
    {
      icon: similarPinIcon,
    }
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createPopup(object));
};

const renderMarkers = (array) => {
  array.forEach((element) => {
    renderMarker(element);
  });
};

//инициализирует карту
const initMap = () => {
  map
    .on('load', () => {
      setFormActive();
      setFiltersActive();
    })
    .setView(mainPoint, MAP_START_ZOOM);
};

const resetMainPin = () => {
  mainPinMarker.setLatLng(mainPoint);
  map.setView(mainPoint, MAP_START_ZOOM);
  map.closePopup();
};

export { renderMarkers, initMap, resetMainPin, mainPinLocation };
