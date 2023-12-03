const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('select, fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('select, fieldset');

const setFormElementsState = (elements, state) => {
  elements.forEach((element) => {
    element.disabled = state;
  });
};

const disableForms = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  setFormElementsState(adFormElements, true);
  setFormElementsState(mapFiltersElements, true);
};

const enableForms = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  setFormElementsState(adFormElements, false);
  setFormElementsState(mapFiltersElements, false);
};

export { disableForms, enableForms };
