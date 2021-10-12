/** === IMPORT PACKAGE === */
import { set } from 'lodash';
import apiHost from './apiHost';
/** === IMPORT MODEL === */
import { ErrorProps } from '@models';
/** === FUNCTION === */
const apiUploadImage = async <T>(imageUri: string): Promise<T> => {
  /** === SET HEADER === */
  const headers = {};
  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'multipart/form-data');
  set(headers, 'X-Platform', 'sinbad-app');
  /** === SET BODY === */
  var body = new FormData();
  body.append('file', {
    uri: imageUri,
    name: 'sinbad-app',
    type: 'image/jpeg',
  });
  /** === HANDLE ERROR RESPONSE === */
  const handleErrors = (response: any) => {
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
    return response.json().then((data: T) => data);
  };
  /** === HANDLE MAIN ERROR RESPONSE === */
  const handleMainErrors = (error: ErrorProps) => {
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
  // console.log(reqBody);
  /** === MAIN FUNCTION === */
  return fetch(`${apiHost.base}/common/api/v1/shared/public/files`, {
    method: 'POST',
    headers,
    body,
  })
    .then(handleErrors)
    .then(handleSuccess)
    .catch(handleMainErrors);
};

export default apiUploadImage;
