/** === IMPORT PACKAGE === */
import { set, isEmpty } from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import CookieManager from '@react-native-cookies/cookies';
import apiHost from './apiHost';
import { uniqueId } from '@core/functions/global/device-data';
import { sentryServiceAuthError } from '@core/report/sentry/sentry-send';
/** === IMPORT MODEL === */
import { ErrorProps } from '@models';
/** === FUNCTION === */
const apiAuth = async <T>(
  path: string,
  version: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7',
  method: 'POST' | 'GET',
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
  /** === SAVE COOKIE FROM BE TO ASYNCSTORAGE === */
  const saveCookie = async (response: any) => {
    if (path === 'otp/verification' || path === 'login') {
      CookieManager.get('https://sinbad.web.id').then(async (cookie) => {
        await AsyncStorage.setItem(
          '@cookie',
          JSON.stringify(cookie['connect.sid']),
        );
      });
    }
    return response;
  };
  /** === HANDLE ERROR RESPONSE === */
  const handleErrors = (response: any) => {
    if (!response.ok) {
      if (response.headers.map['content-type'] === 'text/html') {
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
  /** === HANDLE SUCCESS RESPONS === */
  const handleSuccess = (response: any) => {
    return response.json().then((data: T) => data);
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
      data: response.statusText,
      type: response.type,
      code: response.status,
    };
  };
  /** === THROW FINAL ERROR === */
  const throwFinalError = (
    error: ErrorProps & { error: string; statusCode: number },
  ) => {
    sentryServiceAuthError({
      path,
      params,
      method,
      error,
      version,
      cookie: cookieFromAsyncStorage,
    });
    throw {
      message: error.message,
      data: error.data ? error.data : error.data,
      type: error.type ? error.type : error.error,
      code: error.code ? error.code : error.statusCode,
    };
  };
  /** === MAIN FUNCTION === */
  return fetch(`${apiHost.auth}/api/${version}/sinbad-app/${path}`, reqBody)
    .then(saveCookie)
    .then(handleErrors)
    .then(handleSuccess)
    .catch(handleMainErrors);
};

export default apiAuth;
