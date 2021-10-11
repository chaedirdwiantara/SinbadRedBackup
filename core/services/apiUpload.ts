/** === IMPORT PACKAGE === */
import { set, isEmpty } from 'lodash';
import apiHost from './apiHost';
import RNFetchBlob from 'rn-fetch-blob';
const { fs, wrap } = RNFetchBlob;
const axios = require('axios');
/** === IMPORT MODEL === */
import { ErrorProps } from '@models';
/** === FUNCTION === */
const apiUpload = async <T>(imageUri: string): Promise<T> => {
  var formData = new FormData();
  const img = imageUri.replace('file://', '');
  // fs.readFile(imageUri, 'base64').then((data) => {
  //   console.log(data);
  // });
  // formData.append('file', {
  //   uri: wrap(img),
  //   type: 'image/jpeg',
  //   name: 'testddd.jpg',
  // });

  // console.log(fs.dirs.CacheDir);

  formData.append('file', wrap(imageUri));
  /** === SET HEADER === */
  const headers = {};
  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'multipart/form-data');
  // set(headers, 'X-Platform', 'sinbad-app');
  /** === SET BODY === */
  const reqBody = {
    method: 'POST',
    headers,
  };
  Object.assign(reqBody, {
    // credentials: 'same-origin',
    body: formData,
  });
  /** === HANDLE ERROR RESPONSE === */
  const handleErrors = (response: any) => {
    console.log(response);
    if (!response.ok) {
      if (response.headers.map['content-type'] === 'text/html') {
        throwError(response);
      }
      return response.json().then((error: ErrorProps) => {
        throwFinalError(error);
      });
    }
    return response;
  };
  /** === HANDLE SUCCESS RESPONS === */
  const handleSuccess = (response: any) => {
    console.log(response);
    return response.json().then((data: T) => data);
  };
  /** === HANDLE MAIN ERROR RESPONSE === */
  const handleMainErrors = (error: ErrorProps) => {
    console.log(error);
    throwFinalError(error);
  };
  /** === THROW ERROR === */
  const throwError = (response: any) => {
    throw {
      status: response.status,
      message: response.statusText,
      errorMessage: 'Data Error From Header',
      type: response.type,
      code: 0,
    };
  };
  /** === THROW FINAL ERROR === */
  const throwFinalError = (error: ErrorProps) => {
    throw {
      status: error.status,
      message: error.message,
      errorMessage: error.errorMessage,
      type: error.type,
      code: error.code,
    };
  };
  console.log(reqBody);
  /** === MAIN FUNCTION === */
  return fetch('https://file.io/', reqBody)
    .then(handleErrors)
    .then(handleSuccess)
    .catch(handleMainErrors);
};

export default apiUpload;
