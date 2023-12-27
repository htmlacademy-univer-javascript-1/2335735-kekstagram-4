const Effect = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const effectRangeMap = {
  [Effect.NONE]: [0, 100, 1],
  [Effect.CHROME]: [0, 1, .1],
  [Effect.SEPIA]: [0, 1, .1],
  [Effect.MARVIN]: [0, 100, 1],
  [Effect.PHOBOS]: [0, 3, .1],
  [Effect.HEAT]: [1, 3, .1]
};

const effectFormatterMap = {
  [Effect.NONE]: () => '',
  [Effect.CHROME]: (value) => `grayscale(${value})`,
  [Effect.SEPIA]: (value) => `sepia(${value})`,
  [Effect.MARVIN]: (value) => `invert(${value}%)`,
  [Effect.PHOBOS]: (value) => `blur(${value}px)`,
  [Effect.HEAT]: (value) => `brightness(${value})`
};

const sliderNav = (name) => {
  const [min, max, step] = effectRangeMap[name];
  const format = {
    to: effectFormatterMap[name],
    from: Number
  };

  return {
    range: {min, max},
    step,
    start: max,
    format,
    behaviour: 'snap',
    connect: 'lower'
  };
};

const imgPreview = document.querySelector('.img-upload__preview img');
const scale = document.querySelector('.img-upload__scale');
const Effectselector = document.querySelector('.img-upload__effects');
const effectLevel = document.querySelector('.effect-level__value');

const effectSlider = noUiSlider.create(
  document.querySelector('.effect-level__slider'),
  sliderNav(Effect.NONE)
);

const imgLoad = (url) => {
  imgPreview.setAttribute('src', url);
  Effectselector.querySelectorAll('span').forEach((span) => {
    span.style.setProperty('background-image', `url(${url})`);
  });
};

const scaleSwitch = (percent) => {
  imgPreview.style.setProperty('transform', `scale(${percent / 100})`);
  scale.querySelector('input').setAttribute('value', `${percent}%`);
};

const selectEffect = (name) => {
  imgPreview.setAttribute('class', `effects__preview--${name}`);
  effectSlider.updateOptions(sliderNav(name));
  effectLevel.parentElement.classList.toggle('hidden', name === Effect.NONE);
};

const onScaleSwitchClick = (event) => {
  const [less, input, more] = scale.querySelectorAll('input, button');
  const degree = Number.parseFloat(input.getAttribute('value'));

  switch (event.target) {
    case less:
      scaleSwitch(Math.max(degree - Scale.STEP, Scale.MIN));
      break;
    case more:
      scaleSwitch(Math.min(degree + Scale.STEP, Scale.MAX));
      break;
  }
};

const onEffectSwitch = (event) => {
  const name = event.target.getAttribute('value');
  selectEffect(name);
};

const effectSwitched = () => {
  imgPreview.style.setProperty('filter', effectSlider.get());
  effectLevel.setAttribute('value', effectSlider.get(true));
};

const updatePreview = (data) => {
  imgLoad(URL.createObjectURL(data));
  scaleSwitch(Scale.MAX);
  selectEffect(Effect.NONE);
  scale.addEventListener('click', onScaleSwitchClick);
  Effectselector.addEventListener('change', onEffectSwitch);
  effectSlider.on('update', effectSwitched);
};

export default updatePreview;
