import { offerTypeToTitle } from './const.js';

const similarOfferTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createFeatureElements = (features, offerFeatures) => {
  features.forEach((listItem) => {
    const isNecessary = offerFeatures.some((feature) =>
      listItem.classList.contains(`popup__feature--${feature}`),
    );
    if (!isNecessary) {
      listItem.remove();
    }
  });
};

const createPhotoElements = (element, photos) => {
  element.innerHTML = '';
  photos.forEach((photo) => {
    element.insertAdjacentHTML('beforeend', `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  });
};

const checkAvailableData = (data, element) => {
  if (!data) {
    element.remove();
  }
};

const createPopup = (props) => {
  const { author, offer } = props;

  const offerElement = similarOfferTemplate.cloneNode(true);

  const offerTitleElement = offerElement.querySelector('.popup__title');
  const offerAddressElement = offerElement.querySelector('.popup__text--address');
  const offerPriceElement = offerElement.querySelector('.popup__text--price');
  const offerTypeElement = offerElement.querySelector('.popup__type');
  const offerTextCapacityElement = offerElement.querySelector('.popup__text--capacity');
  const offerTextTimeElement = offerElement.querySelector('.popup__text--time');
  const offerDescriptionElement = offerElement.querySelector('.popup__description');
  const offerFeaturesElement = offerElement.querySelector('.popup__features');
  const offerPhotosElement = offerElement.querySelector('.popup__photos');
  const authorAvatarElement = offerElement.querySelector('.popup__avatar');
  const featuresListElements = offerFeaturesElement.querySelectorAll('.popup__feature');

  offerTitleElement.textContent = offer.title;
  offerAddressElement.textContent = offer.address;
  offerPriceElement.textContent = offer.price;
  offerTypeElement.textContent = offerTypeToTitle[offer.type];
  offerTextCapacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  offerTextTimeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  offerDescriptionElement.textContent = offer.description;
  authorAvatarElement.src = author.avatar;

  if (offer.photos) {
    createPhotoElements(offerPhotosElement, offer.photos);
  } else {
    offerPhotosElement.remove();
  }

  if (offer.features) {
    createFeatureElements(featuresListElements, offer.features);
  } else {
    offerFeaturesElement.remove();
  }

  checkAvailableData(offer.title, offerTitleElement);
  checkAvailableData(offer.address, offerAddressElement);
  checkAvailableData(offer.price, offerPriceElement);
  checkAvailableData(offer.type, offerTypeElement);
  checkAvailableData(offer.rooms, offerTextCapacityElement);
  checkAvailableData(offer.checkin, offerTextTimeElement);
  checkAvailableData(offer.description, offerDescriptionElement);
  checkAvailableData(author.avatar, authorAvatarElement);

  return offerElement;
};

export { createPopup };
