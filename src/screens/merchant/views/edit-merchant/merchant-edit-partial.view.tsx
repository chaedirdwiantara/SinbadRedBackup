import React, { FC, useState, useEffect } from 'react';
import {
  SnbTextField,
  SnbTextFieldSelect,
  SnbButton,
  SnbUploadPhotoRules,
  SnbToast,
} from 'react-native-sinbad-ui';
import { Image, ScrollView, View } from 'react-native';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import { MerchantHookFunc, useInput } from '../../function';
import { UserHookFunc } from '../../../user/functions';
import { useTextFieldSelect } from '@screen/auth/functions';
import { NavigationAction } from '@navigation';
import { renderIF, useCamera } from '@screen/auth/functions';

interface Props {
  type: any;
  showButton: boolean;
}

const MerchantEditPartialView: FC<Props> = (props) => {
  /** === HOOK === */
  const { stateUser } = React.useContext(contexts.UserContext);
  const ownerData = stateUser.detail.data?.ownerData.profile;
  const editMerchantAction = MerchantHookFunc.useEditMerchant();
  const editProfileAction = MerchantHookFunc.useEditProfile();
  const changeEmailAction = MerchantHookFunc.useChangeEmail();
  const changeMobilePhoneAction = MerchantHookFunc.useChangeMobilePhone();
  const { stateMerchant, dispatchSupplier } = React.useContext(
    contexts.MerchantContext,
  );
  const storeDetailAction = UserHookFunc.useStoreDetailAction();
  const { dispatchUser } = React.useContext(contexts.UserContext);
  const [isOpenToast, setIsOpenToast] = useState(false);
  const [toasMessage, setToastMessage] = useState('');
  const { gotoSelection, selectedItem, resetSelectedItem } =
    useTextFieldSelect();
  const storeData = stateUser.detail.data?.storeData.storeInformation;
  const { openCamera, capturedImage, resetCamera } = useCamera();
  const { resetUploadImage, state: uploadData } = useUploadImage();
  // USER DATA
  const ownerName = useInput(ownerData?.name || '');
  const ownerEmail = useInput(ownerData?.email || '');
  const noKtp = useInput(ownerData?.idNo || '');
  const noNPWP = useInput(ownerData?.taxNo || '');
  const mobilePhone = useInput(ownerData?.mobilePhone || '');
  // COMPLETNESS DATA
  const merchantName = useInput(
    storeData?.storeAccount?.name ? storeData.storeAccount?.name : '',
  );
  const numberOfEmployee = useInput(
    storeData?.storeDetailCompleteness?.numberOfEmployee || '',
  );
  const vehicleAccessibility = useInput(
    storeData?.storeDetailCompleteness?.vehicleAccessibility || '',
  );
  const largeArea = useInput(
    storeData?.storeDetailCompleteness?.largeArea || '',
  );
  const topBrand = useInput(
    storeData?.storeDetailCompleteness?.topSellingBrand || '',
  );
  const wantedBrand = useInput(
    storeData?.storeDetailCompleteness?.mostWantedBrand || '',
  );
  const vehicleAccessibilityAmount = useInput(
    storeData?.storeDetailCompleteness?.vehicleAccessibilityAmount || null,
  );
  // FUNCTIONAL
  useEffect(() => {
    resetCamera();
    resetUploadImage();
  }, []);

  useEffect(() => {
    if (stateMerchant.profileEdit.data || stateMerchant.merchantEdit.data) {
      NavigationAction.back();
      editMerchantAction.reset(dispatchSupplier);
      editProfileAction.reset(dispatchSupplier);
      storeDetailAction.detail(dispatchUser, { id: '3' });
    } else if (
      stateMerchant.profileEdit.error ||
      stateMerchant.merchantEdit.error
    ) {
      setToastMessage('failed');
      setIsOpenToast(true);
      setTimeout(() => {
        setIsOpenToast(false);
        editMerchantAction.reset(dispatchSupplier);
        editProfileAction.reset(dispatchSupplier);
      }, 2000);
    }
  }, [stateMerchant]);

  useEffect(() => {
    if (stateMerchant.changeEmail.data) {
      NavigationAction.navigate('MerchantOtpView', {
        type: 'email',
        data: ownerEmail.value,
      });
    } else if (stateMerchant.changeMobilePhone.data) {
      NavigationAction.navigate('MerchantOtpView', {
        type: 'mobilePhone',
        data: mobilePhone.value,
      });
    }
  }, [stateMerchant]);

  React.useEffect(() => {
    switch (selectedItem?.type) {
      case 'listNumOfEmployee': {
        numberOfEmployee.setValue(selectedItem.item.amount);
        break;
      }
      case 'listVehicleAccess': {
        vehicleAccessibility.setValue(selectedItem.item);
        break;
      }
      default:
        break;
    }
    return resetSelectedItem;
  }, [selectedItem]);

  /** FUNCTION */
  const confirm = () => {
    const { type } = props;
    let data = {};
    switch (type) {
      case 'merchantOwnerEmail': {
        data = {
          email: ownerEmail.value,
        };
        changeEmailAction.changeEmail(dispatchSupplier, { data });
        break;
      }
      case 'merchantOwnerPhoneNo': {
        data = {
          mobilePhone: mobilePhone.value,
        };
        changeMobilePhoneAction.changeMobilePhone(dispatchSupplier, { data });
        break;
      }
      case 'merchantOwnerIdNo': {
        data = {
          idNo: noKtp.value,
        };
        editProfileAction.editProfile(dispatchSupplier, {
          data,
        });
        break;
      }
      case 'merchantOwnerTaxNo': {
        data = {
          taxNo: noNPWP.value,
        };
        editProfileAction.editProfile(dispatchSupplier, {
          data,
        });
        break;
      }
      case 'merchantOwnerName': {
        data = {
          name: ownerName.value,
        };
        editProfileAction.editProfile(dispatchSupplier, {
          data,
        });
        break;
      }
      case 'merchantAccountName': {
        data = {
          name: merchantName.value,
        };
        editMerchantAction.editMerchant(dispatchSupplier, {
          data,
        });
        break;
      }
      case 'merchantAccountPhoneNo': {
        break;
      }
      case 'merchantCompletenessInformation': {
        data = {
          numberOfEmployee: numberOfEmployee.value,
          largeArea: largeArea.value,
          topSellingBrand: topBrand.value,
          mostWantedBrand: wantedBrand.value,
          vehicleAccessibilityId: vehicleAccessibility.value.id,
          vehicleAccessibilityAmount: vehicleAccessibilityAmount.value,
        };
        editMerchantAction.editMerchant(dispatchSupplier, {
          data,
        });
        break;
      }
      case 'merchantAccountImage': {
        break;
      }
      default:
        break;
    }
  };

  //checkbutton
  /** === CHECK BUTTON (CHECK BUTTON SAVE DISBALE OR NOT) === */
  const checkButton = () => {
    switch (props.type) {
      case 'merchantOwnerName':
        return ownerName.value === ownerData?.name;
      case 'merchantOwnerEmail':
        return (
          ownerEmail.value === ownerData?.email
          // || this.state.emailIsNotValid
        );
      case 'merchantOwnerIdNo':
        return noKtp.value === ownerData?.idNo;
      case 'merchantOwnerTaxNo':
        return noNPWP.value === ownerData?.taxNo;
      case 'merchantOwnerPhoneNo':
        return mobilePhone.value === ownerData?.mobilePhone;
      case 'merchantOwnerImageId':
      case 'merchantOwnerImageSelfie':
      case 'merchantOwnerImageTax':
      case 'merchantImage':
      case 'merchantAccountName':
        return merchantName.value === storeData?.storeAccount.name;
      case 'merchantAccountPhoneNo':
      case 'merchantCompletenessInformation':
        return (
          largeArea.value === storeData?.storeDetailCompleteness.largeArea &&
          topBrand.value ===
            storeData?.storeDetailCompleteness.topSellingBrand &&
          wantedBrand.value ===
            storeData?.storeDetailCompleteness.mostWantedBrand &&
          vehicleAccessibilityAmount.value ===
            `${storeData?.storeDetailCompleteness.vehicleAccessibilityAmount}` &&
          vehicleAccessibility.value.id ===
            storeData?.storeDetailCompleteness.vehicleAccessibility.id &&
          numberOfEmployee.value ===
            storeData?.storeDetailCompleteness.numberOfEmployee
        );
      case 'merchantAddress':
      // return (
      //   this.props.global.longitude ===
      //     this.props.merchant.dataGetMerchantDetail.longitude &&
      //   this.props.global.latitude ===
      //     this.props.merchant.dataGetMerchantDetail.latitude &&
      //   this.state.address === data.address &&
      //   this.state.noteAddress === data.noteAddress
      // );
      default:
        break;
    }
  };
  /**
   * ================================
   * SWITCH VIEW
   * ================================
   */
  const switchView = () => {
    switch (props.type) {
      case 'merchantOwnerName':
        return renderOwnerName();
      case 'merchantOwnerEmail':
        return renderOwnerEmail();
      case 'merchantOwnerIdNo':
        return renderOwnerIdNo();
      case 'merchantOwnerTaxNo':
        return renderOwnerTaxNo();
      case 'merchantOwnerPhoneNo':
        return renderOwnerPhoneNo();
      case 'merchantCompletenessInformation':
        return renderCompletenessInformationMerchant();
      case 'merchantOwnerImageId':
        return renderOwnerImageId();
      case 'merchantOwnerImageSelfie':
        return renderOwnerImageSelfie();
      case 'merchantOwnerImageTax':
        return renderOwnerImageTax();
      case 'merchantAccountName':
        return renderMerchantAccountName();
      case 'merchantAccountPhoneNo':
        return renderMerchantAccountPhoneNo();
      //   case 'merchantAccountImage':
      //     return renderMerchantAccountImage();
      default:
        break;
    }
  };
  /** === VIEW === */
  /**
   * ==================================
   * RENDER OWNER DATA
   * ===================================
   */
  /** === RENDER OWNER NAME === */
  const renderOwnerName = () => {
    return (
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'Nama Lengkap Pemilik'}
          placeholder={'Masukan Nama Lengkap Pemilik'}
          type={'default'}
          value={ownerName.value}
          onChangeText={(text) => ownerName.setValue(text)}
          clearText={() => ownerName.setValue('')}
        />
      </View>
    );
  };
  /** === RENDER OWNER EMAIL === */
  const renderOwnerEmail = () => {
    return (
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'E-mail'}
          placeholder={'Masukan E-mail'}
          type={'default'}
          value={ownerEmail.value}
          onChangeText={(text) => ownerEmail.setValue(text)}
          clearText={() => ownerEmail.setValue('')}
        />
      </View>
    );
  };
  /** === RENDER OWNER NO HANDPHONE === */
  const renderOwnerPhoneNo = () => {
    return (
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'Nomor Handphone'}
          placeholder={'Masukan nomor handphone Anda'}
          type={'default'}
          value={mobilePhone.value}
          onChangeText={(text) => mobilePhone.setValue(text)}
          clearText={() => mobilePhone.setValue('')}
          maxLength={14}
          keyboardType={'numeric'}
        />
      </View>
    );
  };
  /** === RENDER OWNER NO KTP === */
  const renderOwnerIdNo = () => {
    return (
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'Nomor Kartu Tanda Penduduk (KTP)'}
          placeholder={'Masukan No.KTP maks. 16 Digit'}
          type={'default'}
          value={noKtp.value}
          onChangeText={(text) => noKtp.setValue(text)}
          clearText={() => noKtp.setValue('')}
          keyboardType={'numeric'}
        />
      </View>
    );
  };
  /** === RENDER OWNER NO NPWP === */
  const renderOwnerTaxNo = () => {
    return (
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'Nomor Pokok Wajib Pajak (NPWP) Pemilik'}
          placeholder={'Masukan No.NPWP maks.15 Digit'}
          type={'default'}
          value={noNPWP.value}
          onChangeText={(text) => noNPWP.setValue(text)}
          clearText={() => noNPWP.setValue('')}
        />
      </View>
    );
  };
  /** === RENDER OWNER IMAGE ID === */
  const renderOwnerImageId = () => {
    return (
      <View style={{ flex: 1 }}>
        {renderIF(
          capturedImage.data !== null,
          renderImagePreview(),
          <SnbUploadPhotoRules
            rulesTitle="Pastikan Foto KTP Anda Sesuai Ketentuan"
            imgSrc="https://s3-alpha-sig.figma.com/img/4e9b/f869/7b2c7d944da2051c0422f41d9b920d88?Expires=1632096000&Signature=PcMkPhandytpXueLoKbXpj9CUT-4LYOkuxWsfeCUMeMhVNynnb66TmCR6JFZWx-5DLmy0fS0Q6KbGajNdAGbG7DD0Oa76~Z0~1F7K7eItCqYgyCwUL8SGpc~frmLBUqLTqs-NqOea0vPqJifZL-d-nt7IK3XWQ97~IYjB5ujfx87JbeE-k1U-YkQsYjV7zr00rdg4h-gekAhYW0rHN~-4Hm6P8qjFGIaY3p3X4leIanac8HYnx~bpQHIY8HMA-Fz69TxpmamCyKuhau2HwOMcvW2EcYbr4424YrsQUhnNYmsIw7BTckpMk2NYKTXG~3vSzisYypLJQxHItfBZEi0VQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            title="Unggah Foto KTP"
            rules={[
              'Pastikan KTP sesuai dengan identitas Anda',
              'KTP Tidak silau dan tidak buram',
              'Pastikan KTP bisa terbaca dengan jelas',
              'Hindari Tangan Menutupi KTP',
            ]}
            action={() => openCamera('ktp')}
          />,
        )}
      </View>
    );
  };
  /** === RENDER OWNER IMAGE Selfie === */
  const renderOwnerImageSelfie = () => {
    return (
      <View style={{ flex: 1 }}>
        {renderIF(
          capturedImage.data !== null,
          renderImagePreview(),
          <SnbUploadPhotoRules
            rulesTitle="Pastikan Foto Selfie dengan KTP Anda Sesuai Ketentuan"
            imgSrc="https://s3-alpha-sig.figma.com/img/c574/249b/f08ded42c46f8427961fd40b348661e1?Expires=1631491200&Signature=KeYeygi5MdQe~mRDLUAh8eA44ZDz50Ky9cGKdf3uDZr7MqCPw7aFNCska4DaY-GnI29-ENc177K-m5YK3FDUnbgb6UKzQDuULdIqlZucpBhGIPqRBFTvr0b-5lC7dZmv97j6UJ3~ketFJf7H8GdPxPFdDwegMoYPOSqPscb1E46iU1h8iM8Uu~1Rq5~2t8qp~EX6mwrLabvJWTc0rywhHhpzpV~Vi6qGn3Rx0U9JAvBbA7rUjG4HWGa5t0kcLIRZ~shAQDMPKp2FGsg2z-Na7xPqur5h6VLSGTpD6V909BpYx2FxfFyFiw76Ug2s82tgm4iY0bnsf6cg-dHMS2sgxg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            title="Unggah Foto Diri dengan KTP Owner"
            rules={[
              'Posisikan KTP di bawah dagu Anda',
              'KTP Tidak silau dan tidak buram',
              'Pastikan KTP bisa terbaca dengan jelas',
              'Hindari Tangan Menutupi KTP',
            ]}
            action={() => openCamera('selfie')}
          />,
        )}
      </View>
    );
  };

  /** === RENDER OWNER IMAGE TAX === */
  const renderOwnerImageTax = () => {
    return (
      <View style={{ flex: 1 }}>
        {renderIF(
          capturedImage.data !== null,
          renderImagePreview(),
          <SnbUploadPhotoRules
            rulesTitle="Pastikan Foto NPWP Anda Sesuai Ketentuan"
            imgSrc="https://s3-alpha-sig.figma.com/img/4f9b/2a06/d04d4acef65a83217d814ed9aa953a31?Expires=1632096000&Signature=Wl0ScvJmSsWpSqCsSvjBsKVjEUc53NoEawaVNBGALvYfoCwe5P2hyo45Ba2NSThzZbPaDrpRV7Gl7MVSwhkSqoh8cbMoJcAQp0ic2UwKW6cP0oYcNfFiE77QeU7zJo5kbhr1J3RRYVMnZ0nvYUqgBjrVtt6utz7AjkGNDqVyWAReTUOsEM4BHNUAioWtFAbdZAjsqRVp2H6SkuEKjVum90HnG0xHeOVdp5HGo3CB96s~y7aqrhlxb3Z-NISSbYmxYdDeH0RmDNo8sao-xzB5HWcYR1Uiy-60bQSOQXjFjsu9V~D72rT3ERNYvDu2Ez8VneDD3oGZuT7abW1RcT1wXg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            title="Unggah Foto NPWP"
            rules={[
              'Pastikan NPWP sesuai dengan identitas Anda',
              'NPWP Tidak silau dan tidak buram',
              'Pastikan NPWP bisa terbaca dengan jelas',
              'Hindari Tangan Menutupi NPWP',
            ]}
            action={() => openCamera('npwp')}
          />,
        )}
      </View>
    );
  };

  const renderImagePreview = () => {
    const isImageCaptured = capturedImage.data;
    return (
      <View style={{ flex: 1 }}>
        <Image
          resizeMode="contain"
          source={{
            uri: capturedImage?.data?.url,
          }}
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
              onPress={() => openCamera('ktp')}
              disabled={false}
            />
          </View>
          <View style={{ height: 72 }}>
            <SnbButton.Single
              type={isImageCaptured ? 'secondary' : 'primary'}
              title={isImageCaptured ? 'Upload' : 'Selanjutnya'}
              shadow
              loading={false}
              onPress={() => {}}
              disabled={false}
            />
          </View>
        </View>
      </View>
    );
  };
  /**
   * =====================================
   * RENDER ACCOUNT MERCHANT (AKUN TOKO)
   * =====================================
   */
  /** === RENDER MERCHANT ACCOUNT NAME === */
  const renderMerchantAccountName = () => {
    return (
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'Nama Toko'}
          placeholder={'Masukan Nama Toko'}
          type={'default'}
          value={merchantName.value}
          onChangeText={(text) => merchantName.setValue(text)}
          clearText={() => merchantName.setValue('')}
        />
      </View>
    );
  };
  /** === RENDER MERCHANT ACCOUNT PHONE NUMBER === */
  const renderMerchantAccountPhoneNo = () => {
    return (
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'Nomor Handphone Toko'}
          placeholder={'Masukan Nomor Handphone Toko'}
          type={'default'}
          value={''}
          onChangeText={(text) => console.log(text)}
          clearText={() => console.log('clear')}
        />
      </View>
    );
  };
  /** === RENDER COMPLETENESS MERCHANT INFORMATION DETAIL === */
  const renderCompletenessInformationMerchant = () => {
    return (
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <SnbTextFieldSelect
            placeholder={'Pilih Jumlah Karyawan'}
            type={'default'}
            value={numberOfEmployee.value}
            onPress={() => gotoSelection({ type: 'listNumOfEmployee' })}
            rightIcon={'chevron_right'}
            rightType={'icon'}
            labelText={'Jumlah Karyawan'}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Ukuran Toko'}
            placeholder={'Masukan Ukuran Toko'}
            type={'default'}
            value={largeArea.value}
            onChangeText={(text) => largeArea.setValue(text)}
            clearText={() => largeArea.setValue('')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Top Brand Selling'}
            placeholder={'Masukan Top Brand Selling'}
            type={'default'}
            value={topBrand.value}
            onChangeText={(text) => topBrand.setValue(text)}
            clearText={() => topBrand.setValue('')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Wanted Brand'}
            placeholder={'Masukan Wanted Brand'}
            type={'default'}
            value={wantedBrand.value}
            onChangeText={(text) => wantedBrand.setValue(text)}
            clearText={() => wantedBrand.setValue('')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextFieldSelect
            placeholder={'Pilih Akses Jalan'}
            type={'default'}
            value={vehicleAccessibility.value.name}
            onPress={() => gotoSelection({ type: 'listVehicleAccess' })}
            rightIcon={'chevron_right'}
            rightType={'icon'}
            labelText={'Akses Jalan'}
          />
        </View>
        <View>
          <SnbTextField.Text
            labelText={'Jumlah Akses Jalan'}
            placeholder={'Masukan Jumlah Akses Jalan'}
            type={'default'}
            value={`${vehicleAccessibilityAmount.value}`}
            onChangeText={(text) => vehicleAccessibilityAmount.setValue(text)}
            clearText={() => vehicleAccessibilityAmount.setValue('')}
            keyboardType={'number-pad'}
          />
        </View>
      </View>
    );
  };
  /** === RENDER BUTTON === */
  const renderButton = () => {
    const labelVerify =
      props.type === 'merchantOwnerEmail' ||
      props.type === 'merchantOwnerPhoneNo';

    return props.showButton ? (
      <View style={{ height: 75 }}>
        <SnbButton.Single
          title={labelVerify ? 'Verifikasi' : 'Simpan'}
          type={'primary'}
          onPress={() => confirm()}
          disabled={checkButton() || false}
        />
      </View>
    ) : (
      <View />
    );
  };
  /** === RENDER TOAST === */
  const renderToast = () => {
    return (
      <SnbToast
        open={isOpenToast}
        message={toasMessage}
        close={() => setIsOpenToast(false)}
      />
    );
  };
  /** this for main view */
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={MerchantStyles.mainContainer}>
        {switchView()}
      </ScrollView>
      {renderButton()}
      {renderToast()}
      {/* {renderButtonOpenCamera()} */}
      {/* {this.state.showModalError && this.renderModalError()} */}
    </View>
  );
};
export default MerchantEditPartialView;
