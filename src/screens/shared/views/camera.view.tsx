import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { color } from 'react-native-sinbad-ui';
import ImageEditor from '@sinbad/image-editor';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { contexts } from '@contexts';
import { renderIF, useCamera } from '@screen/auth/functions';
import { Dimensions, View } from 'react-native';
import { Camera } from './components';

const { height, width: screenWidth } = Dimensions.get('window');

const KtpPhotoFrame = () => (
  <View
    style={{
      top: 0.4 * height,
      right: 0.1 * screenWidth,
      height: 110,
      width: 84,
      position: 'absolute',
      borderWidth: 2,
      borderRadius: 4,
      borderColor: color.white,
    }}
  />
);

const CameraView = () => {
  const { goBack } = useNavigation();
  const { save } = useUploadImageAction();
  const { params }: any = useRoute();
  const { saveCapturedImage } = useCamera();
  const { dispatchGlobal } = React.useContext(contexts.GlobalContext);
  return (
    <View style={{ flex: 1 }}>
      <Camera
        title={params?.title}
        subtitle={params?.subtitle}
        showFlipCameraButton={params?.type === 'selfie'}
        showFlashCameraButton={params?.type === 'selfie'}
        type={params?.type === 'selfie' ? 'front' : 'back'}
        includeBase64
        topOffset={params?.type === 'selfie' ? 80 : 100}
        onImageCaptured={async (result: any, _) => {
          const width = result.width - result.width * 0.3;
          const x = result.width * 0.15;
          let offsetFactor = 0;
          let sizeFactor = 0;
          switch (params?.type) {
            case 'ktp':
            case 'npwp': {
              offsetFactor = 0.325;
              sizeFactor = 0.65;
              break;
            }
            case 'selfie': {
              offsetFactor = 0.125;
              sizeFactor = 0.325;
              break;
            }
            case 'store': {
              offsetFactor = 0.25;
              sizeFactor = 0.5;
              break;
            }
            default:
              break;
          }
          const url = await ImageEditor.cropImage(result.uri, {
            offset: { x, y: result.height * offsetFactor },
            size: { width, height: result.height - result.height * sizeFactor },
          });
          save(dispatchGlobal, url);
          saveCapturedImage({
            url,
            type: params?.type,
          });
          goBack();
        }}
        focusPoints={params?.focusPoints}
      />
      {renderIF(params?.type === 'ktp', <KtpPhotoFrame />)}
    </View>
  );
};

export default CameraView;
