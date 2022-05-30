import React, { FC, useEffect, useState } from 'react';
import {
  SnbTextField2,
  SnbButton2,
  SnbToast,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import { MerchantHookFunc, useInput } from '../../function';
import { UserHookFunc } from '../../../user/functions';
import { useTextFieldSelect } from '@screen/auth/functions';
import { NavigationAction } from '@navigation';

import { useQuestTaskAction } from '../../../quest/function';
import { useQuestContext } from 'src/data/contexts/quest/useQuestContext';
import { TextFieldSelect } from '@screen/account/views';

interface Props {
  type: any;
  showButton: boolean;
  source: string;
  sourceData: any;
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
  const storeData = stateUser.detail.data?.buyerData.buyerInformation;
  const buyerAddressData = stateUser.detail.data?.buyerData.buyerAddress;
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
  const merchantName = useInput(storeData?.buyerAccount?.name || '');
  const merchantPhoneNo = useInput(storeData?.buyerAccount?.phoneNo || null);
  const merchantSize = useInput(storeData?.buyerAccount?.largeArea || null);
  const vehicleAccessibility = useInput(
    buyerAddressData?.vehicleAccessibility || null,
  );
  const largeArea = useInput(storeData?.buyerAccount?.largeArea || null);
  const vehicleAccessibilityAmount = useInput(
    buyerAddressData?.vehicleAccessibilityAmount || null,
  );
  // realated quest hook
  const { dispatchQuest } = useQuestContext();
  const { update } = useQuestTaskAction();

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
      SnbToast.show('Data Gagal Diperbaharui', 2500, { positionValue: 56 });
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
        source: props.source,
        sourceData: props.sourceData,
      });
    }
  }, [stateMerchant]);

  React.useEffect(() => {
    switch (selectedItem?.type) {
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
        // if source Quest & phone verification, update quest task status
        if (props.source === 'Quest') {
          const data = {
            questId: props.sourceData?.questId,
            taskId: props.sourceData?.taskId,
            status: 'done',
          };
          update(dispatchQuest, { data });
        }
        break;
      }
      case 'merchantOwnerIdNo': {
        data = {
          user: {
            idNo: noKtp.value,
          },
        };
        editProfileAction.editProfile(dispatchSupplier, {
          data,
        });
        break;
      }
      case 'merchantOwnerTaxNo': {
        data = {
          user: {
            taxNo: noNPWP.value,
          },
        };
        editProfileAction.editProfile(dispatchSupplier, {
          data,
        });
        break;
      }
      case 'merchantOwnerName': {
        data = {
          user: {
            name: ownerName.value,
          },
        };
        editProfileAction.editProfile(dispatchSupplier, {
          data,
        });
        // if source Quest & owner name, update quest task status
        if (props.source === 'Quest') {
          const data = {
            questId: props.sourceData?.questId,
            taskId: props.sourceData?.taskId,
            status: 'done',
          };
          update(dispatchQuest, { data });
        }
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
      case 'merchantAccountSize': {
        data = {
          largeArea: merchantSize.value,
        };
        editMerchantAction.editMerchant(dispatchSupplier, {
          data,
        });
        break;
      }
      case 'merchantCompletenessInformation': {
        data = {
          largeArea: largeArea.value,
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
          merchantName.value === storeData?.buyerAccount.name ||
          !merchantName.value
        );
      case 'merchantAccountPhoneNo':
        return merchantPhoneNo.value === storeData?.buyerAccount?.phoneNo;
      case 'merchantCompletenessInformation':
        return (
          (dataLargeArea === storeData?.buyerAccount.largeArea &&
            dataVehicleAccessibilityAmount ===
              buyerAddressData?.vehicleAccessibilityAmount &&
            vehicleAccessibility.value.id ===
              buyerAddressData?.vehicleAccessibility?.id) ||
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
      case 'merchantAccountSize':
        return renderMerchantAccountSize();
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
      <View style={styles.textFieldContainer}>
        <SnbTextField2.Text
          labelText={'Nama Lengkap Pemilik'}
          placeholder={'Masukkan Nama Lengkap Pemilik'}
          type={'default'}
          value={ownerName.value ? ownerName.value : ''}
          onChangeText={(text) => ownerName.setValue(text)}
          onClearText={() => ownerName.setValue('')}
          maxLength={64}
        />
      </View>
    );
  };
  /** === RENDER OWNER EMAIL === */
  const renderOwnerEmail = () => {
    return (
      <View style={styles.textFieldContainer}>
        <SnbTextField2.Text
          labelText={'E-mail'}
          placeholder={'Masukkan E-mail'}
          type={emailIsNotValid ? 'error' : 'default'}
          value={ownerEmail.value ? ownerEmail.value : ''}
          onChangeText={(text) => validateEmail(text)}
          onClearText={() => ownerEmail.setValue('')}
          valMsgError={'Pastikan email yang Anda masukkan benar'}
        />
      </View>
    );
  };
  /** === RENDER OWNER NO HANDPHONE === */
  const renderOwnerPhoneNo = () => {
    return (
      <View style={styles.textFieldContainer}>
        <SnbTextField2.Text
          labelText={'Nomor Handphone'}
          placeholder={'Masukkan nomor handphone Anda'}
          type={'default'}
          value={mobilePhone.value ? mobilePhone.value : ''}
          onChangeText={(text) => mobilePhone.setValue(text)}
          onClearText={() => mobilePhone.setValue('')}
          maxLength={14}
          keyboardType={'numeric'}
        />
      </View>
    );
  };
  /** === RENDER OWNER NO KTP === */
  const renderOwnerIdNo = () => {
    return (
      <View style={styles.textFieldContainer}>
        <SnbTextField2.Text
          labelText={'Nomor Kartu Tanda Penduduk (KTP)'}
          placeholder={'Masukkan Nomor KTP maks. 16 Digit'}
          type={errorIdNumber ? 'error' : 'default'}
          value={noKtp.value ? noKtp.value : ''}
          onChangeText={(text) => {
            const cleanNumber = text.replace(/[^0-9]/g, '');
            checkIdNoFormat(cleanNumber);
          }}
          onClearText={() => noKtp.setValue('')}
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
      <View style={styles.textFieldContainer}>
        <SnbTextField2.Text
          labelText={'Nomor Pokok Wajib Pajak (NPWP) Pemilik'}
          placeholder={'Masukkan Nomor NPWP maks.15 Digit'}
          type={errorTaxNumber ? 'error' : 'default'}
          value={noNPWP.value ? noNPWP.value : ''}
          onChangeText={(text) => {
            const cleanNumber = text.replace(/[^0-9]/g, '');
            checkTaxNoFormat(cleanNumber);
          }}
          onClearText={() => noNPWP.setValue('')}
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
      <View style={styles.textFieldContainer}>
        <SnbTextField2.Text
          labelText={'Nama Toko'}
          placeholder={'Masukkan Nama Toko'}
          type={'default'}
          value={merchantName.value}
          onChangeText={(text) => merchantName.setValue(text)}
          onClearText={() => merchantName.setValue('')}
          maxLength={50}
        />
      </View>
    );
  };
  /** === RENDER MERCHANT ACCOUNT PHONE NUMBER === */
  const renderMerchantAccountPhoneNo = () => {
    return (
      <View style={styles.textFieldContainer}>
        <SnbTextField2.Text
          labelText={'Nomor Handphone Toko'}
          placeholder={'Masukkan Nomor Handphone Toko'}
          type={'default'}
          value={merchantPhoneNo.value ? merchantPhoneNo.value : ''}
          onChangeText={(text) => {
            const cleanNumber = text.replace(/[^0-9]/g, '');
            merchantPhoneNo.setValue(cleanNumber);
          }}
          onClearText={() => merchantPhoneNo.setValue('')}
          maxLength={14}
          keyboardType={'number-pad'}
        />
      </View>
    );
  };
  /** === RENDER MERCHANT ACCOUNT SIZE === */
  const renderMerchantAccountSize = () => {
    return (
      <View style={styles.textFieldContainer}>
        <SnbTextField2.Text
          labelText={'Ukuran Toko'}
          placeholder={'Masukkan Ukuran Toko (dalam meter)'}
          type={'default'}
          keyboardType={'numeric'}
          value={merchantSize.value}
          onChangeText={(text) => {
            text = text.replace(/[^0-9]/g, '');
            merchantSize.setValue(text);
          }}
          onClearText={() => merchantName.setValue('')}
          maxLength={50}
        />
      </View>
    );
  };
  /** === RENDER COMPLETENESS MERCHANT INFORMATION DETAIL === */
  const renderCompletenessInformationMerchant = () => {
    return (
      <View style={styles.textFieldContainer}>
        <View style={{ marginBottom: layout.spacing.lg }}>
          <SnbTextField2.Text
            labelText={'Ukuran Toko'}
            placeholder={'Masukkan Ukuran Toko'}
            type={'default'}
            value={largeArea.value ? largeArea.value : ''}
            onChangeText={(text) => {
              const cleanNumber = text.replace(/[^0-9]/g, '');
              largeArea.setValue(cleanNumber);
            }}
            onClearText={() => largeArea.setValue('')}
            keyboardType={'number-pad'}
            maxLength={4}
          />
        </View>
        <View style={{ marginBottom: layout.spacing.lg }}>
          <TextFieldSelect
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
          <SnbTextField2.Text
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
            onClearText={() => vehicleAccessibilityAmount.setValue('')}
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
      <View style={{ padding: layout.spacing.lg }}>
        <SnbButton2.Primary
          title={labelVerify ? 'Verifikasi' : 'Simpan'}
          onPress={() => confirm()}
          disabled={
            checkButton() ||
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
          size="medium"
          full
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
    </View>
  );
};

const styles = StyleSheet.create({
  textFieldContainer: {
    flex: 1,
    marginTop: layout.spacing.lg,
    marginHorizontal: layout.spacing.lg,
  },
});
export default MerchantEditPartialView;
