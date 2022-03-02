import { renderIF, useCamera } from '@screen/auth/functions';
import React from 'react';
import { View, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbUploadPhotoRules,
  SnbButton,
  SnbToast,
} from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { Stepper } from '../../shared';
import { useNavigation } from '@react-navigation/native';
import { DATA_TOKO_STEP_3_VIEW } from '@screen/account/functions/screens_name';

const Content: React.FC = () => {
  const { openCamera, capturedImage, resetCamera } = useCamera();
  const { stateGlobal, dispatchGlobal } = React.useContext(
    contexts.GlobalContext,
  );
  const { upload, save } = useUploadImageAction();
  const { navigate } = useNavigation();

  React.useEffect(() => {
    return () => {
      save(dispatchGlobal, '');
      resetCamera();
    };
  }, []);

  React.useEffect(() => {
    if (
      stateGlobal.uploadImage.data !== null &&
      capturedImage.data?.type === 'store'
    ) {
      navigate(DATA_TOKO_STEP_3_VIEW);
      resetCamera();
    }

    if (stateGlobal.uploadImage.error !== null) {
      SnbToast.show('Foto Gagal Diupload', 2500, { positionValue: 40 });
    }
  }, [stateGlobal.uploadImage, capturedImage.data?.type]);

  const renderUploadPhotoRules = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <SnbUploadPhotoRules
            rulesTitle="Pastikan Foto Toko Anda Sesuai Ketentuan"
            imgSrc={require('@image/store_image.png')}
            buttonLabel="Ambil Foto"
            rules={[
              'Pastikan foto toko terlihat dengan jelas',
              'Foto Tidak silau dan tidak buram',
              'Pastikan foto fokus keseluruhan toko',
            ]}
            action={() => openCamera('store')}
          />
        </View>
      </View>
    );
  };

  const renderImagePreview = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Image
          resizeMode="contain"
          source={{ uri: capturedImage?.data?.url }}
          borderRadius={4}
          style={{
            height: undefined,
            width: undefined,
            flex: 0.75,
            margin: 16,
            backgroundColor: 'red',
          }}
        />
        <View style={{ height: 72 }}>
          <SnbButton.Multiple
            leftType={'secondary'}
            rightType={'primary'}
            leftTitle={'Ulangi'}
            rightTitle={'Lanjutkan'}
            onPressLeft={() => openCamera('store')}
            onPressRight={() => upload(dispatchGlobal, capturedImage.data.url)}
            rightDisabled={false}
            leftDisabled={false}
            rightLoading={false}
            leftLoading={false}
          />
        </View>
      </View>
    );
  };

  const isImageAvailable = capturedImage.data?.type === 'store';

  return (
    <View style={{ flex: 1 }}>
      {renderIF(
        isImageAvailable,
        renderImagePreview(),
        renderUploadPhotoRules(),
      )}
    </View>
  );
};

const DataTokoStep2View: React.FC = () => {
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={() => {}} type="white" title="Foto Toko" />
      <Stepper complete={2} total={3} onPress={() => {}} />
      <Content />
    </SnbContainer>
  );
};

export default DataTokoStep2View;
