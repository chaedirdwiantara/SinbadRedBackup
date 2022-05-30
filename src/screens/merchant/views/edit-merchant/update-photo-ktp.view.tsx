import { contexts } from '@contexts';
import apiHost from '@core/services/apiHost';
import { useNavigation } from '@react-navigation/core';
import { UploadPhotoRules } from '@screen/account/views/shared';
import { renderIF, useCamera } from '@screen/auth/functions';
import { useOCR } from '@screen/auth/functions/global-hooks.functions';
import { MerchantHookFunc } from '@screen/merchant/function';
import { OCRResultView } from '@screen/shared/views';
import { UserHookFunc } from '@screen/user/functions';
import React from 'react';
import { Image, View } from 'react-native';
import {
  SnbContainer,
  SnbTopNav2,
  SnbToast,
  SnbButton2,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';

const rules = [
  'Pastikan KTP sesuai dengan identitas Anda',
  'KTP Tidak silau dan tidak buram',
  'Pastikan KTP bisa terbaca dengan jelas',
  'Hindari Tangan Menutupi KTP',
];

const Content: React.FC = () => {
  const { goBack } = useNavigation();
  const { openCameraWithOCR } = useCamera();
  const editProfileAction = MerchantHookFunc.useEditProfile();
  const { stateMerchant, dispatchSupplier } = React.useContext(
    contexts.MerchantContext,
  );
  const { dispatchUser, stateUser } = React.useContext(contexts.UserContext);
  const { detail } = UserHookFunc.useStoreDetailAction();
  const { ocrImageState, ocrImageReset } = useOCR();

  React.useEffect(() => {
    return ocrImageReset;
  }, []);

  React.useEffect(() => {
    if (stateMerchant.profileEdit.data !== null) {
      SnbToast.show(
        'Verifikasi foto KTP berhasil. Lanjutkan untuk melengkapi bagian profil lainnya',
        2500,
        {
          action: () => SnbToast.hide(),
          actionLabel: 'Lanjutkan',
          position: 'top',
        },
      );
      goBack();
      editProfileAction.reset(dispatchSupplier);
      detail(dispatchUser);
      ocrImageReset();
    }
  }, [stateMerchant.profileEdit]);

  const renderImagePreview = () => {
    return (
      <View>
        <Image
          resizeMode="contain"
          source={{
            uri: `${apiHost.base}/common/api/v1/shared/public/secure-files/${stateUser?.detail?.data?.ownerData?.profile?.imageId}`,
            headers: { 'x-platform': 'sinbad-app' },
          }}
          borderRadius={4}
          style={{
            height: 240,
            width: undefined,
            margin: layout.spacing.lg,
          }}
        />
        <View style={{ padding: layout.spacing.lg }}>
          <SnbButton2.Link
            size="medium"
            title="Ubah Foto"
            full
            onPress={() => openCameraWithOCR('ktp')}
          />
        </View>
      </View>
    );
  };

  const isOcrSuccess = ocrImageState.data !== null;

  return (
    <View style={{ flex: 1 }}>
      {renderIF(
        isOcrSuccess,
        <OCRResultView />,
        renderIF(
          stateUser?.detail?.data?.ownerData?.profile?.imageId === null,
          <UploadPhotoRules
            rulesTitle={'Pastikan Foto KTP Anda Sesuai Ketentuan'}
            imgSrc={require('../../../../assets/images/ktp_image.png')}
            rules={rules}
            action={() => openCameraWithOCR('ktp')}
            type="vertical"
            resizeMode="contain"
            blurRadius={2.2}
            isTiltImage
          />,
          renderImagePreview(),
        ),
      )}
    </View>
  );
};

const UpdatePhotoKTPView = () => {
  const { goBack } = useNavigation();

  return (
    <SnbContainer color={'white'}>
      <SnbTopNav2.Type3 color="white" title={'Foto KTP'} backAction={goBack} />
      <Content />
    </SnbContainer>
  );
};

export default UpdatePhotoKTPView;
