import React, { FC, useEffect, useState } from 'react';
import {
  SnbTextField,
  SnbTextFieldSelect,
  SnbButton,
  SnbToast,
} from 'react-native-sinbad-ui';
import { ScrollView, View, KeyboardAvoidingView } from 'react-native';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import { MerchantHookFunc, useInput } from '../../function';
import { UserHookFunc } from '../../../user/functions';
import { useTextFieldSelect } from '@screen/auth/functions';
import { NavigationAction } from '@navigation';

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
  const { gotoSelection, selectedItem, resetSelectedItem } =
    useTextFieldSelect();
  const storeData = stateUser.detail.data?.storeData.storeInformation;
  // USER DATA
  const ownerName = useInput(ownerData?.name || null);
  const ownerEmail = useInput(ownerData?.email || null);
  const noKtp = useInput(ownerData?.idNo || null);
  const noNPWP = useInput(ownerData?.taxNo || null);
  const mobilePhone = useInput(ownerData?.mobilePhone || null);
  const [emailIsNotValid, setEmailIsNotValid] = useState(false);
  const [errorIdNumber, setErrorIdNumber] = useState(false);
  const [errorTaxNumber, setErrorTaxNumber] = useState(false);
  //MERCHANT DATA
  const merchantName = useInput(storeData?.storeAccount?.name || '');
  const merchantPhoneNo = useInput(storeData?.storeAccount?.phoneNo || null);
  // COMPLETNESS DATA
  const numberOfEmployee = useInput(
    storeData?.storeDetailCompleteness?.numberOfEmployee || null,
  );
  const vehicleAccessibility = useInput(
    storeData?.storeDetailCompleteness?.vehicleAccessibility || null,
  );
  const largeArea = useInput(
    storeData?.storeDetailCompleteness?.largeArea || null,
  );
  const topBrand = useInput(
    storeData?.storeDetailCompleteness?.topSellingBrand || null,
  );
  const wantedBrand = useInput(
    storeData?.storeDetailCompleteness?.mostWantedBrand || null,
  );
  const vehicleAccessibilityAmount = useInput(
    storeData?.storeDetailCompleteness?.vehicleAccessibilityAmount || null,
  );
  const toast = React.useRef<any>();

  useEffect(() => {
    if (
      stateMerchant.profileEdit.data !== null ||
      stateMerchant.merchantEdit.data !== null
    ) {
      NavigationAction.back();
      editMerchantAction.reset(dispatchSupplier);
      editProfileAction.reset(dispatchSupplier);
      storeDetailAction.detail(dispatchUser);
    } else if (
      stateMerchant.profileEdit.error ||
      stateMerchant.merchantEdit.error
    ) {
      toast.current?.show('Data Gagal Diperbaharui');
    }
  }, [stateMerchant]);

  useEffect(() => {
    if (stateMerchant.changeEmail.data !== null) {
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
        data = {
          phoneNo: merchantPhoneNo.value,
        };
        editMerchantAction.editMerchant(dispatchSupplier, {
          data,
        });
        break;
      }
      case 'merchantCompletenessInformation': {
        data = {
          numberOfEmployee: numberOfEmployee.value,
          largeArea: largeArea.value,
          topSellingBrand: topBrand.value,
          mostWantedBrand: wantedBrand.value,
          vehicleAccessibilityId: vehicleAccessibility.value.id,
          vehicleAccessibilityAmount: vehicleAccessibilityAmount.value
            ? Number(vehicleAccessibilityAmount.value)
            : null,
        };
        editMerchantAction.editMerchant(dispatchSupplier, {
          data,
        });
        break;
      }
      default:
        break;
    }
  };

  /** VALIDATE EMAIL */
  const validateEmail = (email: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      setEmailIsNotValid(false);
    } else {
      setEmailIsNotValid(true);
    }
    ownerEmail.setValue(email);
  };
  /** === CHECK ID NUMBER FORMAT === */
  const checkIdNoFormat = (idNumber: any) => {
    noKtp.setValue(idNumber);
    if (idNumber === '' || idNumber.length === 16) {
      setErrorIdNumber(false);
    } else {
      setErrorIdNumber(true);
    }
  };
  /** === CHECK TAX NUMBER FORMAT === */
  const checkTaxNoFormat = (taxNumber: any) => {
    noNPWP.setValue(taxNumber);
    if (taxNumber === '' || taxNumber.length === 15) {
      setErrorTaxNumber(false);
    } else {
      setErrorTaxNumber(true);
    }
  };
  //checkbutton
  /** === CHECK BUTTON (CHECK BUTTON SAVE DISBALE OR NOT) === */
  const checkButton = () => {
    const dataVehicleAccessibilityAmount = vehicleAccessibilityAmount.value
      ? Number(vehicleAccessibilityAmount.value)
      : null;
    const dataTopBrand = topBrand.value ? topBrand.value : null;
    const dataWantedBrand = wantedBrand.value ? wantedBrand.value : null;
    const dataLargeArea = largeArea.value ? largeArea.value : null;
    switch (props.type) {
      case 'merchantOwnerName':
        return ownerName.value === ownerData?.name || !ownerName.value;
      case 'merchantOwnerEmail':
        return (
          (stateUser.detail.data?.ownerData.info.isEmailVerified &&
            ownerEmail.value === ownerData?.email) ||
          emailIsNotValid ||
          !ownerEmail.value
        );
      case 'merchantOwnerIdNo':
        return errorIdNumber || noKtp.value === ownerData?.idNo || !noKtp.value;
      case 'merchantOwnerTaxNo':
        return (
          errorTaxNumber || noNPWP.value === ownerData?.taxNo || !noNPWP.value
        );
      case 'merchantOwnerPhoneNo':
        return (
          (stateUser.detail.data?.ownerData.info.isMobilePhoneVerified &&
            mobilePhone.value === ownerData?.mobilePhone) ||
          !mobilePhone.value
        );
      case 'merchantAccountName':
        return (
          merchantName.value === storeData?.storeAccount.name ||
          !merchantName.value
        );
      case 'merchantAccountPhoneNo':
        return merchantPhoneNo.value === storeData?.storeAccount?.phoneNo;
      case 'merchantCompletenessInformation':
        return (
          (dataLargeArea === storeData?.storeDetailCompleteness.largeArea &&
            dataTopBrand ===
              storeData?.storeDetailCompleteness.topSellingBrand &&
            dataWantedBrand ===
              storeData?.storeDetailCompleteness.mostWantedBrand &&
            dataVehicleAccessibilityAmount ===
              storeData?.storeDetailCompleteness.vehicleAccessibilityAmount &&
            vehicleAccessibility.value.id ===
              storeData?.storeDetailCompleteness.vehicleAccessibility?.id &&
            numberOfEmployee.value ===
              storeData?.storeDetailCompleteness.numberOfEmployee) ||
          vehicleAccessibility.value.id === null
        );
      case 'merchantAddress':
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
      case 'merchantAccountName':
        return renderMerchantAccountName();
      case 'merchantAccountPhoneNo':
        return renderMerchantAccountPhoneNo();
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
          placeholder={'Masukkan Nama Lengkap Pemilik'}
          type={'default'}
          value={ownerName.value ? ownerName.value : ''}
          onChangeText={(text) => ownerName.setValue(text)}
          clearText={() => ownerName.setValue('')}
          maxLength={64}
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
          placeholder={'Masukkan E-mail'}
          type={emailIsNotValid ? 'error' : 'default'}
          value={ownerEmail.value ? ownerEmail.value : ''}
          onChangeText={(text) => validateEmail(text)}
          clearText={() => ownerEmail.setValue('')}
          valMsgError={'Pastikan email yang Anda masukkan benar'}
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
          placeholder={'Masukkan nomor handphone Anda'}
          type={'default'}
          value={mobilePhone.value ? mobilePhone.value : ''}
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
          placeholder={'Masukkan Nomor KTP maks. 16 Digit'}
          type={errorIdNumber ? 'error' : 'default'}
          value={noKtp.value ? noKtp.value : ''}
          onChangeText={(text) => {
            const cleanNumber = text.replace(/[^0-9]/g, '');
            checkIdNoFormat(cleanNumber);
          }}
          clearText={() => noKtp.setValue('')}
          keyboardType={'numeric'}
          maxLength={16}
          valMsgError={'Pastikan Nomor KTP 16 Digit'}
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
          placeholder={'Masukkan Nomor NPWP maks.15 Digit'}
          type={errorTaxNumber ? 'error' : 'default'}
          value={noNPWP.value ? noNPWP.value : ''}
          onChangeText={(text) => {
            const cleanNumber = text.replace(/[^0-9]/g, '');
            checkTaxNoFormat(cleanNumber);
          }}
          clearText={() => noNPWP.setValue('')}
          valMsgError={'Pastikan Nomor NPWP 15 Digit'}
          maxLength={15}
          keyboardType={'number-pad'}
        />
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
          placeholder={'Masukkan Nama Toko'}
          type={'default'}
          value={merchantName.value}
          onChangeText={(text) => merchantName.setValue(text)}
          clearText={() => merchantName.setValue('')}
          maxLength={50}
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
          placeholder={'Masukkan Nomor Handphone Toko'}
          type={'default'}
          value={merchantPhoneNo.value ? merchantPhoneNo.value : ''}
          onChangeText={(text) => {
            const cleanNumber = text.replace(/[^0-9]/g, '');
            merchantPhoneNo.setValue(cleanNumber);
          }}
          clearText={() => merchantPhoneNo.setValue('')}
          maxLength={14}
          keyboardType={'number-pad'}
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
            value={numberOfEmployee.value ? numberOfEmployee.value : ''}
            onPress={() =>
              gotoSelection({ type: 'listNumOfEmployee', action: 'edit' })
            }
            rightIcon={'chevron_right'}
            rightType={'icon'}
            labelText={'Jumlah Karyawan'}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Ukuran Toko'}
            placeholder={'Masukkan Ukuran Toko'}
            type={'default'}
            value={largeArea.value ? largeArea.value : ''}
            onChangeText={(text) => {
              const cleanNumber = text.replace(/[^0-9]/g, '');
              largeArea.setValue(cleanNumber);
            }}
            clearText={() => largeArea.setValue('')}
            keyboardType={'number-pad'}
            rightText={'m²'}
            maxLength={4}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Merk Paling Laku'}
            placeholder={'Masukkan Merk Paling Laku'}
            type={'default'}
            value={topBrand.value ? topBrand.value : ''}
            onChangeText={(text) => topBrand.setValue(text)}
            clearText={() => topBrand.setValue('')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Merk Paling Diinginkan'}
            placeholder={'Masukkan Merk Paling Diinginkan'}
            type={'default'}
            value={wantedBrand.value ? wantedBrand.value : ''}
            onChangeText={(text) => wantedBrand.setValue(text)}
            clearText={() => wantedBrand.setValue('')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextFieldSelect
            placeholder={'Pilih Akses Jalan'}
            type={'default'}
            value={
              vehicleAccessibility.value.name
                ? vehicleAccessibility.value.name
                : ''
            }
            onPress={() =>
              gotoSelection({ type: 'listVehicleAccess', action: 'edit' })
            }
            rightIcon={'chevron_right'}
            rightType={'icon'}
            labelText={'Akses Jalan'}
            mandatory
          />
        </View>
        <View>
          <SnbTextField.Text
            labelText={'Jumlah Akses Jalan'}
            placeholder={'Masukkan Jumlah Akses Jalan'}
            type={'default'}
            value={
              vehicleAccessibilityAmount.value
                ? `${vehicleAccessibilityAmount.value}`
                : ''
            }
            onChangeText={(text) => {
              const cleanNumber = text.replace(/[^0-9]/g, '');
              vehicleAccessibilityAmount.setValue(cleanNumber);
            }}
            clearText={() => vehicleAccessibilityAmount.setValue('')}
            keyboardType={'number-pad'}
            maxLength={1}
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
          disabled={
            checkButton() ||
            false ||
            stateMerchant.merchantEdit.loading ||
            stateMerchant.profileEdit.loading ||
            stateMerchant.changeMobilePhone.loading ||
            stateMerchant.changeEmail.loading
          }
          loading={
            stateMerchant.merchantEdit.loading ||
            stateMerchant.profileEdit.loading ||
            stateMerchant.changeMobilePhone.loading ||
            stateMerchant.changeEmail.loading
          }
        />
      </View>
    ) : (
      <View />
    );
  };
  /** this for main view */
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={MerchantStyles.mainContainer}>
          {switchView()}
        </ScrollView>
        {renderButton()}
      </KeyboardAvoidingView>
      <SnbToast
        ref={toast}
        duration={3000}
        position="bottom"
        positionValue={72}
      />
    </View>
  );
};
export default MerchantEditPartialView;
