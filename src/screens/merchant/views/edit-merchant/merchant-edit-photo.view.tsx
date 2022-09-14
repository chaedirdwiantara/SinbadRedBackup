import { contexts } from '@contexts';
import { useUploadImageAction } from '@core/functions/hook/upload-image';
import { useNavigation, useRoute } from '@react-navigation/core';
import { UploadPhotoRules } from '@screen/account/views/shared';
import { renderIF, useCamera } from '@screen/auth/functions';
import { MerchantHookFunc } from '@screen/merchant/function';
import { UserHookFunc } from '@screen/user/functions';
import React from 'react';
import { Image, View, ScrollView } from 'react-native';
import {
  SnbButton2,
  SnbContainer,
  SnbTopNav2,
  SnbToast,
  spacingV2 as layout,
  SnbTextField2,
  FooterButton,
} from 'react-native-sinbad-ui';
import { useInputFormat } from '@screen/auth/functions';

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
  const npwp = useInputFormat(
    stateUser.detail.data?.ownerData?.profile?.taxNo || '',
    'number-only',
    'npwp',
  );

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
      SnbToast.show(`Upload Foto ${setType()} Gagal`, 2500);
    }
  }, [stateGlobal.uploadImage]);

  React.useEffect(() => {
    if (stateMerchant.profileEdit.data !== null) {
      SnbToast.show('Data Berhasil Diperbaharui', 2500);
      goBack();
      editProfileAction.reset(dispatchSupplier);
      detail(dispatchUser);
    }

    if (stateMerchant.profileEdit.error !== null) {
      SnbToast.show(`Update Foto ${setType()} Gagal`, 2500);
    }
  }, [stateMerchant.profileEdit]);

  React.useEffect(() => {
    if (stateMerchant.merchantEdit.data !== null) {
      goBack();
      editMerchantAction.reset(dispatchSupplier);
      detail(dispatchUser);
    }

    if (stateMerchant.merchantEdit.error !== null) {
      SnbToast.show(`Update Foto ${setType()} Gagal`, 2500);
    }
  }, [stateMerchant.merchantEdit]);

  const handleUpdatePhoto = (image: string) => {
    save(dispatchGlobal, '');
    const data = {};
    switch (params.type) {
      case 'npwp': {
        Object.assign(data, { user: { taxImageUrl: image } });
        editProfile(dispatchSupplier, { data });

        break;
      }
      case 'ktp': {
        Object.assign(data, { user: { idImageUrl: image } });
        editProfile(dispatchSupplier, { data });
        break;
      }
      case 'selfie': {
        Object.assign(data, { user: { selfieImageUrl: image } });
        editProfile(dispatchSupplier, { data });
        break;
      }
      case 'store': {
        Object.assign(data, { buyer: { imageUrl: image } });
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

    const handleSaveNpwp = () => {
      const npwpIsChanged =
        npwp.value !== '' &&
        npwp.value.replace(/[^0-9]/g, '') !==
          stateUser.detail.data?.ownerData?.profile?.taxNo;
      const data = {
        user: {
          taxNo: npwp.value?.replace(/[^0-9]/g, ''),
        },
      };

      if (capturedImage?.data?.type === 'npwp') {
        if (npwpIsChanged) {
          upload(dispatchGlobal, capturedImage.data.url);
          editProfileAction.editProfile(dispatchSupplier, { data });
        } else {
          upload(dispatchGlobal, capturedImage.data.url);
        }
      }
      if (npwpIsChanged) {
        editProfileAction.editProfile(dispatchSupplier, { data });
      }
    };

    const checkNpwp = () => {
      if (params?.type === 'npwp') {
        if (
          npwp.value === stateUser.detail.data?.ownerData?.profile?.taxNo ||
          !npwp.value
        ) {
          return true;
        }
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
          }}>
          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: layout.spacing.xl,
              maxHeight: 370,
            }}>
            <Image
              resizeMode="contain"
              source={{ uri }}
              borderRadius={4}
              style={{
                resizeMode: 'contain',
                height: undefined,
                width: '100%',
                marginVertical: layout.spacing.xl,
                aspectRatio:
                  params?.type === 'selfie'
                    ? 6 / 5
                    : params?.type === 'store'
                    ? 8 / 7
                    : 8 / 5,
              }}
            />
            <View>
              {params?.type === 'npwp' ? (
                <SnbTextField2.Text
                  {...npwp}
                  labelText={'Nomor NPWP'}
                  placeholder={'Masukkan Nomor NPWP'}
                  keyboardType="number-pad"
                  maxLength={20}
                  helperText={'Abaikan bila sudah sesuai dengan NPWP'}
                />
              ) : null}
            </View>
          </ScrollView>

          {params?.type !== 'npwp' ? (
            <View style={{ justifyContent: 'space-between' }}>
              <View
                style={{ padding: layout.spacing.lg, alignItems: 'center' }}>
                <SnbButton2.Link
                  size="small"
                  title="Ubah Foto"
                  onPress={() => {
                    openCamera(params?.type);
                  }}
                  disabled={false}
                  full
                />
              </View>
            </View>
          ) : null}
        </View>
        {params?.type !== 'npwp' ? (
          <View style={{ padding: layout.spacing.lg }}>
            <SnbButton2.Primary
              title={'Simpan'}
              onPress={action}
              loading={stateGlobal.uploadImage.loading}
              disabled={stateGlobal.uploadImage.loading || !isImageCaptured}
              size="medium"
              full
            />
          </View>
        ) : (
          <FooterButton.Dual
            title2={capturedImage?.data?.url ? 'Ulangi' : 'Ubah Foto'}
            button2Press={() => openCamera(params?.type)}
            disabled={
              stateGlobal.uploadImage.loading ||
              stateMerchant.profileEdit.loading ||
              npwp.type === 'error' ||
              checkNpwp()
            }
            title1={'Simpan'}
            button1Press={handleSaveNpwp}
            loadingButton={
              stateGlobal.uploadImage.loading ||
              stateMerchant.profileEdit.loading
            }
            testID={'12.3'}
            button1Disabled={!isImageCaptured}
          />
        )}
      </View>
    );
  };

  const isImageAvailable = imageUrl !== ' ' || capturedImage.data !== null;

  return (
    <SnbContainer color={'white'}>
      <SnbTopNav2.Type3
        color="white"
        title={params?.title}
        backAction={goBack}
      />
      <View style={{ flex: 1 }}>
        {renderIF(
          isImageAvailable,
          renderImagePreview(),
          <UploadPhotoRules
            rulesTitle={`Pastikan Foto ${setType()} Anda Sesuai Ketentuan`}
            imgSrc={setImage(params.type)}
            rules={setRules(params.type)}
            action={() => {
              openCamera(params?.type);
            }}
            type="vertical"
            resizeMode={params.type === 'npwp' ? 'contain' : 'cover'}
            isTiltImage={params.type === 'npwp'}
            listType="number"
            blurRadius={2}
            brightnessAmount={params.type === 'store' ? 2 : 1.5}
          />,
        )}
      </View>
    </SnbContainer>
  );
};

export default MerchantEditPhotoView;
