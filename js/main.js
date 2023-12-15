/* eslint-disable no-console */
import {createPhoto} from '/js/util.js';
import '/js/forms.js';
import {drawPictures} from '/js/draw.js';


const photos = [];
for (var i = 0; i < 25; i++){
  photos[i] = createPhoto(i);
}

drawPictures(photos);


