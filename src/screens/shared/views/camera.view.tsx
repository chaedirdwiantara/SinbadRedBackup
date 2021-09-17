import { useNavigation, useRoute } from '@react-navigation/native';
import { useCamera } from '@screen/auth/functions';
import React from 'react';
import { SnbCamera } from 'react-native-sinbad-ui';

const CameraView = () => {
  const { goBack } = useNavigation();
  const { saveCapturedImage } = useCamera();
  const { params }: any = useRoute();
  return (
    <SnbCamera
      title={params?.title}
      subtitle={params?.subtitle}
      includeBase64
      showFlashCameraButton
      onImageCaptured={(result: any, resolution) => {
        saveCapturedImage({
          ...result,
          resolution,
          type: params?.type,
        });
        goBack();
      }}
      focusPoints={params.focusPoints}
    />
  );
};

export default CameraView;
