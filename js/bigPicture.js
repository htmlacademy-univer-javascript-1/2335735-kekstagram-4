const bigPicturePreview = document.querySelector('.big-picture__preview');
const commentsSection = bigPicturePreview.querySelector('.social__comments');
const commentTemplate = commentsSection.querySelector('.social__comment');
const loadMoreComments = bigPicturePreview.querySelector('.comments-loader');
let activeData;

const creatComment = (data) =>{
  const comment =
  (commentTemplate.cloneNode(true));
  comment.querySelector('.social__picture').setAttribute('src', data.avatar);
  comment.querySelector('.social__picture').setAttribute('alt', data.name);
  comment.querySelector('.social__text').textContent = data.message;

  return comment;
};

const onMoreButtonClick = () => {
  const newComments = activeData.comments.splice(0, 5).map(creatComment);
  const shown = activeData.commentsTotal - activeData.comments.length;

  bigPicturePreview.querySelector('.comments-shown').textContent = String(shown);
  commentsSection.append(...newComments);
  loadMoreComments.classList.toggle('hidden', shown === activeData.commentsTotal);
};


const previewLoad = (data) => {
  activeData = {
    ...structuredClone(data),
    commentsTotal: data.comments.length
  };

  bigPicturePreview.querySelector('.big-picture__img img').setAttribute('src', activeData.url);
  bigPicturePreview.querySelector('.social__caption').textContent = activeData.description;
  bigPicturePreview.querySelector('.likes-count').textContent = String(activeData.likes);
  bigPicturePreview.querySelector('.comments-count').textContent = String(activeData.commentsTotal);
  commentsSection.replaceChildren();
  loadMoreComments.addEventListener('click', onMoreButtonClick);
  loadMoreComments.click();
};

export default previewLoad;
