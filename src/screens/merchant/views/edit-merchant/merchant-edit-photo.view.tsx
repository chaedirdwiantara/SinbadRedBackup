import { contexts } from '@contexts';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { useNavigation, useRoute } from '@react-navigation/core';
import { renderIF, useCamera } from '@screen/auth/functions';
import { MerchantHookFunc } from '@screen/merchant/function';
import { UserHookFunc } from '@screen/user/functions';
import React from 'react';
import { Image, ToastAndroid, View } from 'react-native';
import {
  SnbButton,
  SnbContainer,
  SnbTopNav,
  SnbUploadPhotoRules,
} from 'react-native-sinbad-ui';

function setRules(type: string) {
  switch (type) {
    case 'npwp': {
      return [
        'Pastikan NPWP sesuai dengan identitas Anda',
        'NPWP Tidak silau dan tidak buram',
        'Pastikan NPWP bisa terbaca dengan jelas',
        'Hindari Tangan Menutupi NPWP',
      ];
    }
    case 'ktp': {
      return [
        'Pastikan KTP sesuai dengan identitas Anda',
        'KTP Tidak silau dan tidak buram',
        'Pastikan KTP bisa terbaca dengan jelas',
        'Hindari Tangan Menutupi KTP',
      ];
    }
    case 'selfie': {
      return [
        'Posisikan KTP di bawah dagu Anda',
        'KTP Tidak silau dan tidak buram',
        'Pastikan KTP bisa terbaca dengan jelas',
        'Hindari Tangan Menutupi KTP',
      ];
    }
    case 'store': {
      return [
        'Siapkan Kamera',
        'Hindari Tangan Menutupi Kamera',
        'Pastikan Foto Toko terlihat dengan jelas',
      ];
    }
    default:
      return [];
  }
}

function setImage(type: string) {
  switch (type) {
    case 'npwp': {
      return require('../../../../assets/images/npwp_image.png');
    }
    case 'ktp': {
      return require('../../../../assets/images/ktp_image.png');
    }
    case 'selfie': {
      return require('../../../../assets/images/selfie_image.png');
    }
    default:
      return ' ';
  }
}

const MerchantEditPhotoView = () => {
  const { openCamera, capturedImage, resetCamera } = useCamera();
  const { goBack } = useNavigation();
  const { params }: any = useRoute();
  const { editProfile } = MerchantHookFunc.useEditProfile();
  const editMerchantAction = MerchantHookFunc.useEditMerchant();
  const { stateMerchant, dispatchSupplier } = React.useContext(
    contexts.MerchantContext,
  );
  const { dispatchUser, stateUser } = React.useContext(contexts.UserContext);
  const { detail } = UserHookFunc.useStoreDetailAction();
  const { upload, save } = useUploadImageAction();
  const { stateGlobal, dispatchGlobal } = React.useContext(
    contexts.GlobalContext,
  );
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(' ');

  React.useEffect(() => {
    switch (params.type) {
      case 'npwp': {
        setImageUrl(
          stateUser.detail.data?.ownerData?.profile?.taxImageUrl || ' ',
        );
        break;
      }
      case 'ktp': {
        setImageUrl(
          stateUser.detail.data?.ownerData?.profile?.idImageUrl || ' ',
        );
        break;
      }
      case 'selfie': {
        setImageUrl(
          stateUser.detail.data?.ownerData?.profile?.selfieImageUrl || ' ',
        );
        break;
      }
      case 'store': {
        setImageUrl(
          stateUser.detail.data?.storeData?.storeInformation?.storeAccount
            ?.imageUrl || ' ',
        );
        break;
      }
      case 'store': {
        setImageUrl(
          stateUser.detail.data?.storeData.storeInformation.storeAccount
            .imageUrl,
        );
        break;
      }
    }
    return () => {
      save(dispatchGlobal, '');
      resetCamera();
      reset(dispatchSupplier);
      editMerchantAction.reset(dispatchSupplier);
    };
  }, []);

  React.useEffect(() => {
    if (stateGlobal.uploadImage.data !== null) {
      setImageUrl(stateGlobal.uploadImage.data.url);
      handleUpdatePhoto();
      resetCamera();
    }

    if (stateGlobal.uploadImage.error !== null) {
      ToastAndroid.showWithGravityAndOffset(
        `Upload Foto ${setType()} Gagal`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
    }
  }, [stateGlobal.uploadImage]);

  React.useEffect(() => {
    if (stateMerchant.profileEdit.data !== null) {
      ToastAndroid.showWithGravityAndOffset(
        `Berhasil Update Foto ${setType()}`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
      goBack();
      reset(dispatchSupplier);
      editMerchantAction.reset(dispatchSupplier);
      detail(dispatchUser, { id: '' });
    }

    if (stateMerchant.profileEdit.error !== null) {
      ToastAndroid.showWithGravityAndOffset(
        `Update Foto ${setType()} Gagal`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
    }
  }, [stateMerchant.profileEdit]);

  React.useEffect(() => {
    if (stateMerchant.merchantEdit.data !== null) {
      ToastAndroid.showWithGravityAndOffset(
        `Berhasil Update Foto ${setType()}`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
      goBack();
      reset(dispatchSupplier);
      editMerchantAction.reset(dispatchSupplier);
      detail(dispatchUser, { id: '' });
    }

    if (stateMerchant.merchantEdit.error !== null) {
      ToastAndroid.showWithGravityAndOffset(
        `Update Foto ${setType()} Gagal`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
    }
  }, [stateMerchant.merchantEdit]);

  const handleUpdatePhoto = () => {
    save(dispatchGlobal, '');
    const data = {};
    switch (params.type) {
      case 'npwp': {
        Object.assign(data, { taxImageUrl: imageUrl });
        editProfile(dispatchSupplier, { data });
        break;
      }
      case 'ktp': {
        Object.assign(data, { idImageUrl: imageUrl });
        editProfile(dispatchSupplier, { data });
        break;
      }
      case 'selfie': {
        Object.assign(data, { selfieImageUrl: imageUrl });
        editProfile(dispatchSupplier, { data });
        break;
      }
      case 'store': {
        Object.assign(data, { image: imageUrl });
        editMerchantAction.editMerchant(dispatchSupplier, {
          data,
        });
        break;
      }
    }
  };

  const setType = () => {
    switch (params?.type) {
      case 'npwp':
      case 'ktp': {
        return params.type.toUpperCase();
      }
      case 'selfie': {
        return 'Selfie';
      }
      case 'store': {
        return 'Toko';
      }
    }
  };

  const renderImagePreview = () => {
    const isImageCaptured = capturedImage.data !== null;
    let action = handleUpdatePhoto;

    let uri: string | undefined = '';
    if (isImageCaptured) {
      uri = capturedImage?.data?.url;
      action = () => {
        upload(dispatchGlobal, capturedImage.data.url);
      };
    } else {
      uri = imageUrl;
    }
    return (
      <View style={{ flex: 1 }}>
        <Image
          resizeMode="contain"
          source={{ uri }}
          borderRadius={4}
          style={{
            height: undefined,
            width: undefined,
            flex: 1,
            margin: 16,
          }}
        />
        <View style={{ flex: 0.75, justifyContent: 'space-between' }}>
          <View style={{ height: 72 }}>
            <SnbButton.Dynamic
              size="small"
              type="tertiary"
              title="Ubah Foto"
              onPress={() => openCamera(params?.type)}
              disabled={false}
            />
          </View>
          <View style={{ height: 72 }}>
            <SnbButton.Single
              type={'primary'}
              title={'Simpan'}
              shadow
              onPress={action}
              loading={stateGlobal.uploadImage.loading}
              disabled={stateGlobal.uploadImage.loading || !isImageCaptured}
            />
          </View>
        </View>
      </View>
    );
  };

  const isImageAvailable = imageUrl !== ' ' || capturedImage.data !== null;

  return (
    <SnbContainer color={'white'}>
      <SnbTopNav.Type3 type="red" title={params?.title} backAction={goBack} />
      <View style={{ flex: 1 }}>
        {renderIF(
          isImageAvailable,
          renderImagePreview(),
          <SnbUploadPhotoRules
            rulesTitle={`Pastikan Foto ${setType()} Anda Sesuai Ketentuan`}
            imgSrc={setImage(params.type)}
            rules={setRules(params.type)}
            action={() => openCamera(params?.type)}
          />,
        )}
      </View>
    </SnbContainer>
  );
};

export default MerchantEditPhotoView;
