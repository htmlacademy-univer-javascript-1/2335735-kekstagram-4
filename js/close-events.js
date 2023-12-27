const onEscBtnClick = (event) =>{
  const escKey = event.key.startsWith('Esc');
  const input = event.target.matches('input[type="text"], textarea');

  if (escKey && !input) {
    const cancelButton = document.querySelector('.overlay:not(.hidden) .cancel');

    cancelButton.click();
  }
};

const onCancelBtnClick = (event) => {
  const bigPicture = event.target.closest('.overlay');
  bigPicture.classList.add('hidden');

  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscBtnClick);
};

const bigPictureOpened = (popup) => {
  const cancelBtn = popup.querySelector('.cancel');

  popup.classList.remove('hidden');
  popup.scroll(0, 0);
  cancelBtn.addEventListener('click', onCancelBtnClick);

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscBtnClick);
};

export default bigPictureOpened;
