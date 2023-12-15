import {pristine} from './validation.js';
import '/js/hastagValidation.js';
import '/js/commentValidation.js';

const imageUploadForm = document.querySelector('#upload-select-image');
const imageInputField = document.querySelector('.img-upload__input');
const imageEdit = document.querySelector('.img-upload__overlay');
const editorCloseButton = imageEdit.querySelector('.img-upload__cancel');
const isEscapeKey = (evt) => evt.key === 'Escape';

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


  editorCloseButton.addEventListener('click', onEditorCloseClick);
  document.addEventListener('keydown', onEditorEscKeydown);
};

export {showEditor};

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
