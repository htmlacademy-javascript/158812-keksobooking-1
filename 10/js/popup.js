import { offerTypeToTitle } from './const.js';

const createFeatureElements = (list, array) => {
  list.forEach((listItem) => {
    const isNecessary = array.some((feature) =>
      listItem.classList.contains(`popup__feature--${feature}`),
    );
    if (!isNecessary) {
      listItem.remove();
    }
  });
};

const createPhotoElements = (element, array) => {
  element.innerHTML = '';
  array.forEach((photo) => {
    element.insertAdjacentHTML('beforeend', `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  });
};

const checkAvailableData = (data, element) => {
  if (!data) {
    element.remove();
  }
};

const similarListElement = document.querySelector('#map-canvas');

const similarOfferTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createPopup = (props) => {
  const { author, offer } = props;

  const offerElement = similarOfferTemplate.cloneNode(true);

  const offerTitle = offerElement.querySelector('.popup__title');
  const offerAddress = offerElement.querySelector('.popup__text--address');
  const offerPrice = offerElement.querySelector('.popup__text--price');
  const offerType = offerElement.querySelector('.popup__type');
  const offerTextCapacity = offerElement.querySelector('.popup__text--capacity');
  const offerTextTime = offerElement.querySelector('.popup__text--time');
  const offerDescription = offerElement.querySelector('.popup__description');
  const offerFeatures = offerElement.querySelector('.popup__features');
  const offerPhotos = offerElement.querySelector('.popup__photos');
  const authorAvatar = offerElement.querySelector('.popup__avatar');
  const featuresList = offerFeatures.querySelectorAll('.popup__feature');

  offerTitle.textContent = offer.title;
  offerAddress.textContent = offer.address;
  offerPrice.textContent = offer.price;
  offerType.textContent = offerTypeToTitle[offer.type];
  offerTextCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  offerTextTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  offerDescription.textContent = offer.description;
  authorAvatar.src = author.avatar;

  if (offer.photos) {
    createPhotoElements(offerPhotos, offer.photos);
  } else {
    offerPhotos.remove();
  }

  if (offer.features) {
    createFeatureElements(featuresList, offer.features);
  } else {
    offerFeatures.remove();
  }

  checkAvailableData(offer.title, offerTitle);
  checkAvailableData(offer.address, offerAddress);
  checkAvailableData(offer.price, offerPrice);
  checkAvailableData(offer.type, offerType);
  checkAvailableData(offer.rooms, offerTextCapacity);
  checkAvailableData(offer.checkin, offerTextTime);
  checkAvailableData(offer.description, offerDescription);
  checkAvailableData(author.avatar, authorAvatar);

  return offerElement;
};

export { createPopup, similarListElement };
