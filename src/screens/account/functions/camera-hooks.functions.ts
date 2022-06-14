import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '@actions';
import * as models from '@models';
import { useNavigation } from '@react-navigation/core';

export const useCamera = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { capturedImage } = useSelector((state: any) => state.global);
  const openCamera = (
    type: 'ktp' | 'npwp' | 'selfie' | 'store' | 'custom',
    params: models.ICamera = {
      focusPoints: [{ focusPointHeight: 0.32, focusPointWidth: 0.9 }],
      title: 'Ambil Foto E-KTP',
      subtitle: 'Posisikan KTP Anda tepat berada di dalam bingkai',
    },
  ) => {
    switch (type) {
      case 'npwp': {
        params.focusPoints = [{ focusPointHeight: 0.32, focusPointWidth: 0.9 }];
        params.title = 'Ambil Foto NPWP';
        params.subtitle = 'Posisikan NPWP Anda tepat berada di dalam bingkai.';
        break;
      }
      case 'selfie': {
        params.focusPoints = [
          { focusPointHeight: 0.32, focusPointWidth: 0.9, marginBottom: 24 },
          { focusPointHeight: 0.18, focusPointWidth: 0.6 },
        ];
        params.title = 'Ambil Foto Diri dengan KTP';
        params.subtitle =
          'Posisikan foto diri dan KTP Anda tepat berada dalam bingkai.';
        break;
      }
      case 'store': {
        params.title = 'Ambil Foto Depan Toko';
        params.subtitle =
          'Posisikan depan toko Anda tepat berada di dalam bingkai.';
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
