const DEFAULT_VALUE = 'any';

const priceRanges = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10001,
    max: 50000
  },
  high: {
    min: 50001,
    max: 100000,
  }
};

const typeOfHousing = document.querySelector('[name="housing-type"]');
const priceOfHousing = document.querySelector('[name="housing-price"]');
const roomsCountOfHousing = document.querySelector('[name="housing-rooms"]');
const guestsCountOfHousing = document.querySelector('[name="housing-guests"]');
const featuresInputs = document.querySelectorAll('[name="features"]');

const getFeatureRank = ({ offer }) => {

  let rank = 0;

  if (offer.features) {
    offer.features.forEach((feature) => {
      featuresInputs.forEach((input) => {
        if (feature === input.value && input.checked) {
          rank += 1;
        }
      });
    });
  }

  return rank;
};

const checkByType = ({offer}) => typeOfHousing.value === DEFAULT_VALUE ? true : offer.type === typeOfHousing.value;

const checkByPrice = ({offer}) => {
  const priceOption = priceOfHousing.value;

  if (priceOption === DEFAULT_VALUE) {
    return true;
  }

  const {min, max} = priceRanges[priceOption];
  return offer.price >= min && offer.price <= max;

};

const checkByRoomsCount = ({offer}) => {
  if (roomsCountOfHousing.value === DEFAULT_VALUE) {
    return true;
  }
  return offer.rooms === +roomsCountOfHousing.value;
};

const checkByGuestsCount = ({offer}) => {
  if (guestsCountOfHousing.value === DEFAULT_VALUE) {
    return true;
  }
  return offer.guests === +guestsCountOfHousing.value;
};

const checkByFeatures = (offerA, offerB) => {
  const rankA = getFeatureRank(offerA);
  const rankB = getFeatureRank(offerB);

  return rankB - rankA;
};

export { checkByType, checkByPrice, checkByRoomsCount, checkByGuestsCount, checkByFeatures };
