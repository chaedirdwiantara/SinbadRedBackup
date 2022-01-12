/** === IMPORT PACKAGE === */
import { set, isEmpty } from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import apiHost from './apiHost';
import { NavigationAction } from '@navigation';
import { uniqueId } from '@core/functions/global/device-data';
import { sentryServiceGeneralError } from '@core/report/sentry/sentry-send';
/** === IMPORT MODEL === */
import { ErrorProps } from '@models';
/** === FUNCTION === */
const apiGeneral = async <T>(
  access: 'public' | 'auth',
  path: string,
  module: string,
  version: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7',
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  params?: object,
): Promise<T> => {
  /** === GET COOKIE FROM ASYNCSTORAGE === */
  const cookieFromAsyncStorage = await AsyncStorage.getItem('@cookie');
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
      body: JSON.stringify(params),
    });
  }
  /** === DELETE COOKIE FROM ASYNCSTORAGE WHEN USER LOGOUT === */
  const deleteCookie = async (response: any) => {
    if (path === 'logout') {
      await AsyncStorage.removeItem('@cookie');
    }
    return response;
  };
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
      return response
        .json()
        .then((error: ErrorProps & { error: string; statusCode: number }) => {
          throwFinalError(error);
        });
    }
    return response;
  };
  /** === HANDLE MAIN ERROR RESPONSE === */
  const handleMainErrors = (
    error: ErrorProps & { error: string; statusCode: number },
  ) => {
    throwFinalError(error);
  };
  /** === THROW ERROR FOR CONTENT TYPE TEXT/HTML === */
  const throwError = (response: any) => {
    throw {
      message: response.statusText,
      errorMessage: response.statusText,
      type: response.type,
      code: response.status,
    };
  };
  /** === THROW FINAL ERROR === */
  const throwFinalError = (
    error: ErrorProps & { error: string; statusCode: number },
  ) => {
    sentryServiceGeneralError({
      access,
      path,
      module,
      version,
      method,
      params,
      error,
      cookie: cookieFromAsyncStorage,
    });
    throw {
      message: error.message,
      errorMessage: error.errorMessage ? error.errorMessage : error.message,
      type: error.type ? error.type : error.error,
      code: error.code ? error.code : error.statusCode,
    };
  };
  /** === MAIN FUNCTION === */
  return fetch(
    `${apiHost.base}/${module}/api/${version}/sinbad-app/${
      access === 'public' ? 'public/' : ''
    }${path}`,
    reqBody,
  )
    .then(deleteCookie)
    .then(handleErrors)
    .then(handleSuccess)
    .catch(handleMainErrors);
};

export default apiGeneral;
