/* eslint-disable*/
import { pristine } from './validation.js';
import '/js/hastagValidation.js';
import '/js/commentValidation.js';

import { hideSlider, setCurrentEffect, updateImageFilter } from '/js/effects.js';
import { DEFAULT } from '/js/filters.js';
import { sendData } from './fetch.js';
import { uploadPreview } from './uploadPreview.js';

const imageEdit = document.querySelector('.img-upload__overlay');
const closeEditButton = imageEdit.querySelector('.img-upload__cancel');
const uploadImage = document.querySelector('#upload-select-image');
const userImageInput = document.querySelector('.img-upload__input');

const inputScale = imageEdit.querySelector('.scale__control--value');
const biggerScale = imageEdit.querySelector('.scale__control--smaller');
const smallerScale = imageEdit.querySelector('.scale__control--bigger');
const userImagePreview = imageEdit.querySelector('.img-upload__preview').children[0];

const smallestScale = 25;
const biggestScale = 100;
const scaleStepValue = 25;

const isEscapeKey = (evt) => evt.key === 'Escape';

let currentSize;
let messageIsOpen = false;

const close = () => {
  if (messageIsOpen) {
    document.body.removeChild(document.body.lastChild);
    messageIsOpen = false;
  }
};

export { close };

const successfullEscapeKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    close();
  }
};

const newScale = () => {
  inputScale.value = `${currentSize}%`;
  userImagePreview.style.transform = `scale(${currentSize / 100})`;
};

const editCloseClick =  () => {
  closeEdit();
};

const editEscapeKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEdit();
  }
};

const showEditor = () => {
  document.body.classList.add('modal-open');
  imageEdit.classList.remove('hidden');

  currentSize = biggestScale;
  setCurrentEffect(DEFAULT);
  newScale();
  updateImageFilter();
  hideSlider();

  closeEditButton.addEventListener('click', editCloseClick);
  document.addEventListener('keydown', editEscapeKey);
};


const errorEscapeKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    close();
    showEditor();
  }
};

const errorCloseClick = () => {
  close();
  showEditor();
};

const successfullCloseClick = () => {
  close();
};

const showServerErrorMessage = () => {
  const messageClone = document.querySelector('#server_error').content.querySelector('.server_error').cloneNode(true);
  document.body.insertAdjacentElement('beforeend', messageClone);
  messageIsOpen = true;
};

export { showServerErrorMessage };

const showUploadErrorMessage = () => {
  const messageClone = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const innerClone = messageClone.querySelector('.error__inner');
  const errorClose = messageClone.querySelector('.error__button');
  closeEdit(false);
  innerClone.addEventListener('click', (evt) => evt.stopPropagation());
  messageClone.addEventListener('click', errorCloseClick);
  errorClose.addEventListener('click', errorCloseClick);
  document.addEventListener('keydown', errorEscapeKey);

  document.body.insertAdjacentElement('beforeend', messageClone);
  messageIsOpen = true;
};

const moveAwayClick = () => {
  if (currentSize !== smallestScale) {
    currentSize -= scaleStepValue;
    newScale();
  }
};

const moveCloserClick = () => {
  if (currentSize !== biggestScale) {
    currentSize += scaleStepValue;
    newScale();
  }
};

biggerScale.addEventListener('click', moveAwayClick);
smallerScale.addEventListener('click', moveCloserClick);

const clearForm = () => {
  uploadImage.reset();
  currentSize = biggestScale;
  setCurrentEffect(DEFAULT);
  newScale();
  updateImageFilter();
  hideSlider();
};

function closeEdit (clear = true) {
  document.body.classList.remove('modal-open');
  imageEdit.classList.add('hidden');
  if (clear) {
    clearForm();
  }
  closeEditButton.removeEventListener('click', editCloseClick);
  document.removeEventListener('keydown', editEscapeKey);
}

const setMinis = () => {
  const urlObject =  URL.createObjectURL(userImageInput.files[0]);
  document.querySelector('.effects__preview--none').style.backgroundImage = "url('" + urlObject + "')";
  document.querySelector('.effects__preview--chrome').style.backgroundImage = "url('" + urlObject + "')";
  document.querySelector('.effects__preview--sepia').style.backgroundImage = "url('" + urlObject + "')";
  document.querySelector('.effects__preview--marvin').style.backgroundImage = "url('" + urlObject + "')";
  document.querySelector('.effects__preview--phobos').style.backgroundImage = "url('" + urlObject + "')";
  document.querySelector('.effects__preview--heat').style.backgroundImage = "url('" + urlObject + "')";
};

const imageUpload = () => {
  pristine.validate();
  uploadPreview(userImagePreview, userImageInput);
  setMinis();
  showEditor();
};

document.querySelector('#upload-select-image').addEventListener('submit', (evt) => {
  document.querySelector('#upload-submit').setAttribute('disabled', '');
  sendData(evt)
    .then(() => {
      const messageClone = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
      const innerClone = messageClone.querySelector('.success__inner');
      const errorClose = messageClone.querySelector('.success__button');
      closeEdit();
      innerClone.addEventListener('click', (e) => e.stopPropagation());
      messageClone.addEventListener('click', successfullCloseClick);
      errorClose.addEventListener('click', successfullCloseClick);
      document.addEventListener('keydown', successfullEscapeKey);
      document.body.insertAdjacentElement('beforeend', messageClone);
      messageIsOpen = true;
    })
    .catch(() => showUploadErrorMessage())
    .finally(() => document.querySelector('#upload-submit').removeAttribute('disabled'));
});

userImageInput.addEventListener('change', imageUpload);