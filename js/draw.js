/* eslint-disable*/
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

      let startNumOfComments = 0;
      if (photos[i].comments.length <= 5){
        startNumOfComments = photos[i].comments.length;
        big.querySelector('.comments-loader').classList.add('hidden');
      }
      else{
        startNumOfComments = 5;
        big.querySelector('.comments-loader').classList.remove('hidden');
      }

      for (let comm = 0; comm < startNumOfComments;comm++){
        const newComment = newComm.cloneNode(true);
        big.querySelector('.social__comments').appendChild(newComment);
      }

      for (let comm = 0; comm < startNumOfComments;comm++){
        big.querySelector('.social__comments').children[comm].children[0].src = photos[i].comments[comm].avatar;
        big.querySelector('.social__comments').children[comm].children[0].alt = photos[i].comments[comm].name;
        big.querySelector('.social__comments').children[comm].children[1].textContent = photos[i].comments[comm].message;
      }

      big.querySelector('.social__caption').textContent = photos[i].description;
      big.querySelector('.social__comment-count').classList.add('hidden');
      document.body.classList.add('modal-open');

      big.querySelector('.comments-loader').addEventListener('click', (e) =>{
        e.preventDefault();
        big.querySelector('.comments-loader').classList.add('hidden');
        big.querySelector('.social__comment-count').classList.add('hidden');
        if (photos[i].url == big.querySelector('.big-picture__img').children[0].src.slice(22)){
          for (let unseen = startNumOfComments; unseen < photos[i].comments.length; unseen++) {
            const newComment = newComm.cloneNode(true);
            big.querySelector('.social__comments').appendChild(newComment);
            big.querySelector('.social__comments').children[unseen].children[0].src = photos[i].comments[unseen].avatar;
            big.querySelector('.social__comments').children[unseen].children[0].alt = photos[i].comments[unseen].name;
            big.querySelector('.social__comments').children[unseen].children[1].textContent = photos[i].comments[unseen].message;
          }
        }
      });

      big.children[1].children[2].addEventListener('click', (e)=> {
        e.preventDefault();
        big.classList.add('hidden');
        big.querySelector('.social__comment-count').classList.add('hidden');
        big.querySelector('.social__comment-count').classList.add('hidden');
        big.querySelector('.comments-loader').classList.add('hidden');
        document.body.classList.remove('modal-open');
      });

      const isEscapeKey = (evt) => evt.key === 'Escape';
      const successfullEscapeKey = (evt) => {
        if (isEscapeKey(evt)) {
          evt.preventDefault();
          big.classList.add('hidden');
        }
      };

      document.addEventListener('keydown', successfullEscapeKey);
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