function drawImages (photos) {
    let imgContainer = document.querySelector('.pictures');
    let imgTemplate = document.querySelector('#picture').content;
  
    for (var i = 0; i<photos.length; i++){
      var newImage = imgTemplate.cloneNode(true);
      newImage.querySelector("a > img").src = photos[i].url;
      newImage.children[0].children[0].alt = photos[i].description;
      newImage.children[0].children[1].children[1].textContent = photos[i].likes;
      newImage.children[0].children[1].children[0].textContent = photos[i].comments.length;
      imgContainer.appendChild(newImage);
    }
  };
  export {drawImages};