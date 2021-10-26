import React, { FC, useEffect } from 'react';
import {
  SnbText,
  SnbTopNav,
  SnbButton,
  SnbTextField,
  SnbTextFieldSelect,
  color,
} from 'react-native-sinbad-ui';
import { ScrollView, View, TouchableOpacity } from 'react-native';
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
      });
    }
  }, [stateMerchant]);
  /** function */
  const checkButton = () => {
    if (bankId.value && bankAccountNo.value && bankAccountName.value) {
      return false;
    } else {
      return true;
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
            placeholder={'Masukan Nomor Rekening'}
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
            placeholder={'Masukan Nama Lengkap Pemilik Rekening'}
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
            placeholder={'Masukan Nama Cabang'}
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
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 16,
            backgroundColor: color.white,
          }}>
          <SnbText.B3 color={color.black40}>
            Dengan verifikasi, anda menyetujui{' '}
          </SnbText.B3>
          <TouchableOpacity
            style={{ paddingVertical: 8 }}
            onPress={() => console.log('press')}>
            <SnbText.B3 color={color.red50}>Syarat dan Ketentuan</SnbText.B3>
          </TouchableOpacity>
        </View>
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
  /** this for main view */
  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}
      <ScrollView contentContainerStyle={MerchantStyles.mainContainer}>
        {renderContent()}
      </ScrollView>
      {renderButton()}
    </View>
  );
};
export default MerchantEditPartialView;
