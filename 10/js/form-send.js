import { pristine, adForm } from'./form-validator.js';
import { openSuccessSendMessage, openErrorSendMessage } from './form-messages.js';
import { sendData } from './api.js';
import { resetMainPin, mainPinLocation } from './map.js';
import { getLocationToString } from './utils.js';
import { mainPoint, FILE_TYPES } from './const.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const resetFormButton = document.querySelector('.ad-form__reset');
const submitButton = document.querySelector('.ad-form__submit');

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');

const resetForm = (evt) => {
  evt.preventDefault();
  pristine.reset();
  adForm.reset();
  mainPinLocation.value = getLocationToString(mainPoint, 5);
  resetMainPin();
};

const onClickResetButton = (evt) => {
  resetForm(evt);
};

resetFormButton.addEventListener('click', onClickResetButton);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then((onSuccess) => {
          openSuccessSendMessage(onSuccess);
          resetForm(evt);
        })
        .catch((err) => {
          openErrorSendMessage(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};

avatarChooser.addEventListener('change', () => {
  const avatar = avatarChooser.files[0];
  const fileName = avatar.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(avatar);
  }
});

photoChooser.addEventListener('change', () => {
  const photo = photoChooser.files[0];
  const photoName = photo.name.toLowerCase();

  const matchTypes = FILE_TYPES.some((it) => photoName.endsWith(it));

  if (matchTypes) {
    photoPreview.innerHTML = `<img src="${URL.createObjectURL(photo)}" width="70" height="70">`;
  }
});

export { setUserFormSubmit };
