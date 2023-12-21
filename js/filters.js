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
