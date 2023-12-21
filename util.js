import {MESSAGE} from '/js/data.js';
import {NAME} from '/js/data.js';
import {DESCRIPTION} from '/js/data.js';

const createComment = function(id){
  return {
    id: id,
    avatar: `img/avatar--${Math.floor(Math.random() * 5)+1}.svg`,
    message: MESSAGE[Math.floor(Math.random() * MESSAGE.length)],
    name: NAME[Math.floor(Math.random() * NAME.length)]
  };
};

const createImage = function(id){
  let comments = [];
  for (var i = 0; i < Math.floor(Math.random() * 30); i++){

    comments[i] = createComment(Math.floor(Math.random() * 9999999999));
  }
  return {
    id: id,
    url: `photos/${id+1}.jpg`,

    description: DESCRIPTION[Math.floor(Math.random() * DESCRIPTION.length)],
    likes: Math.floor(Math.random() * 176) + 15,
    comments: comments
  };
};

export{createComment};
export {createImage};


