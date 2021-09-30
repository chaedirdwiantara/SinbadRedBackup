/** === IMPORT PACKAGE === */
import { set, isEmpty } from 'lodash';
import apiHost from './apiHost';
/** === IMPORT MODEL === */
import { ErrorProps } from '@models';
/** === FUNCTION === */
const apiMaps = async <T>(
  path: string,
  method: 'GET' | 'POST',
  params?: object,
): Promise<T> => {
  /** === SET HEADER === */
  const headers = {};
  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');
  /** === SET BODY === */
  const reqBody = {
    method,
    headers,
  };
  /** === IF THERE IS PARAMETER === */
  if (!isEmpty(params)) {
    Object.assign(reqBody, {
      body: JSON.stringify(params),
    });
  }
  /** === HANDLE SUCCESS RESPONS === */
  const handleSuccess = (response: any) => {
    return response.json().then((data: T) => data);
  };
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
  /** === MAIN FUNCTION === */
  return fetch(`${apiHost.maps}/${path}`, reqBody)
    .then(handleErrors)
    .then(handleSuccess)
    .catch(handleMainErrors);
};

export default apiMaps;
