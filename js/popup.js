import { generateOffers } from './data.js';

const COUNT_OFFERS = 1;

const OFFER_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const similarListElement = document.querySelector('#map-canvas');

const similarOfferTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarOffers = generateOffers(COUNT_OFFERS);

const similarListFragment = document.createDocumentFragment();

similarOffers.forEach(({author, offer}) => {
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
    ? OFFER_TYPE[offer.type]
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
  featuresList.forEach((featuresItem) => {
    const isNecessary = offer.features.some((feature) =>
      featuresItem.classList.contains(`popup__feature--${feature}`),
    );
    if (!isNecessary) {
      featuresItem.remove();
    }
  });

  if (offer.features.length === 0) {
    offerFeatures.remove();
  }

  similarListFragment.appendChild(offerElement);
});

similarListElement.appendChild(similarListFragment);

export { similarOfferTemplate, similarOffers, similarListFragment };
