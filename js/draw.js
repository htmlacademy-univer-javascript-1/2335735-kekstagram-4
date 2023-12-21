const newComm = document.querySelector('.big-picture').querySelector('.social__comments').children[0].cloneNode(true);
document.querySelector('.big-picture').querySelector('.social__comments').removeChild(document.querySelector('.big-picture').querySelector('.social__comments').children[1]);
document.querySelector('.big-picture').querySelector('.social__comments').removeChild(document.querySelector('.big-picture').querySelector('.social__comments').children[0]);

function bigPicture(photos) {
  const pictures = document.querySelectorAll('.picture');
  for (let i = 0; i<pictures.length; i++){
    pictures[i].addEventListener('click', (evt)=> {
      const big = document.querySelector('.big-picture');
      evt.preventDefault();
      big.classList.remove('hidden');

      big.querySelector('.big-picture__img').children[0].src = photos[i].url;
      big.querySelector('.likes-count').textContent = photos[i].likes;
      big.querySelector('.comments-count').textContent = photos[i].comments.length;

      while (big.querySelector('.social__comments').childElementCount !== 0){
        big.querySelector('.social__comments').removeChild(big.querySelector('.social__comments').children[0]);
      }

      for (let comm = 0; comm<photos[i].comments.length;comm++){
        const newComment = newComm.cloneNode(true);
        big.querySelector('.social__comments').appendChild(newComment);
      }

      for (let comm = 0; comm<photos[i].comments.length;comm++){
        big.querySelector('.social__comments').children[comm].children[0].src = photos[i].comments[comm].avatar;
        big.querySelector('.social__comments').children[comm].children[0].alt = photos[i].comments[comm].name;
        big.querySelector('.social__comments').children[comm].children[1].textContent = photos[i].comments[comm].message;
      }

      big.querySelector('.social__caption').textContent = photos[i].description;
      big.querySelector('.social__comment-count').classList.add('hidden');
      big.querySelector('.comments-loader').classList.add('hidden');
      document.body.classList.add('modal-open');

      big.children[1].children[2].addEventListener('click', (e)=> {
        e.preventDefault();
        big.classList.add('hidden');
        big.querySelector('.social__comment-count').classList.remove('hidden');
        big.querySelector('.comments-loader').classList.remove('hidden');
        document.body.classList.remove('modal-open');
      });

    });
  }
}

function drawPictures (photos) {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;

  for (let i = 0; i<photos.length; i++){
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('a > img').src = photos[i].url;
    newPicture.children[0].children[0].alt = photos[i].description;
    newPicture.children[0].children[1].children[1].textContent = photos[i].likes;
    newPicture.children[0].children[1].children[0].textContent = photos[i].comments.length;
    picturesContainer.appendChild(newPicture);

  }
  bigPicture(photos);
}
export {drawPictures};

