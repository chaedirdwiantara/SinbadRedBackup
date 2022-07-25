import { renderIF, useCamera } from '@screen/auth/functions';
import React from 'react';
import { View, Image, BackHandler } from 'react-native';
import {
  SnbContainer,
  SnbTopNav2,
  SnbButton2,
  SnbToast,
  spacingV2 as layout,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import {
  ListOfSteps,
  ModalBack,
  Stepper,
  UploadPhotoRules,
} from '../../shared';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useEasyRegistration } from '@screen/account/functions';
import {
  DATA_TOKO_STEP_3_VIEW,
  MAPS_VIEW_TYPE_2,
} from '@screen/account/functions/screens_name';

interface Props {
  ref: any
}

const Content: React.FC<Props> = React.forwardRef((_, ref) => {
  const { openCamera, capturedImage, resetCamera } = useCamera();
  const { stateGlobal, dispatchGlobal } = React.useContext(
    contexts.GlobalContext,
  );
  const { upload, save } = useUploadImageAction();
  const { navigate } = useNavigation();
  const {
    updateCompleteData,
    updateCompleteDataState,
    completeDataState,
    resetUpdateCompleteData,
    refetchCompleteData,
    backToDataCompleteness,
  } = useEasyRegistration();
  const { imageUrl } = completeDataState.data?.buyerData || {};
  const [backHandle, setBackHandle] = React.useState(false);

  React.useEffect(() => {
    return () => {
      resetUpdateCompleteData();
      save(dispatchGlobal, '');
      resetCamera();
    };
  }, []);

  React.useEffect(() => {
    if (
      Boolean(stateGlobal.uploadImage.data) &&
      capturedImage.data?.type === 'store'
    ) {
      updateCompleteData({
        buyer: { imageUrl: stateGlobal.uploadImage.data?.url },
      });
    }

    if (stateGlobal.uploadImage.error !== null) {
      SnbToast.show('Foto Gagal Diupload', 2500, { positionValue: 40 });
    }
  }, [stateGlobal.uploadImage, capturedImage.data?.type]);

  React.useEffect(() => {
    if (updateCompleteDataState.data !== null) {
      refetchCompleteData();
      resetUpdateCompleteData();
      resetCamera();
      if (backHandle) {
        backToDataCompleteness();
      } else {
        const { latitude, longitude } = completeDataState.data?.buyerData || {};
        if (latitude !== null && longitude !== null) {
          navigate(DATA_TOKO_STEP_3_VIEW);
        } else {
          navigate(MAPS_VIEW_TYPE_2);
        }
      }
    }
  }, [updateCompleteDataState]);

  const renderUploadPhotoRules = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <UploadPhotoRules
            rulesTitle="Pastikan Foto Toko Anda Sesuai Ketentuan"
            imgSrc={require('@image/store_image.png')}
            buttonLabel="Ambil Foto"
            rules={[
              'Pastikan foto toko terlihat dengan jelas',
              'Foto Tidak silau dan tidak buram',
              'Pastikan foto fokus keseluruhan toko',
            ]}
            action={() => openCamera('store')}
            type="vertical"
            resizeMode="stretch"
            blurRadius={2}
            listType="number"
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
          source={{ uri: capturedImage?.data?.url || imageUrl }}
          borderRadius={4}
          style={{
            height: undefined,
            width: undefined,
            flex: 0.75,
            margin: layout.spacing.lg,
          }}
        />
        <View style={{ flexDirection: 'row', padding: layout.spacing.lg }}>
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              title={capturedImage?.data?.url ? 'Ulangi' : 'Ubah Foto'}
              onPress={() => openCamera('store')}
              disabled={stateGlobal.uploadImage.loading}
              size="medium"
              full
              outline
            />
          </View>
          <View style={{ marginHorizontal: layout.spacing.sm }} />
          <View style={{ flex: 1 }}>
            <SnbButton2.Primary
              title={'Lanjutkan'}
              onPress={() => {
                if (capturedImage?.data?.url) {
                  upload(dispatchGlobal, capturedImage.data.url);
                } else {
                  const { latitude, longitude } =
                    completeDataState.data?.buyerData || {};
                  if (latitude !== null && longitude !== null) {
                    navigate(DATA_TOKO_STEP_3_VIEW);
                  } else {
                    navigate(MAPS_VIEW_TYPE_2);
                  }
                }
              }}
              disabled={stateGlobal.uploadImage.loading}
              loading={stateGlobal.uploadImage.loading}
              size="medium"
              full
            />
          </View>
        </View>
      </View>
    );
  };

  const isImageAvailable =
    Boolean(imageUrl) || capturedImage.data?.type === 'store';

  return (
    <View style={{ flex: 1 }}>
      {renderIF(
        isImageAvailable,
        renderImagePreview(),
        renderUploadPhotoRules(),
      )}
      <ModalBack
        ref={ref}
        confirm={() => {
          if (capturedImage?.data?.url) {
            upload(dispatchGlobal, capturedImage.data.url);
            setBackHandle(true);
          } else {
            backToDataCompleteness();
          }
        }}
      />
    </View>
  );
});

const DataTokoStep2View: React.FC = () => {
  const refModalListOfStep = React.useRef<SnbBottomSheet2Ref>()
  const refModalBack = React.useRef<SnbBottomSheet2Ref>()
  const { completeDataState } = useEasyRegistration();

  const handleBackButton = React.useCallback(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        refModalBack.current?.open()
        return true;
      },
    );
    return backHandler.remove;
  }, []);

  useFocusEffect(handleBackButton);

  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        backAction={() => refModalBack.current?.open()}
        color="white"
        title="Foto Toko"
      />
      <Stepper
        complete={completeDataState?.data?.buyerProgress?.completed}
        total={completeDataState?.data?.buyerProgress?.total}
        onPress={() => refModalListOfStep.current?.open()}
      />
      <Content ref={refModalBack} />
      <ListOfSteps
        ref={refModalListOfStep}
        type="buyer"
      />
    </SnbContainer>
  );
};

export default DataTokoStep2View;
