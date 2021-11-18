import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { SnbCamera } from 'react-native-sinbad-ui';
import ImageEditor from '@react-native-community/image-editor';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { contexts } from '@contexts';
import { useCamera } from '@screen/auth/functions';

const CameraView = () => {
  const { goBack } = useNavigation();
  const { save } = useUploadImageAction();
  const { params }: any = useRoute();
  const { saveCapturedImage } = useCamera();
  const { dispatchGlobal } = React.useContext(contexts.GlobalContext);
  return (
    <SnbCamera
      title={params?.title}
      subtitle={params?.subtitle}
      showFlipCameraButton={params?.type === 'selfie'}
      showFlashCameraButton={params?.type === 'selfie'}
      type={params?.type === 'selfie' ? 'front' : 'back'}
      includeBase64
      onImageCaptured={async (result: any, _) => {
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
        save(dispatchGlobal, url);
        saveCapturedImage({
          url,
          type: params?.type,
        });
        goBack();
      }}
      focusPoints={params?.focusPoints}
    />
  );
};

export default CameraView;
