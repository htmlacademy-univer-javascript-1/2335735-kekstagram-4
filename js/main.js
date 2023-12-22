/* eslint-disable no-console */
import '/js/forms.js';
import {doFetch} from './fetch.js';
import {close, showServerErrorMessage} from './forms.js';
import {filterPictures, showFilters, hideFilters} from './filters.js';

doFetch()
  .then((data) => {
    close();
    filterPictures(data);
    showFilters();
  })
  .catch(() => {
    hideFilters();
    showServerErrorMessage();
  });
