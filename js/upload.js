import {call} from './util.js';
import bigPictureState from './bigPictureState.js';
import updatePreview from './loadPreview.js';
import bigPictureOpened from './closeEvents.js';

const form = document.querySelector('.img-upload__form');
const popup = form.querySelector('.img-upload__overlay');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const hastagValidator = (message, validate) => {
  pristine.addValidator(form.hashtags, (value) => {
    const tags = value.toLowerCase().split(' ').filter(Boolean);
    return validate(tags);
  }, message, 1, true);
};

const decriptionValidator = (message, validate) => {
  pristine.addValidator (form.description, validate, message);
};

const sendFormData = async () => {
  const url = form.getAttribute('action');
  const method = form.getAttribute('method');
  const frame = new FormData(form);

  form.submitButton.setAttribute('disabled', '');

  try {
    await call(url, {method, body: frame});
    form.resetButton.click();
    bigPictureState('success');
  } 
  catch (exception) {
    bigPictureState('error');
  }

  form.submitButton.removeAttribute('disabled');
};

const formSwitch = (event) => {
  if(event.target === form.filename) {
    const data = event.target.files.item(0);
    updatePreview(data);
    bigPictureOpened(popup);
  }
};

const formSubmit = (event) => {
  event.preventDefault();

  if(pristine.validate()) {
    sendFormData();
  }
};

const formReset = () => {
  pristine.reset();
};



decriptionValidator( 'Длина описания не должна превышать 140 символов',
  (description) => description.length <= 140
);

hastagValidator( 'Хэштеги должны начинаться с символа(#) решетка',
  (tags) => tags.every((tag) => tag.startsWith('#'))
);

hastagValidator( 'После решетки(#) идут буквы/цифры',
  (tags) => tags.every((tag) => /^#[a-zа-яё0-9]+$/.test(tag))
);

hastagValidator( 'Максимальная длина одного хэштэга не более 20 символов',
  (tags) => tags.every((tag) => tag.length <= 20)
);

hastagValidator( 'Хэштеги не должны повторятся',
  (tags) => tags.length === new Set(tags).size
);

hastagValidator( 'Не более 5 хэштегов',
  (tags) => tags.length <= 5
);

form.addEventListener('change', formSwitch);
form.addEventListener('submit', formSubmit);
form.addEventListener('reset', formReset);
