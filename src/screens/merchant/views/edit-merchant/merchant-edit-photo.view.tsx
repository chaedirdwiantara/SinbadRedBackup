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
    default:
      return [];
  }
}

const MerchantEditPhotoView = () => {
  const { openCamera, capturedImage, resetCamera } = useCamera();
  const { goBack } = useNavigation();
  const { params }: any = useRoute();
  const { editProfile, reset } = MerchantHookFunc.useEditProfile();
  const { stateMerchant, dispatchSupplier } = React.useContext(
    contexts.MerchantContext,
  );
  const { dispatchUser, stateUser } = React.useContext(contexts.UserContext);
  const { detail } = UserHookFunc.useStoreDetailAction();
  const { upload, save } = useUploadImageAction();
  const { stateGlobal, dispatchGlobal } = React.useContext(
    contexts.GlobalContext,
  );
  const [imageUrl, setImageUrl] = React.useState<string | undefined>('');

  React.useEffect(() => {
    switch (params.type) {
      case 'npwp': {
        setImageUrl(stateUser.detail.data?.ownerData.profile.taxImageUrl);
        break;
      }
      case 'ktp': {
        setImageUrl(stateUser.detail.data?.ownerData.profile.idImageUrl);
        break;
      }
      case 'selfie': {
        setImageUrl(stateUser.detail.data?.ownerData.profile.selfieImageUrl);
        break;
      }
    }
    return () => {
      save(dispatchGlobal, '');
      resetCamera();
    };
  }, []);

  React.useEffect(() => {
    if (stateGlobal.uploadImage.data !== null) {
      setImageUrl(stateGlobal.uploadImage.data.url);
      resetCamera();
    }

    if (stateGlobal.uploadImage.error !== null) {
      ToastAndroid.showWithGravityAndOffset(
        `Upload Foto ${params.type.toUpperCase()} Gagal`,
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
        `Berhasil Update Foto ${params.type.toUpperCase()}`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
      goBack();
      reset(dispatchSupplier);
      detail(dispatchUser, { id: '' });
    }

    if (stateMerchant.profileEdit.error !== null) {
      ToastAndroid.showWithGravityAndOffset(
        `Update Foto ${params.type.toUpperCase()} Gagal`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
    }
  }, [stateMerchant.profileEdit]);

  const handleUpdatePhoto = () => {
    save(dispatchGlobal, '');
    const data = {};
    switch (params.type) {
      case 'npwp': {
        Object.assign(data, { taxImageUrl: imageUrl });
        break;
      }
      case 'ktp': {
        Object.assign(data, { idImageUrl: imageUrl });
        break;
      }
      case 'selfie': {
        Object.assign(data, { selfieImageUrl: imageUrl });
        break;
      }
    }
    editProfile(dispatchSupplier, { data });
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
              type={isImageCaptured ? 'secondary' : 'primary'}
              title={isImageCaptured ? 'Upload' : 'Simpan'}
              shadow
              onPress={action}
              loading={stateGlobal.uploadImage.loading}
              disabled={stateGlobal.uploadImage.loading}
            />
          </View>
        </View>
      </View>
    );
  };

  const isImageAvailable = imageUrl !== '' || capturedImage.data !== null;

  return (
    <SnbContainer color={'white'}>
      <SnbTopNav.Type3
        type="red"
        title={`Ubah ${params?.title}`}
        backAction={goBack}
      />
      <View style={{ flex: 1 }}>
        {renderIF(
          isImageAvailable,
          renderImagePreview(),
          <SnbUploadPhotoRules
            rulesTitle={`Pastikan Foto ${params.type.toUpperCase()} Anda Sesuai Ketentuan`}
            imgSrc="https://s3-alpha-sig.figma.com/img/4f9b/2a06/d04d4acef65a83217d814ed9aa953a31?Expires=1632096000&Signature=Wl0ScvJmSsWpSqCsSvjBsKVjEUc53NoEawaVNBGALvYfoCwe5P2hyo45Ba2NSThzZbPaDrpRV7Gl7MVSwhkSqoh8cbMoJcAQp0ic2UwKW6cP0oYcNfFiE77QeU7zJo5kbhr1J3RRYVMnZ0nvYUqgBjrVtt6utz7AjkGNDqVyWAReTUOsEM4BHNUAioWtFAbdZAjsqRVp2H6SkuEKjVum90HnG0xHeOVdp5HGo3CB96s~y7aqrhlxb3Z-NISSbYmxYdDeH0RmDNo8sao-xzB5HWcYR1Uiy-60bQSOQXjFjsu9V~D72rT3ERNYvDu2Ez8VneDD3oGZuT7abW1RcT1wXg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            title={`Unggah Foto ${params.type.toUpperCase()}`}
            rules={setRules(params.type)}
            action={() => openCamera(params?.type)}
          />,
        )}
      </View>
    </SnbContainer>
  );
};

export default MerchantEditPhotoView;
