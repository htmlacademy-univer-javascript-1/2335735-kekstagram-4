/* eslint-disable no-console */
import '/js/forms.js';
import {doFetch} from './fetch.js';
import {createError} from './util.js';
import {createArray} from './util.js';

doFetch(
  createArray,
  createError,
  'get');





