import previewLoad from './bigPicture.js';
import bigPictureOpened from './closeEvents.js';
import {debounce} from './util.js';

const filtersNav = document.querySelector('.img-filters');
const collage = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture');
const bigPicture = document.querySelector('.big-picture');
let primaryDate;

const createPicture = (data) => {
  const picture =
 (pictureTemplate.content.querySelector('.picture').cloneNode(true));
  picture.querySelector('.picture__img').setAttribute('src', data.url);
  picture.querySelector('.picture__comments').textContent = String(data.comments.length);
  picture.querySelector('.picture__likes').textContent = String(data.likes);

  picture.addEventListener('click', (event) => {
    previewLoad(data);
    bigPictureOpened(bigPicture);
    event.preventDefault();
  });

  return picture;
};

const loadPictures = (data) => {
  const pictures = collage.querySelectorAll('.picture');
  const newPictures = data.map(createPicture);

  pictures.forEach((picture) => picture.remove());
  collage.append(...newPictures);
};

const filtersNavClick = (event) => {
  const activeBtn = event.target.closest('button');

  if (!activeBtn) {
    return;
  }

  filtersNav.querySelectorAll('button').forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  activeBtn.classList.add('img-filters__button--active');
  activeBtn.dispatchEvent(new Event('change'));
};


const filtersNavSwitch = debounce((event) => {
  const data = structuredClone(primaryDate);

  switch (event.target.getAttribute('id')) {
    case 'filter-random':
      data.sort(() => Math.random() - .5).splice(10);
      break;
    case 'filter-discussed':
      data.sort((a, b) => b.comments.length - a.comments.length);
      break;
  }

  loadPictures(data);
});


const primaryCollage = (data) => {
  primaryDate = data;
  filtersNav.classList.remove('img-filters--inactive');
  filtersNav.addEventListener('click', filtersNavClick);
  filtersNav.addEventListener('change', filtersNavSwitch, true);
  loadPictures(data);
};

export default primaryCollage;
