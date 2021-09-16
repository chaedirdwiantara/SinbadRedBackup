import React, { useEffect, useState } from 'react';
import { formatter } from './auth-utils.functions';

export const useInputPhone = () => {
  const [value, setValue] = useState('');
  const [valMsgError, setValMsgError] = useState('');
  const [type, setType] = useState('default');

  useEffect(() => {
    const numberCountIsValid = /^[0-9]{10,14}$/.test(value);
    const numberFormatIsValid = /^08[0-9]$/.test(value) && value.length > 1;

    if (value && !numberFormatIsValid && value[1] !== '8') {
      setType('error');
      setValMsgError('No. HP harus diawali dengan 08');
    } else if (value && !numberCountIsValid) {
      setType('error');
      setValMsgError('No. HP harus 10-14 digit');
    } else {
      setType('default');
      setValMsgError('');
    }
  }, [value]);

  const onChangeText = (text: string) => {
    setType('default');
    text = text.replace(/[^0-9]/g, '');
    setValue(text);
  };

  const setMessageError = (message: string) => {
    setType('error');
    setValMsgError(message);
  };

  const clearText = () => {
    setValue('');
    setValMsgError('');
    setType('default');
  };

  return {
    value,
    type,
    onChangeText,
    valMsgError,
    clearText,
    maxLength: 16,
    labelText: 'Nomor Handphone',
    placeholder: 'Masukkan nomor handphone anda',
    setMessageError,
  };
};

export const useInput = (initialState: string = '') => {
  const [value, setValue] = useState(initialState);
  const [valMsgError, setValMsgError] = useState('');
  const [type, setType] = useState('default');

  const onChangeText = (text: string) => {
    setType('default');
    setValue(text);
  };

  const clearText = () => {
    setValue('');
    setValMsgError('');
    setType('default');
  };

  const setMessageError = (message: string) => {
    setType('error');
    setValMsgError(message);
  };

  return {
    value,
    type,
    onChangeText,
    valMsgError,
    clearText,
    maxLength: 32,
    setMessageError,
  };
};

export const useInputFormat = (format: 'npwp' | 'ktp') => {
  const [value, setValue] = useState('');
  const [valMsgError, setValMsgError] = useState('');

  React.useEffect(() => {
    console.log(valMsgError);
  }, [valMsgError]);

  const onChangeText = (text: string) => {
    let formatted = '';
    switch (format) {
      case 'ktp': {
        text = text.substr(0, 16);
        formatted = formatter(text, [6, 12], '-');
        setValue(formatted);
        break;
      }
      case 'npwp': {
        text = text.substr(0, 15);
        formatted = formatter(text, [2, 5, 8, 9, 12, 15], '.');
        break;
      }
    }
  };
  const clearText = () => setValue('');

  return {
    value,
    type: 'default',
    onChangeText,
    clearText,
    valMsgError,
  };
};
