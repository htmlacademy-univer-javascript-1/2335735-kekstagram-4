import {MESSAGE} from '/js/data.js';
import {NAME} from '/js/data.js';
import {DESCRIPTION} from '/js/data.js';
import {drawPictures} from '/js/draw.js';

const createComment = function(id){
  return {
    id: id,
    avatar: `img/avatar-${Math.floor(Math.random() * 5)+1}.svg`,
    message: messages[Math.floor(Math.random() * messages.length)],
    name: names[Math.floor(Math.random() * names.length)]
  };
};

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

const createError = (errorText) => {
  const errorMessage = document.createElement('div');
  errorMessage.style.backgroundColor = '#8C191B';
  errorMessage.style.left = 0;
  errorMessage.style.right = 0;
  errorMessage.style.top = 0;
  errorMessage.style.fontSize = `${30}px`;
  errorMessage.style.textAlign = 'center';
  errorMessage.style.position = 'absolute';
  errorMessage.style.padding = `${20}px`;
  errorMessage.textContent = errorText;
  document.body.append(errorMessage);
};



export {createComment};
export {createError};
export {createArray};



