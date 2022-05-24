import React, { FC, useEffect, useState } from 'react';
import {
  SnbText2,
  SnbTopNav2,
  SnbButton2,
  SnbTextField2,
  SnbBottomSheet,
  SnbContainer,
  colorV2,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import {
  ScrollView,
  View,
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
import { TextFieldSelect } from '@screen/account/views';

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
      <SnbTopNav2.Type3
        color="white"
        title={props.route.params.title}
        backAction={() => NavigationAction.back()}
      />
    );
  };

  /** content */
  const renderContent = () => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: layout.spacing.lg,
          marginHorizontal: layout.spacing.lg,
        }}>
        <View style={{ marginBottom: layout.spacing.lg }}>
          <TextFieldSelect
            placeholder={'Pilih Nama Bank'}
            type={'default'}
            value={bankName.value}
            onPress={() => gotoSelection({ type: 'listBank', action: 'edit' })}
            rightIcon={'chevron_right'}
            rightType={'icon'}
            labelText={'Nama Bank'}
            mandatory
          />
        </View>
        <View style={{ marginBottom: layout.spacing.lg }}>
          <SnbTextField2.Text
            labelText={'Nomor Rekening'}
            placeholder={'Masukkan Nomor Rekening'}
            type={'default'}
            value={bankAccountNo.value}
            onChangeText={(text) => {
              const cleanNumber = text.replace(/[^0-9]/g, '');
              bankAccountNo.setValue(cleanNumber);
            }}
            onClearText={() => bankAccountNo.setValue('')}
            mandatory
            helperText={'Pastikan nomor rekening benar'}
            maxLength={30}
            keyboardType={'numeric'}
          />
        </View>
        <View style={{ marginBottom: layout.spacing.lg }}>
          <SnbTextField2.Text
            labelText={'Nama Lengkap Pemilik Rekening'}
            placeholder={'Masukkan Nama Lengkap'}
            type={'default'}
            value={bankAccountName.value}
            onChangeText={(text) => bankAccountName.setValue(text)}
            onClearText={() => bankAccountName.setValue('')}
            maxLength={50}
            mandatory
          />
        </View>
        <View style={{ marginBottom: layout.spacing.lg }}>
          <SnbTextField2.Text
            labelText={'Nama Cabang'}
            placeholder={'Masukkan Nama Cabang'}
            type={'default'}
            value={bankBranchName.value}
            onChangeText={(text) => bankBranchName.setValue(text)}
            onClearText={() => bankBranchName.setValue('')}
            helperText={'Cabang tempat pembukaan rekening'}
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
        <View style={{ padding: layout.spacing.lg }}>
          <SnbButton2.Primary
            title={'Verifikasi'}
            onPress={() => confirm()}
            disabled={checkButton() || stateMerchant.changeBankAccount.loading}
            loading={stateMerchant.changeBankAccount.loading}
            full
            size="medium"
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
          justifyContent: 'center',
        }}>
        <SnbText2.Paragraph.Small color={colorV2.textColor.disable}>
          Dengan verifikasi, anda menyetujui
        </SnbText2.Paragraph.Small>
        <View style={{ marginLeft: -layout.spacing.sm }}>
          <SnbButton2.Link
            onPress={() => setOpenModalTNC(!openModalTNC)}
            title="Syarat dan Ketentuan"
            size="small"
          />
        </View>
      </View>
    );
  };
  //** terms and condition */
  const renderContentTnC = () => {
    return (
      <View style={{ padding: layout.spacing.lg, paddingTop: 0 }}>
        <View style={{ marginBottom: layout.spacing.sm }}>
          <SnbText2.Body.Default>
            Syarat dan Ketentuan Rekening Bank di Sinbad :
          </SnbText2.Body.Default>
        </View>
        {TNC_CONTENT.map((el, index) => {
          return (
            <View
              key={index}
              style={{ flexDirection: 'row', marginBottom: layout.spacing.sm }}>
              <View style={{ marginHorizontal: layout.spacing.sm }}>
                <SnbText2.Paragraph.Small>
                  {index + 1}.
                </SnbText2.Paragraph.Small>
              </View>
              <View style={{ flex: 1 }}>
                <SnbText2.Paragraph.Small align="justify">
                  {el}
                </SnbText2.Paragraph.Small>
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
      <View>
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
    <SnbContainer color="white">
      {renderHeader()}
      <KeyboardAvoidingView behavior={'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={MerchantStyles.mainContainer}>
          {renderContent()}
        </ScrollView>
      </KeyboardAvoidingView>
      {renderTNC()}
      {renderButton()}
      {modalTNC()}
    </SnbContainer>
  );
};
export default MerchantEditPartialView;
