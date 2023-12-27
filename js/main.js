import {call} from './util.js';
import primaryCollage from './collage.js';
import bigPictureState from './big-picture-state.js';
import './upload.js';

const url = 'https://29.javascript.pages.academy/kekstagram/data';

try {
  const data = await call(url);
  primaryCollage(data);
}
catch (exception) {
  var exceptionTitle = `Ошибка: ${exception.message}`;
  const closeBtn = 'Закрыть';
  bigPictureState('error', {title: exceptionTitle, button: closeBtn});
}



