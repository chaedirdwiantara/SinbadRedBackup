import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { SnbCamera } from 'react-native-sinbad-ui';

const CameraView = () => {
  const { goBack } = useNavigation();
  const { params }: any = useRoute();
  React.useEffect(() => {
    setTimeout(() => {
      params?.setImage('Ini Image');
      goBack();
    }, 2000);
  }, []);
  return (
    <SnbCamera
      title="Ambil Foto KTP"
      subtitle="Pastikan KTP berada pada posisi yang tepat"
    />
  );
};

export default CameraView;
