/** === IMPORT PACKAGE === */
import { set, isEmpty } from 'lodash';
/** === IMPORT MODEL === */
import { ErrorProps } from '@model/index';
/** === FUNCTION === */
const apiMock = async <T>(
  mockHost: string,
  path: string,
  module: string,
  version: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7',
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  params?: object,
): Promise<T> => {
  /** === SET HEADER === */
  const headers = {};
  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');
  set(headers, 'X-Platform', 'sinbad-app');
  /** === SET BODY === */
  const reqBody = {
    method,
    headers,
  };
  /** === IF THERE IS PARAMETER === */
  if (!isEmpty(params)) {
    Object.assign(reqBody, { body: JSON.stringify(params) });
  }
  /** === HANDLE SUCCESS RESPONS === */
  const handleSuccess = (response: any) => {
    return response.json().then((data: T) => data);
  };
  /** === HANDLE ERROR RESPONSE === */
  const handleErrors = (response: any) => {
    if (!response.ok) {
      return response.json().then((error: ErrorProps) => {
        throwError(error);
      });
    }
    return response;
  };
  /** === HANDLE MAIN ERROR RESPONSE === */
  const handleMainErrors = (error: ErrorProps) => {
    throwError(error);
  };
  /** === THROW ERROR === */
  const throwError = (error: ErrorProps) => {
    throw {
      message: error.message ? error.message : 'Network request failed',
      data: error.data ? error.data : 'Network request failed',
      type: error.type ? error.type : 'NaN',
      code: error.code ? error.code : 500,
    };
  };
  /** === MAIN FUNCTION === */
  return fetch(`${mockHost}/api/${version}/sinbad-app/${path}`, reqBody)
    .then(handleErrors)
    .then(handleSuccess)
    .catch(handleMainErrors);
};

export default apiMock;
