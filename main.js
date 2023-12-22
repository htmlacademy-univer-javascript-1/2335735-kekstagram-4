import {DESCRIPTION, NAME, MESSAGE} from '/js/data.js';
import {createComment, createImage} from '/js/util.js';
import {drawImages} from '/js/draw.js';


let photos = [];
for (var i = 0; i < 25; i++){
  photos[i] = createImage(i);
}

drawImages(photos);

console.log(photos);


