const DEFAULT = {
  style: {
    filter: '',
    unit: ''
  },
};

const CHROME_EFFECT = {
  sliderSettings: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  style: {
    filter: 'grayscale',
    unit: ''
  },
};

const SEPIA_EFFECT = {
  sliderSettings: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  style: {
    filter: 'sepia',
    unit: ''
  },
};

const MARVIN_EFFECT = {
  sliderSettings: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  style: {
    filter: 'invert',
    unit: '%'
  },
};

const PHOBOS_EFFECT = {
  sliderSettings: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  style: {
    filter: 'blur',
    unit: 'px'
  },
};

const HEAT_EFFECT = {
  sliderSettings: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  style: {
    filter: 'brightness',
    unit: ''
  },
};

export {
  DEFAULT,
  CHROME_EFFECT,
  SEPIA_EFFECT,
  MARVIN_EFFECT,
  PHOBOS_EFFECT,
  HEAT_EFFECT
};

import { deletePictures, createArray } from './util.js';
import { debounce, randArrayElemInAmount } from './util.js';

const RANDOM_PICTURES_COUNT = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const filters = document.querySelector('.img-filters');
const filtersForm = filters.querySelector('.img-filters__form');

let allPictures = [];

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

const hideFilters = () => {
  filters.classList.add('img-filters--inactive');
};

const compareDiscussedPictures = (firstPicture, secondPicture) => {
  const firstPictureComments = firstPicture.comments.length;
  const secondPictureComments = secondPicture.comments.length;
  return secondPictureComments - firstPictureComments;
};

const filterPictures = (pictures) => {
  allPictures = pictures;
  createArray(pictures);
};

const isButton = (evt) => evt.target.tagName === 'BUTTON';

const setFilter = {
  'filter-default': () => createArray(allPictures),
  'filter-random': () => createArray(randArrayElemInAmount(allPictures, RANDOM_PICTURES_COUNT)),
  'filter-discussed': () => createArray(allPictures.slice().sort(compareDiscussedPictures))
};

const onFiltersClick = debounce((evt) => {
  if (isButton(evt)) {
    deletePictures();
    setFilter[evt.target.id]();
  }
});

const setActiveFilter = (evt) => {
  if (isButton(evt)) {
    const currentFilter = filtersForm.querySelector(`.${ACTIVE_CLASS}`);
    currentFilter.classList.remove(ACTIVE_CLASS);

    evt.target.classList.add(ACTIVE_CLASS);
  }
};

filtersForm.addEventListener('click', onFiltersClick);

filtersForm.addEventListener('click', setActiveFilter);

export {showFilters, hideFilters, filterPictures};
