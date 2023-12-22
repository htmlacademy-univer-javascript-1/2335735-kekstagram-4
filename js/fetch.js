const Urls = {
  'get': 'https://29.javascript.pages.academy/kekstagram/data',
  'POST': 'https://29.javascript.pages.academy/kekstagram'
};

const doFetch = () => fetch(Urls.get)
  .then((response) => response.json())
  .then((data) => Promise.resolve(data))
  .catch(() => Promise.reject());

const sendData = (evt) => {
  evt.preventDefault();
  const dataForm = new FormData(evt.target);
  return fetch(
    Urls.POST,
    {
      method: 'POST',
      body: dataForm
    })
    .then((response) => {
      if (response.ok) {
        return Promise.resolve();
      }
      throw new Error();
    }
    )
    .catch(() => Promise.reject());
};

export {doFetch, sendData};