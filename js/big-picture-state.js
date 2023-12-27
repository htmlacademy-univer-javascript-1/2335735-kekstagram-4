const onEscBtnClicked = (event) => {
  if(event.key.startsWith('Esc')) {
    const popup = document.querySelector('.success, .error');
    popup.click();
    event.stopPropagation();
  }
};

const onBigPictureClick = (event) => {
  if(event.target.matches('section, button')){
    event.currentTarget.remove();
    document.removeEventListener('keydown', onEscBtnClicked, true);
  }
};

const bigPictureState = (type, data = {}) => {
  const popupTemplate = document.querySelector(`#${type}`);
  const popup = (popupTemplate.content.querySelector(`.${type}`).cloneNode(true));

  Object.keys(data).forEach((key) => {
    popup.querySelector(`.${type}__${key}`).textContent = data[key];
  });

  popup.addEventListener('click', onBigPictureClick);
  document.addEventListener('keydown', onEscBtnClicked, true);
  document.body.append(popup);
};

export default bigPictureState;
