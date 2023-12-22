import {MESSAGE} from '/js/data.js';
import {NAME} from '/js/data.js';
import {DESCRIPTION} from '/js/data.js';
import {drawPictures} from '/js/draw.js';

const createPhoto = function(picture){
  return {
    id: picture.id,
    url: picture.url,
    description: picture.description,
    likes: picture.likes,
    comments: picture.comments
  };
};

const createArray = (pictures) =>{
  const photos = [];
  let i = 0;
  pictures.forEach((picture) => {
    photos[i] = (createPhoto(picture));
    i+=1;
  });
  drawPictures(photos);
};

const deletePictures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const createError = (errorText) => {
  const error = document.createElement('div');
  error.style.backgroundColor = '#8C191B';
  error.style.left = 0;
  error.style.right = 0;
  error.style.top = 0;
  error.style.fontSize = `${30}px`;
  error.style.textAlign = 'center';
  error.style.position = 'absolute';
  error.style.padding = `${20}px`;
  error.textContent = errorText;
  document.body.append(error);
};

const randNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randArrayElem = (list) => list[randNumber(0, list.length - 1)];

const randArrayElemInAmount = (list, amount) => {
  const randomPictures = [];
  for (let i = 0; i < amount; i++) {
    let randomPicture = randArrayElem(list);
    while (randomPictures.includes(randomPicture)) {
      randomPicture = randArrayElem(list);
    }
    randomPictures.push(randomPicture);
  }
  return randomPictures;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {deletePictures, debounce, randArrayElemInAmount};
export {createError};
export {createArray};


