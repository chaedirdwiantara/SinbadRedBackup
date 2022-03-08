import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatter } from './auth-utils.functions';
import * as Actions from '@actions';
import * as models from '@models';
import { useNavigation } from '@react-navigation/core';

const DEFAULT_VEHICLE_ACCESS_AMOUNT = [
  { id: 1, name: '1 Kendaraan', value: 1 },
  { id: 2, name: '2 Kendaraan', value: 2 },
];

export const useInputPhone = () => {
  const [value, setValue] = useState('');
  const [valMsgError, setValMsgError] = useState('');
  const [type, setType] = useState('default');

  const onChangeText = (text: string) => {
    setType('default');
    text = text.replace(/[^0-9]/g, '');
    setValue(text);
    const numberCountIsValid = /^[0-9]{10,14}$/.test(text);
    const numberFormatIsValid = /^08[0-9]$/.test(text) && text.length > 1;

    if (text && !numberFormatIsValid && text.slice(0, 2) !== '08') {
      setType('error');
      setValMsgError('No. HP harus diawali dengan 08');
    } else if (text && !numberCountIsValid) {
      setType('error');
      setValMsgError('No. HP harus 10-14 digit');
    } else {
      setType('default');
      setValMsgError('');
    }
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
    maxLength: 14,
    labelText: 'Masukkan Nomor Handphone',
    placeholder: 'Masukkan nomor handphone anda',
    setMessageError,
    setType,
  };
};

export const useInput = (
  initialState: string = '',
  fieldType: 'string-only' | 'number-only' | 'default' = 'default',
) => {
  const [value, setValue] = useState(initialState);
  const [valMsgError, setValMsgError] = useState('');
  const [type, setType] = useState('default');

  const onChangeText = (text: string) => {
    setType('default');
    switch (fieldType) {
      case 'number-only': {
        text = text.replace(/[^0-9]/g, '');
        break;
      }
      case 'string-only': {
        text = text.replace(/[0-9]/g, '');
        break;
      }
      case 'default':
      default:
        break;
    }
    setValue(text);
  };

  const clearText = () => {
    setValue('');
    setValMsgError('');
    setType('default');
  };

  const setMessageError = (message: string) => {
    if (message !== '') {
      setType('error');
      setValMsgError(message);
    } else {
      setType('default');
      setValMsgError('');
    }
  };

  return {
    value,
    type,
    onChangeText,
    valMsgError,
    clearText,
    maxLength: 32,
    setMessageError,
    setValue,
    setType,
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

export const useTextFieldSelect = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { listSelection, selectedItem } = useSelector(
    (state: any) => state.global,
  );

  const gotoSelection = (data: models.IListSelection) => {
    resetSelectedItem();
    resetGetSelection();
    navigate('ListAndSearchView', data);
  };

  const getSelection = (data: models.IListSelection) => {
    if (data.type === 'listVehicleAccessAmount') {
      dispatch(
        Actions.getSelectionSuccess({ data: DEFAULT_VEHICLE_ACCESS_AMOUNT }),
      );
    } else {
      dispatch(Actions.getSelectionProcess(data));
    }
  };

  const loadMoreSelection = (data: models.IListSelection) => {
    dispatch(Actions.loadMoreSelectionProcess(data));
  };

  const resetGetSelection = () => {
    dispatch(Actions.resetGetSelection());
  };

  const onSelectedItem = (data: models.IOnSelectedItem) => {
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
    loadMoreSelection,
  };
};

export const useLocations = () => {
  const dispatch = useDispatch();
  const { locations } = useSelector((state: any) => state.global);

  const getLocation = (data: models.IUrbanID) => {
    dispatch(Actions.getLocationProcess(data));
  };
  const resetLocation = () => {
    dispatch(Actions.resetLocation());
  };

  return {
    getLocation,
    locations,
    resetLocation,
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

export const useMerchant = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.auth);
  const merchantData: models.IMerchantData = state.merchantData;
  const saveStoreData = (data: models.IMerchantData) => {
    dispatch(Actions.saveStoreData(data));
  };

  const saveUserData = (data: models.User) => {
    dispatch(Actions.saveUserData(data));
  };

  const resetMerchantData = () => {
    dispatch(Actions.resetMerchantData());
  };

  return {
    saveStoreData,
    saveUserData,
    resetMerchantData,
    merchantData,
  };
};
