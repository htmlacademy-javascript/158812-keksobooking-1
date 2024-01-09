import { MAP_START_ZOOM, mainPoint, NUMBER_AFTER_POINT } from './const.js';
import { createPopup } from './popup.js';
import { getLocationToString } from './utils.js';
import { initForm } from './form.js';

const addressElement = document.querySelector('#address');

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
const markerGroup = L.layerGroup().addTo(map);

const mainPinMarker = L.marker(
  mainPoint,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

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

const renderMarkers = (elements) => {
  elements.forEach((element) => {
    renderMarker(element);
  });
};

const initMap = () => {
  map
    .on('load', () => {
      initForm();
    })
    .setView(mainPoint, MAP_START_ZOOM);

  mainPinMarker.addTo(map);
  addressElement.value = getLocationToString(mainPinMarker.getLatLng(), NUMBER_AFTER_POINT);

  mainPinMarker.on('moveend', (evt) => {
    addressElement.value = getLocationToString(evt.target.getLatLng(), NUMBER_AFTER_POINT);
  });

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const resetMainPin = () => {
  mainPinMarker.setLatLng(mainPoint);
  map.setView(mainPoint, MAP_START_ZOOM);
  map.closePopup();
};

const clearMarkers = () => markerGroup.clearLayers();

export { initMap, resetMainPin, addressElement, markerGroup, renderMarkers, clearMarkers };
