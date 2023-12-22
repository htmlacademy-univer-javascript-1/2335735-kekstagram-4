/* eslint-disable*/

function bigPicture(picture) {
  let big = document.querySelector('.big-picture');
  picture.addEventListener('click', function(){
    big.hidden = false;
  });
};

export {bigPicture};
