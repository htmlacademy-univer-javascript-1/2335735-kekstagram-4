function bigPicture(picture) {
  let big = document.querySelector('.big-picture');
  console.log(big);
  picture.addEventListener('click', function(){
    big.hidden = false;

  });
};

export {bigPicture};
