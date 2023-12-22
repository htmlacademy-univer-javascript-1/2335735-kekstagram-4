import {pristine} from './validation.js';
import '/js/hastagValidation.js';
import '/js/commentValidation.js';

import {hideSlider, setCurrentEffect, updateImageFilter} from '/js/effects.js';
import {DEFAULT} from '/js/filters.js';

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const IMAGE_SCALE_STEP = 25;

const imageUploadForm = document.querySelector('#upload-select-image');
const imageInputField = document.querySelector('.img-upload__input');
const imageEdit = document.querySelector('.img-upload__overlay');
const editorCloseButton = imageEdit.querySelector('.img-upload__cancel');
const isEscapeKey = (evt) => evt.key === 'Escape';

const imagePreview = imageEdit.querySelector('.img-upload__preview').children[0];
const scaleInputField = imageEdit.querySelector('.scale__control--value');
const scaleDecreaseButton = imageEdit.querySelector('.scale__control--smaller');
const scaleIncreaseButton = imageEdit.querySelector('.scale__control--bigger');

let currentScale;

const changeImageScale = () => {
  imagePreview.style.transform = `scale(${currentScale / 100})`;
};

const updateScale = () => {
  scaleInputField.value = `${currentScale}%`;
  changeImageScale();
};

const onDecreaseClick = () => {
  if (currentScale !== MIN_SCALE_VALUE) {
    currentScale -= IMAGE_SCALE_STEP;
    updateScale();
  }
};

const onIncreaseClick = () => {
  if (currentScale !== MAX_SCALE_VALUE) {
    currentScale += IMAGE_SCALE_STEP;
    updateScale();
  }
};

scaleDecreaseButton.addEventListener('click', onDecreaseClick);
scaleIncreaseButton.addEventListener('click', onIncreaseClick);

const onEditorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditor();
  }
};

const onEditorCloseClick =  () => {
  closeEditor();
};

const showEditor = () => {
  document.body.classList.add('modal-open');
  imageEdit.classList.remove('hidden');

  currentScale = MAX_SCALE_VALUE;
  setCurrentEffect(DEFAULT);
  updateScale();
  updateImageFilter();
  hideSlider();

  editorCloseButton.addEventListener('click', onEditorCloseClick);
  document.addEventListener('keydown', onEditorEscKeydown);
};

export { showEditor };

function closeEditor () {
  document.body.classList.remove('modal-open');
  imageEdit.classList.add('hidden');

  imageUploadForm.reset();

  editorCloseButton.removeEventListener('click', onEditorCloseClick);
  document.removeEventListener('keydown', onEditorEscKeydown);
}

const onImageUpload = () => {
  pristine.validate();
  showEditor();
};

imageInputField.addEventListener('change', onImageUpload);
