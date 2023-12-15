const imageUploadForm = document.querySelector('#upload-select-image');
const uploadButton = document.querySelector('#upload-submit');

const pristine = new Pristine(imageUploadForm, {
  classTo:'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'error-message'
});

const checkValidation = () => {
  if (!pristine.validate()) {
    uploadButton.setAttribute('disabled', '');
  } else {
    uploadButton.removeAttribute('disabled');
  }
};

export { pristine, checkValidation };
