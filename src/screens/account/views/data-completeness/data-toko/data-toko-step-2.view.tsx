import { renderIF, useCamera } from '@screen/auth/functions';
import React from 'react';
import { View, Image, BackHandler } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbUploadPhotoRules,
  SnbButton,
  SnbToast,
} from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { ListOfSteps, ModalBack, Stepper } from '../../shared';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useEasyRegistration } from '@screen/account/functions';
import {
  DATA_TOKO_STEP_3_VIEW,
  MAPS_VIEW_TYPE_2,
} from '@screen/account/functions/screens_name';

interface Props {
  openModalBack: boolean;
  onCloseModalBack: (value: boolean) => void;
}

const Content: React.FC<Props> = (props) => {
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
  const [openModalBack, setOpenModalBack] = React.useState(false);
  const [backHandle, setBackHandle] = React.useState(false);

  React.useEffect(() => {
    return () => {
      resetUpdateCompleteData();
      save(dispatchGlobal, '');
      resetCamera();
    };
  }, []);

  const handleBackButton = React.useCallback(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setOpenModalBack(true);
        return true;
      },
    );
    return backHandler.remove;
  }, []);

  useFocusEffect(handleBackButton);

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
          source={{ uri: capturedImage?.data?.url || imageUrl }}
          borderRadius={4}
          style={{
            height: undefined,
            width: undefined,
            flex: 0.75,
            margin: 16,
          }}
        />
        <View style={{ height: 72 }}>
          {renderIF(
            capturedImage?.data?.url,
            <SnbButton.Multiple
              leftType={'secondary'}
              rightType={'primary'}
              leftTitle={'Ulangi'}
              rightTitle={'Lanjutkan'}
              onPressLeft={() => openCamera('store')}
              onPressRight={() =>
                upload(dispatchGlobal, capturedImage.data.url)
              }
              rightDisabled={stateGlobal.uploadImage.loading}
              leftDisabled={stateGlobal.uploadImage.loading}
              rightLoading={stateGlobal.uploadImage.loading}
            />,
            <SnbButton.Multiple
              leftType={'secondary'}
              rightType={'primary'}
              leftTitle={'Ubah Foto'}
              rightTitle={'Lanjutkan'}
              onPressLeft={() => openCamera('store')}
              onPressRight={() => {
                const { latitude, longitude } =
                  completeDataState.data?.buyerData || {};
                if (latitude !== null && longitude !== null) {
                  navigate(DATA_TOKO_STEP_3_VIEW);
                } else {
                  navigate(MAPS_VIEW_TYPE_2);
                }
              }}
              rightDisabled={false}
              leftDisabled={false}
            />,
          )}
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
        open={openModalBack || props.openModalBack}
        closeModal={() => {
          setOpenModalBack(false);
          props.onCloseModalBack(false);
        }}
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
};

const DataTokoStep2View: React.FC = () => {
  const [openModalStep, setOpenModalStep] = React.useState(false);
  const [openModalBack, setOpenModalBack] = React.useState(false);

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={() => setOpenModalBack(true)}
        type="white"
        title="Foto Toko"
      />
      <Stepper complete={2} total={3} onPress={() => setOpenModalStep(true)} />
      <Content
        openModalBack={openModalBack}
        onCloseModalBack={setOpenModalBack}
      />
      <ListOfSteps
        open={openModalStep}
        type="buyer"
        closeModal={() => setOpenModalStep(false)}
      />
    </SnbContainer>
  );
};

export default DataTokoStep2View;
