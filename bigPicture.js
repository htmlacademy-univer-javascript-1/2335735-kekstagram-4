function bigPicture(picture) {
  var big = document.querySelector('.big-picture');
  console.log(big);
  picture.addEventListener('click', function(){
    big.hidden = false;

  });
};

export {bigPicture};
