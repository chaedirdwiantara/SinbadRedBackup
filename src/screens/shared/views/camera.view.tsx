import { useNavigation, useRoute } from '@react-navigation/native';
import { useCamera } from '@screen/auth/functions';
import React from 'react';
import { SnbCamera } from 'react-native-sinbad-ui';
import ImageEditor from '@react-native-community/image-editor';
import RNFS from 'react-native-fs';

const CameraView = () => {
  const { goBack } = useNavigation();
  const { saveCapturedImage } = useCamera();
  const { params }: any = useRoute();
  return (
    <SnbCamera
      title={params?.title}
      subtitle={params?.subtitle}
      showFlipCameraButton={params?.type === 'selfie'}
      showFlashCameraButton={params?.type === 'selfie'}
      includeBase64
      onImageCaptured={async (result: any, resolution) => {
        let url = '';
        const width = result.width - result.width * 0.3;
        const x = result.width * 0.15;
        switch (params?.type) {
          case 'ktp':
          case 'npwp': {
            url = await ImageEditor.cropImage(result.uri, {
              offset: { x, y: result.height * 0.325 },
              size: { width, height: result.height - result.height * 0.65 },
            });
            break;
          }
          case 'selfie': {
            url = await ImageEditor.cropImage(result.uri, {
              offset: { x, y: result.height * 0.125 },
              size: { width, height: result.height - result.height * 0.325 },
            });
            break;
          }
          case 'store': {
            url = await ImageEditor.cropImage(result.uri, {
              offset: { x, y: result.height * 0.25 },
              size: { width, height: result.height - result.height * 0.5 },
            });
            break;
          }
          default:
            break;
        }
        const croppedImage = await RNFS.readFile(url, 'base64');
        saveCapturedImage({
          ...result,
          croppedImage,
          resolution,
          type: params?.type,
        });
        RNFS.unlink(url);
        goBack();
      }}
      focusPoints={params.focusPoints}
    />
  );
};

export default CameraView;
