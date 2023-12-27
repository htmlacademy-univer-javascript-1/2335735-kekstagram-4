const escBtnClicked = (event) => {
  if(event.key.startsWith('Esc')) {
    const popup = document.querySelector('.success, .error');
    popup.click();
    event.stopPropagation();
  }
};

const bigPictureClicked = (event) => {
  if(event.target.matches('section, button')){
    event.currentTarget.remove();
    document.removeEventListener('keydown', escBtnClicked, true);
  }
};

const bigPictureState = (type, data = {}) => {
  const popupTemplate = document.querySelector(`#${type}`);
  const popup = (popupTemplate.content.querySelector(`.${type}`).cloneNode(true));

  Object.keys(data).forEach((key) => {
    popup.querySelector(`.${type}__${key}`).textContent = data[key];
  });
  popup.addEventListener('click', bigPictureClicked);
  document.addEventListener('keydown', escBtnClicked, true);
  document.body.append(popup);
};

export default bigPictureState;
