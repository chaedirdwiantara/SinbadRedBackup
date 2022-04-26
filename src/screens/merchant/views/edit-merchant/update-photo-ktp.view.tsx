import { contexts } from '@contexts';
import { useNavigation } from '@react-navigation/core';
import { renderIF, useCamera } from '@screen/auth/functions';
import { useOCR } from '@screen/auth/functions/global-hooks.functions';
import { MerchantHookFunc } from '@screen/merchant/function';
import { OCRResultView } from '@screen/shared/views';
import { UserHookFunc } from '@screen/user/functions';
import React from 'react';
import { Image, View } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbUploadPhotoRules,
  SnbToast,
  SnbButton,
} from 'react-native-sinbad-ui';

const rules = [
  'Pastikan KTP sesuai dengan identitas Anda',
  'KTP Tidak silau dan tidak buram',
  'Pastikan KTP bisa terbaca dengan jelas',
  'Hindari Tangan Menutupi KTP',
];

const defaultImage =
  'https://s3-alpha-sig.figma.com/img/d716/e95a/ec27bf0b7f1c6e49350877d9fbdef7fe?Expires=1652054400&Signature=cTYjBbo7lHGdLyGwMEMzdeXcJbk0Ws875cZRzwxRr7QcgZ2jPnbXNZUKsRMg-qLQKObiaxlMOV-m7lt3Kc8tyyA7IHmE83oYw6N3EuMeem~bxDz4R6X8boIPQyrSNGJ~KCrWKijfvlhJ47vibcO7sEi3IQLngW~1HI1WvbaA5GOE-OPKEcTlmg16VVCVH~RWwlMhRpC26zF1YxoRdqIU-UiCsmgzu~9fuMr5WN5gUftceY~eqAAvVQ5JFLm9c7Y3moZBkj5BfdyATmawsEiBxlzuUHD1fQ5-jHWnkRUJnzjH3ou04eYqPmfKv3UIa4JyYD4zv54dexiNYMfyMLPofQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';

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
          source={{ uri: defaultImage }}
          borderRadius={4}
          style={{
            height: 240,
            width: undefined,
            margin: 16,
          }}
        />
        <View style={{ height: 72 }}>
          <SnbButton.Dynamic
            size="small"
            type="tertiary"
            title="Ubah Foto"
            onPress={() => openCameraWithOCR('ktp')}
            disabled={false}
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
          stateUser?.detail?.data?.ownerData?.profile?.imageId === '',
          <SnbUploadPhotoRules
            rulesTitle={'Pastikan Foto KTP Anda Sesuai Ketentuan'}
            imgSrc={require('../../../../assets/images/ktp_image.png')}
            rules={rules}
            action={() => openCameraWithOCR('ktp')}
            type="vertical"
            resizeMode="contain"
            blurRadius={2.2}
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
      <SnbTopNav.Type3 type="white" title={'Foto KTP'} backAction={goBack} />
      <Content />
    </SnbContainer>
  );
};

export default UpdatePhotoKTPView;
