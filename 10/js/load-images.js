import { FILE_TYPES } from './const.js';

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');

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

const clearAllLoadPhoto = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoPreview.innerHTML = '';
};

export { clearAllLoadPhoto };
