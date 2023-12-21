const Urls = {
  'get': 'https://29.javascript.pages.academy/kekstagram/data',
  'POST': 'https://29.javascript.pages.academy/kekstagram'
};

const doFetch = (onSuccess, onFail, method, body) => {
  fetch(Urls[method], {
    method: method,
    body
  })
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch((message) => {
      onFail(message);
    });
};

export {doFetch};
