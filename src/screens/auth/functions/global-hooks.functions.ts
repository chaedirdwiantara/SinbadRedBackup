import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatter } from './auth-utils.functions';
import * as Actions from '@actions';
import * as models from '@models';
import { useNavigation } from '@react-navigation/core';
import { IListSelection } from '@models';

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

export const useCamera = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { capturedImage } = useSelector((state: any) => state.global);
  const openCamera = (
    type: 'ktp' | 'npwp' | 'selfie' | 'store' | 'custom',
    params: models.ICamera = {
      focusPoints: [{ focusPointHeight: 0.32, focusPointWidth: 0.9 }],
      title: 'Ambil Foto KTP',
      subtitle: 'Posisikan KTP Anda tepat berada di dalam bingkai',
    },
  ) => {
    switch (type) {
      case 'npwp': {
        params.focusPoints = [{ focusPointHeight: 0.32, focusPointWidth: 0.9 }];
        params.title = 'Ambil Foto NPWP';
        params.subtitle = 'Posisikan NPWP Anda tepat berada di dalam bingkai';
        break;
      }
      case 'selfie': {
        params.focusPoints = [
          { focusPointHeight: 0.32, focusPointWidth: 0.9, marginBottom: 24 },
          { focusPointHeight: 0.18, focusPointWidth: 0.6 },
        ];
        params.title = 'Ambil Foto Selfie dengan KTP';
        params.subtitle =
          'Posisikan Foto Selfie dan KTP Anda tepat berada di dalam bingkai';
        break;
      }
      case 'store': {
        params.title = 'Ambil Foto Depan Toko';
        params.subtitle =
          'Posisikan depan toko Anda tepat berada di dalam bingkai';
        params.focusPoints = [{ focusPointHeight: 0.4, focusPointWidth: 0.9 }];
        break;
      }
      default: {
        break;
      }
    }
    params.type = type;
    navigate('CameraView', params);
  };

  const saveCapturedImage = (data: any) => {
    dispatch(Actions.saveCapturedImage(data));
  };

  const resetCamera = () => {
    dispatch(Actions.saveCapturedImage(null));
  };

  return {
    openCamera,
    saveCapturedImage,
    capturedImage,
    resetCamera,
  };
};

export const useUploadImage = () => {
  const dispatch = useDispatch();
  const { uploadedImage } = useSelector((state: any) => state.global);

  const uploadImage = (data: models.IUploadImage) => {
    dispatch(Actions.uploadImageProcess(data));
  };

  const resetUploadImage = () => {
    dispatch(Actions.resetUploadImage());
  };

  return {
    uploadImage,
    resetUploadImage,
    state: uploadedImage,
  };
};

export const useTextFieldSelect = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { listSelection, selectedItem } = useSelector(
    (state: any) => state.global,
  );

  const gotoSelection = (data: IListSelection) => {
    resetSelectedItem();
    resetGetSelection();
    navigate('ListAndSearchView', data);
  };

  const getSelection = (data: IListSelection) => {
    console.log(data);

    dispatch(Actions.getSelectionProcess(data));
  };

  const resetGetSelection = () => {
    dispatch(Actions.resetGetSelection());
  };

  const onSelectedItem = (data: any) => {
    dispatch(Actions.onSelectedItem(data));
  };

  const resetSelectedItem = () => {
    dispatch(Actions.onSelectedItem(null));
  };

  return {
    resetGetSelection,
    gotoSelection,
    getSelection,
    listSelection,
    selectedItem,
    onSelectedItem,
    resetSelectedItem,
  };
};

export const useInputFormat = (format: 'npwp' | 'ktp' | 'email') => {
  const [value, setValue] = useState('');
  const [valMsgError, setValMsgError] = useState('');
  const [type, setType] = useState('default');

  React.useEffect(() => {}, [valMsgError]);

  const onChangeText = (text: string) => {
    let formatted = '';
    switch (format) {
      case 'ktp': {
        text = text.substr(0, 16);
        formatted = formatter(text, [6, 12], '-');
        break;
      }
      case 'npwp': {
        text = text.substr(0, 15);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        formatted = formatter(text, [2, 5, 8, 9, 12, 15], '.');
        break;
      }
      default:
        break;
    }
    setValue(text);
  };

  // const setMessageError = (message: string) => {
  //   setType('error');
  //   setValMsgError(message);
  // };

  const clearText = () => {
    setValue('');
    setValMsgError('');
    setType('default');
  };

  return {
    value,
    type,
    onChangeText,
    clearText,
    valMsgError,
  };
};
