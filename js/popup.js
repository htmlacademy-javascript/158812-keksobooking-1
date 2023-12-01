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

  offerTitle.textContent = (offer.title)
    ? offer.title
    : offerTitle.remove();

  offerAddress.textContent = (offer.address)
    ? offer.address
    : offerAddress.remove();

  offerPrice.textContent = (offer.price)
    ? `${offer.price} ₽/ночь`
    : offerPrice.remove();

  offerType.textContent = (offer.type)
    ? offerTypeToTitle[offer.type]
    : offerType.remove();

  offerTextCapacity.textContent = (offer.rooms || offer.guests)
    ? `${offer.rooms} комнаты для ${offer.guests} гостей`
    : offerTextCapacity.remove();

  offerTextTime.textContent = (offer.checkin || offer.checkout)
    ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`
    : offerTextTime.remove();

  offerDescription.textContent = (offer.description)
    ? offer.description
    : offerDescription.remove();

  authorAvatar.src = (author.avatar)
    ? author.avatar
    : authorAvatar.remove();

  offerPhotos.innerHTML = '';
  offer.photos.forEach((photo) => {
    offerPhotos.insertAdjacentHTML('beforeend', `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  });
  if (offer.photos.length === 0) {
    offerPhotos.remove();
  }

  const featuresContainer = offerFeatures;
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  createFeatureElements(featuresList, offer.features);
  if (offer.features.length === 0) {
    offerFeatures.remove();
  }

  return offerElement;
};

export { createPopup, similarListElement };
