/** === IMPORT PACKAGE === */
import { set, isEmpty } from 'lodash';
import apiHost from './apiHost';
import { NavigationAction } from '@navigation';
import { uniqueId } from '@core/functions/global/device-data';
/** === IMPORT MODEL === */
import { ErrorProps } from '@models';
/** === FUNCTION === */
const apiGeneral = async <T>(
  access: 'public' | 'auth',
  path: string,
  module: string,
  version: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7',
  method: 'GET' | 'POST' | 'PATCH' | 'PUT',
  params?: object,
): Promise<T> => {
  /** === SET HEADER === */
  const headers = {};
  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');
  set(headers, 'x-platform', 'sinbad-app');
  set(headers, 'x-device-id', uniqueId);
  /** === SET BODY === */
  const reqBody = {
    method,
    headers,
  };
  Object.assign(reqBody, {
    credentials: 'same-origin',
  });
  /** === IF THERE IS PARAMETER === */
  if (!isEmpty(params)) {
    Object.assign(reqBody, {
      credentials: 'same-origin',
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
        if (response.status === 401) {
          NavigationAction.navigate('LoginPhoneView');
        }
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
  return fetch(
    `${apiHost.base}/${module}/api/${version}/sinbad-app/${
      access === 'public' ? 'public/' : ''
    }${path}`,
    reqBody,
  )
    .then(handleErrors)
    .then(handleSuccess)
    .catch(handleMainErrors);
};

export default apiGeneral;
