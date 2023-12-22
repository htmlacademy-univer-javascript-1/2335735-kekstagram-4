import {pristine, checkValidation} from './validation.js';

const HASHTAG_TEMPLATE = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_AMOUNT = 5;

const hashtagInput = document.querySelector('.text__hashtags');

let currentError = '';

const validateHashtags = (value) => {
  const hashtags = value
    .split(' ')
    .filter((tag) => tag !== '')
    .map((tag) => tag.toLowerCase());

  if (hashtags.length > MAX_HASHTAG_AMOUNT) {
    currentError = `Нельзя добавлять больше ${MAX_HASHTAG_AMOUNT} хэштегов`;
    return false;
  }

  if (hashtags.some((tag) => hashtags.indexOf(tag) !== hashtags.lastIndexOf(tag))) {
    currentError = 'Хэштеги не должны повторяться';
    return false;
  }

  for (const hashtag of hashtags) {
    if (!HASHTAG_TEMPLATE.test(hashtag)) {
      if (hashtag[0] !== '#') {
        currentError = 'Хэштег должен начинаться со знака решетки';
      } else if (hashtag.length === 1) {
        currentError = 'Тело хэштега должно содержать не меньше одного символа';
      } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        currentError = 'Хэштег должен быть не длиннее 20 символов';
      } else {
        currentError = 'Хэштег может состоять только из букв и цифр';
      }
      return false;
    }
  }
  return true;
};

const getHashtagErrorMessage = () => currentError;

pristine.addValidator(hashtagInput, validateHashtags, getHashtagErrorMessage);

const onHashtagInput = () => {
  checkValidation();
};

hashtagInput.addEventListener('input', onHashtagInput);
hashtagInput.addEventListener('keydown', (evt) => evt.stopPropagation());
