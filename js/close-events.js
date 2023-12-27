const escBtnClicked = (event) =>{
  const escKey = event.key.startsWith('Esc');
  const input = event.target.matches('input[type="text"], textarea');

  if (escKey && !input) {
    const cancelButton = document.querySelector('.overlay:not(.hidden) .cancel');

    cancelButton.click();
  }
};

const cancelBtnClicked = (event) => {
  const bigPicture = event.target.closest('.overlay');
  bigPicture.classList.add('hidden');

  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escBtnClicked);
};

const bigPictureOpened = (popup) => {
  const cancelBtn = popup.querySelector('.cancel');

  popup.classList.remove('hidden');
  popup.scroll(0, 0);
  cancelBtn.addEventListener('click', cancelBtnClicked);

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', escBtnClicked);
};

export default bigPictureOpened;
