import {pristine} from './validation.js';
import '/js/hastagValidation.js';
import '/js/commentValidation.js';


import {hideSlider, setCurrentEffect, updateImageFilter} from '/js/effects.js';
import {DEFAULT} from '/js/filters.js';
import {sendData} from './fetch.js';

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const IMAGE_SCALE_STEP = 25;


const uploadImage = document.querySelector('#upload-select-image');
const imageInputField = document.querySelector('.img-upload__input');
const imageEdit = document.querySelector('.img-upload__overlay');
const editorCloseButton = imageEdit.querySelector('.img-upload__cancel');
const isEscapeKey = (evt) => evt.key === 'Escape';


const imagePreview = imageEdit.querySelector('.img-upload__preview').children[0];
const scaleInputField = imageEdit.querySelector('.scale__control--value');
const scaleDecreaseButton = imageEdit.querySelector('.scale__control--smaller');
const scaleIncreaseButton = imageEdit.querySelector('.scale__control--bigger');

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
  scaleInputField.value = `${currentSize}%`;
  imagePreview.style.transform = `scale(${currentSize / 100})`;
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


  currentSize = MAX_SCALE_VALUE;
  setCurrentEffect(DEFAULT);
  newScale();
  updateImageFilter();
  hideSlider();
  editorCloseButton.addEventListener('click', editCloseClick);
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
  if (currentSize !== MIN_SCALE_VALUE) {
    currentSize -= IMAGE_SCALE_STEP;
    newScale();
  }
};

const moveCloserClick = () => {
  if (currentSize !== MAX_SCALE_VALUE) {
    currentSize += IMAGE_SCALE_STEP;
    newScale();
  }
};

scaleDecreaseButton.addEventListener('click', moveAwayClick);
scaleIncreaseButton.addEventListener('click', moveCloserClick);

const clearForm = () => {
  uploadImage.reset();
  currentSize = MAX_SCALE_VALUE;
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
  editorCloseButton.removeEventListener('click', editCloseClick);
  document.removeEventListener('keydown', editEscapeKey);
}

const imageUpload = () => {
  pristine.validate();
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

imageInputField.addEventListener('change', imageUpload);