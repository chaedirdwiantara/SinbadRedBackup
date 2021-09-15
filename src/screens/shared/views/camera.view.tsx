import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { SnbCamera } from 'react-native-sinbad-ui';

const CameraView = () => {
  const { goBack } = useNavigation();
  const { params }: any = useRoute();
  return (
    <SnbCamera
      title={params?.title}
      subtitle={params?.subtitle}
      includeBase64
      showFlashCameraButton
      onImageCaptured={(result: any) => {
        params?.setImage(result.uri);
        goBack();
      }}
      focusPoints={params.focusPoints}
    />
  );
};

export default CameraView;
