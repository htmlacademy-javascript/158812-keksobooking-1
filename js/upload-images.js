import { FILE_TYPES } from './const.js';

const avatarChooserElement = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoChooserElement = document.querySelector('.ad-form__upload input[type=file]');
const photoPreviewElement = document.querySelector('.ad-form__photo');

const getMatchTypes = (file) => FILE_TYPES.some((it) => file.endsWith(it));

avatarChooserElement.addEventListener('change', () => {
  const avatar = avatarChooserElement.files[0];
  const fileName = avatar.name.toLowerCase();

  const matches = getMatchTypes(fileName);

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(avatar);
  }
});

photoChooserElement.addEventListener('change', () => {
  const photo = photoChooserElement.files[0];
  const photoName = photo.name.toLowerCase();

  const matches = getMatchTypes(photoName);

  if (matches) {
    photoPreviewElement.innerHTML = `<img src="${URL.createObjectURL(photo)}" width="70" height="70">`;
  }
});

const clearAllLoadPhotos = () => {
  avatarPreviewElement.src = 'img/muffin-grey.svg';
  photoPreviewElement.innerHTML = '';
};

export { clearAllLoadPhotos };
