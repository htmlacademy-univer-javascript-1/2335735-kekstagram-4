import {pristine, checkValidation} from './validation.js';

const commentInput = document.querySelector('.text__description');

const validateComment = (value) => {
  if (value.length > 140) {
    return false;
  }
  return true;
};

const getCommentErrorMessage = () => 'Длина комментария не должна превышать 140 символов';

pristine.addValidator(commentInput, validateComment, getCommentErrorMessage);

const onCommentInput = () => {
  checkValidation();
};

commentInput.addEventListener('input', onCommentInput);
commentInput.addEventListener('keydown', (evt) => evt.stopPropagation());
