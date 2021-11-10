import React, { FC, useEffect, useState } from 'react';
import {
  SnbText,
  SnbTopNav,
  SnbButton,
  SnbTextField,
  SnbTextFieldSelect,
  color,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';
import {
  ScrollView,
  View,
  TouchableOpacity,
  BackHandler,
  KeyboardAvoidingView,
} from 'react-native';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { NavigationAction } from '@navigation';
import { contexts } from '@contexts';
import { useTextFieldSelect } from '@screen/auth/functions';
import { useInput, MerchantHookFunc } from '../../function';

interface Props {
  route: any;
}

const MerchantEditPartialView: FC<Props> = (props) => {
  //DATA
  const TNC_CONTENT = [
    'Setiap pengguna hanya dapat memiliki 1(satu) rekening Bank yang terdaftar pada akun Sinbad. Pengguna memahami dan menyetujui bahwa Pengguna bertanggung jawab penuh atas penggunaan rekening Bank yang didaftarkan tersebut.',
    'Pendaftaran rekening Bank dapat digunakan untuk melakukan refund.',
    'Sinbad berhak untuk melakukan pembatasan Rekening Bank, pembekuan dan/atau penghapusan akun Bank yang didaftarkan sesuai dengan kebijakan yang ditentukan oleh Sinbad. Dalam hal ini, jika ditemukan adanya dugaan pelanggaran syarat dan ketentuan, kecurangan, manipulasi atau kejahatan yang dilakukan oleh Pengguna pada Situs/Aplikasi.',
  ];
  //HOOK
  const { stateUser } = React.useContext(contexts.UserContext);
  const bankData = stateUser.detail.data?.ownerData.profile.bankAccount;
  const changeBankAccountAction = MerchantHookFunc.useChangeBankAccount();
  const { stateMerchant, dispatchSupplier } = React.useContext(
    contexts.MerchantContext,
  );
  const { gotoSelection, selectedItem } = useTextFieldSelect();
  const bankId = useInput(bankData?.bankId || null);
  const bankName = useInput(bankData?.bankName || '');
  const bankAccountNo = useInput(bankData?.bankAccountNo || '');
  const bankAccountName = useInput(bankData?.bankAccountName || '');
  const bankBranchName = useInput(bankData?.bankBranchName || '');
  const [openModalTNC, setOpenModalTNC] = useState(false);
  useEffect(() => {
    if (selectedItem?.item) {
      bankId.setValue(selectedItem.item.id);
      bankName.setValue(selectedItem.item.name);
    }
  }, [selectedItem]);
  useEffect(() => {
    if (stateMerchant.changeBankAccount.data) {
      NavigationAction.navigate('MerchantOtpView', {
        type: 'bankAccount',
        data: stateUser.detail.data?.ownerData.profile.mobilePhone,
        bankData: {
          bankId: bankId.value,
          accountName: bankAccountName.value,
          accountNo: bankAccountNo.value,
          branch: bankBranchName.value,
        },
      });
    }
  }, [stateMerchant]);
  //hardware back handler
  useEffect(() => {
    const backAction = () => {
      NavigationAction.back();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  /** function */
  const checkButton = () => {
    if (
      bankId.value === bankData?.bankId &&
      bankAccountNo.value === bankData?.bankAccountNo &&
      bankAccountName.value === bankData?.bankAccountName &&
      bankBranchName.value === bankData?.bankBranchName &&
      stateUser.detail.data?.ownerData.info.isBankAccountVerified === true
    ) {
      return true;
    } else if (
      bankId.value === null ||
      bankAccountNo.value === '' ||
      bankAccountName.value === ''
    ) {
      return true;
    } else {
      return false;
    }
  };
  const confirm = () => {
    const data = {
      bankId: bankId.value,
      accountName: bankAccountName.value,
      accountNo: bankAccountNo.value,
      branch: bankBranchName.value,
    };
    changeBankAccountAction.changeBankAccount(dispatchSupplier, { data });
  };
  /** header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={props.route.params.title}
        backAction={() => NavigationAction.back()}
      />
    );
  };

  /** content */
  const renderContent = () => {
    return (
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <SnbTextFieldSelect
            placeholder={'Pilih Nama Bank'}
            type={'default'}
            value={bankName.value}
            onPress={() => gotoSelection({ type: 'listBank' })}
            rightIcon={'chevron_right'}
            rightType={'icon'}
            labelText={'Nama Bank'}
            mandatory
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Nomor Rekening'}
            placeholder={'Masukkan Nomor Rekening'}
            type={'default'}
            value={bankAccountNo.value}
            onChangeText={(text) => bankAccountNo.setValue(text)}
            clearText={() => bankAccountNo.setValue('')}
            mandatory
            helpText={'Pastikan nomor rekening benar'}
            maxLength={30}
            keyboardType={'numeric'}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Nama Lengkap Pemilik Rekening'}
            placeholder={'Masukkan Nama Lengkap'}
            type={'default'}
            value={bankAccountName.value}
            onChangeText={(text) => bankAccountName.setValue(text)}
            clearText={() => bankAccountName.setValue('')}
            maxLength={50}
            mandatory
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Nama Cabang'}
            placeholder={'Masukkan Nama Cabang'}
            type={'default'}
            value={bankBranchName.value}
            onChangeText={(text) => bankBranchName.setValue(text)}
            clearText={() => bankBranchName.setValue('')}
            helpText={'Cabang tempat pembukaan rekening'}
            maxLength={50}
          />
        </View>
      </View>
    );
  };
  /** button */
  const renderButton = () => {
    return (
      <View>
        <View style={{ height: 75 }}>
          <SnbButton.Single
            title={'Verifikasi'}
            type={'primary'}
            onPress={() => confirm()}
            disabled={checkButton()}
          />
        </View>
      </View>
    );
  };
  const renderTNC = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 16,
          backgroundColor: color.white,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        <SnbText.C1 color={color.black40}>
          Dengan verifikasi, anda menyetujui{' '}
        </SnbText.C1>
        <TouchableOpacity
          style={{ paddingVertical: 8 }}
          onPress={() => setOpenModalTNC(!openModalTNC)}>
          <SnbText.C1 color={color.red50}>Syarat dan Ketentuan</SnbText.C1>
        </TouchableOpacity>
      </View>
    );
  };
  //** terms and condition */
  const renderContentTnC = () => {
    return (
      <View style={{ padding: 16 }}>
        <View style={{ marginBottom: 8 }}>
          <SnbText.B3>
            Syarat dan Ketentuan Rekening Bank di Sinbad :
          </SnbText.B3>
        </View>
        {TNC_CONTENT.map((el, index) => {
          return (
            <View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
              <View style={{ marginHorizontal: 8 }}>
                <SnbText.B3>{index + 1}.</SnbText.B3>
              </View>
              <View style={{ flex: 1 }}>
                <SnbText.B3>{el}</SnbText.B3>
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  //** modal TNC */
  const modalTNC = () => {
    return openModalTNC ? (
      <View style={{ backgroundColor: 'red' }}>
        <SnbBottomSheet
          open={openModalTNC}
          content={renderContentTnC()}
          title={'Syarat dan Ketentuan'}
          actionIcon={'close'}
          closeAction={() => setOpenModalTNC(false)}
        />
      </View>
    ) : (
      <View />
    );
  };
  /** this for main view */
  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}
      <KeyboardAvoidingView behavior={'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={MerchantStyles.mainContainer}>
          {renderContent()}
        </ScrollView>
      </KeyboardAvoidingView>
      {renderTNC()}
      {renderButton()}
      {modalTNC()}
    </View>
  );
};
export default MerchantEditPartialView;
