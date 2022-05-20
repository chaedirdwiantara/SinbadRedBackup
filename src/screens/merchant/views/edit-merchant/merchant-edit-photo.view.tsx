import { contexts } from '@contexts';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { useNavigation, useRoute } from '@react-navigation/core';
import { UploadPhotoRules } from '@screen/account/views/shared';
import { renderIF, useCamera } from '@screen/auth/functions';
import { MerchantHookFunc } from '@screen/merchant/function';
import { UserHookFunc } from '@screen/user/functions';
import React from 'react';
import { Image, View } from 'react-native';
import {
  SnbButton,
  SnbContainer,
  SnbTopNav,
  SnbToast,
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
    case 'store': {
      return require('../../../../assets/images/store_image.png');
    }
    default:
      return ' ';
  }
}

const MerchantEditPhotoView = () => {
  const { openCamera, capturedImage, resetCamera, openCameraWithOCR } =
    useCamera();
  const { goBack } = useNavigation();
  const { params }: any = useRoute();
  const { editProfile } = MerchantHookFunc.useEditProfile();
  const editMerchantAction = MerchantHookFunc.useEditMerchant();
  const editProfileAction = MerchantHookFunc.useEditProfile();
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
    editProfileAction.reset(dispatchSupplier);
    editMerchantAction.reset(dispatchSupplier);
    switch (params.type) {
      case 'npwp': {
        setImageUrl(
          stateUser.detail.data?.ownerData?.profile?.taxImageUrl || ' ',
        );
        break;
      }
      case 'ktp': {
        setImageUrl(stateUser.detail.data?.ownerData?.profile?.imageId || ' ');
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
          stateUser.detail.data?.buyerData?.buyerInformation?.buyerAccount
            ?.imageUrl || ' ',
        );
        break;
      }
    }
    return () => {
      save(dispatchGlobal, '');
      resetCamera();
      editMerchantAction.reset(dispatchSupplier);
    };
  }, []);

  React.useEffect(() => {
    if (stateGlobal.uploadImage.data !== null) {
      setImageUrl(stateGlobal.uploadImage.data.url);
      handleUpdatePhoto(stateGlobal.uploadImage.data.url);
      resetCamera();
    }

    if (stateGlobal.uploadImage.error !== null) {
      SnbToast.show(`Upload Foto ${setType()} Gagal`, 2500, {
        position: 'bottom',
        positionValue: 72,
      });
    }
  }, [stateGlobal.uploadImage]);

  React.useEffect(() => {
    if (stateMerchant.profileEdit.data !== null) {
      goBack();
      editProfileAction.reset(dispatchSupplier);
      detail(dispatchUser);
    }

    if (stateMerchant.profileEdit.error !== null) {
      SnbToast.show(`Update Foto ${setType()} Gagal`, 2500, {
        position: 'bottom',
        positionValue: 72,
      });
    }
  }, [stateMerchant.profileEdit]);

  React.useEffect(() => {
    if (stateMerchant.merchantEdit.data !== null) {
      goBack();
      editMerchantAction.reset(dispatchSupplier);
      detail(dispatchUser);
    }

    if (stateMerchant.merchantEdit.error !== null) {
      SnbToast.show(`Update Foto ${setType()} Gagal`, 2500, {
        position: 'bottom',
        positionValue: 72,
      });
    }
  }, [stateMerchant.merchantEdit]);

  const handleUpdatePhoto = (image: string) => {
    save(dispatchGlobal, '');
    const data = {};
    switch (params.type) {
      case 'npwp': {
        Object.assign(data, { user : { taxImageUrl: image } });
        editProfile(dispatchSupplier, { data });

        break;
      }
      case 'ktp': {
        Object.assign(data, { user : { idImageUrl: image } });
        editProfile(dispatchSupplier, { data });
        break;
      }
      case 'selfie': {
        Object.assign(data, { user : { selfieImageUrl: image } });
        editProfile(dispatchSupplier, { data });
        break;
      }
      case 'store': {
        Object.assign(data, { buyer : { imageUrl: image } });
        editProfile(dispatchSupplier, {
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
    let action = () => {
      upload(dispatchGlobal, capturedImage.data.url);
    };

    let uri: string | undefined = '';
    if (isImageCaptured) {
      uri = capturedImage?.data?.url;
    } else {
      uri = imageUrl;
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Image
            resizeMode="contain"
            source={{ uri }}
            style={{
              resizeMode: 'contain',
              height: undefined,
              width: '100%',
              aspectRatio:
                params?.type === 'selfie'
                  ? 6 / 5
                  : params?.type === 'store'
                  ? 8 / 7
                  : 8 / 5,
              marginTop: 24,
            }}
          />
          <View style={{ justifyContent: 'space-between' }}>
            <View style={{ height: 72, marginTop: 12 }}>
              <SnbButton.Dynamic
                size="small"
                type="tertiary"
                title="Ubah Foto"
                onPress={() => {
                  if (params?.type !== 'ktp') {
                    openCamera(params?.type);
                  } else {
                    openCameraWithOCR(params?.type);
                  }
                }}
                disabled={false}
              />
            </View>
          </View>
        </View>
        <View style={{ height: 75 }}>
          <SnbButton.Single
            type={'primary'}
            title={'Simpan'}
            onPress={action}
            loading={stateGlobal.uploadImage.loading}
            disabled={stateGlobal.uploadImage.loading || !isImageCaptured}
          />
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
          <UploadPhotoRules
            rulesTitle={`Pastikan Foto ${setType()} Anda Sesuai Ketentuan`}
            imgSrc={setImage(params.type)}
            rules={setRules(params.type)}
            action={() => {
              if (params?.type !== 'ktp') {
                openCamera(params?.type);
              } else {
                openCameraWithOCR(params?.type);
              }
            }}
            type="vertical"
            resizeMode={params.type === 'npwp' ? 'contain' : 'cover'}
            isTiltImage={params.type === 'npwp'}
          />,
        )}
      </View>
    </SnbContainer>
  );
};

export default MerchantEditPhotoView;
