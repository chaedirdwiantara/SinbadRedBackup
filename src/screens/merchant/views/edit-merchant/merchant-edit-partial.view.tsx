import React, { FC, useEffect } from 'react';
import {
  SnbTextField,
  SnbTextFieldSelect,
  SnbButton,
} from 'react-native-sinbad-ui';
import { ScrollView, View, ToastAndroid } from 'react-native';
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
  const ownerName = useInput(ownerData?.name || '');
  const ownerEmail = useInput(ownerData?.email || '');
  const noKtp = useInput(ownerData?.idNo || '');
  const noNPWP = useInput(ownerData?.taxNo || '');
  const mobilePhone = useInput(ownerData?.mobilePhone || '');
  //MERCHANT DATA
  const merchantName = useInput(storeData?.storeAccount?.name || '');
  const merchantPhoneNo = useInput(storeData?.storeAccount?.phoneNo || '');
  // COMPLETNESS DATA
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

  useEffect(() => {
    if (
      stateMerchant.profileEdit.data !== null ||
      stateMerchant.merchantEdit.data !== null
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'Success',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
      NavigationAction.back();
      editMerchantAction.reset(dispatchSupplier);
      editProfileAction.reset(dispatchSupplier);
      storeDetailAction.detail(dispatchUser, { id: '3' });
    } else if (
      stateMerchant.profileEdit.error ||
      stateMerchant.merchantEdit.error
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'Failed',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
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
  }, [stateMerchant.changeEmail]);

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
          vehicleAccessibilityAmount: vehicleAccessibilityAmount.value,
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
          value={merchantPhoneNo.value}
          onChangeText={(text) => merchantPhoneNo.setValue(text)}
          clearText={() => merchantPhoneNo.setValue('')}
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
  /** this for main view */
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={MerchantStyles.mainContainer}>
        {switchView()}
      </ScrollView>
      {renderButton()}
    </View>
  );
};
export default MerchantEditPartialView;
