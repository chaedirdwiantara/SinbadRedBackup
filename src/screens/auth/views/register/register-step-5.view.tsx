import { useRegisterStep5 } from '@screen/auth/functions';
import React from 'react';
import { LogBox, ScrollView, View } from 'react-native';
import {
  color,
  SnbButton,
  SnbContainer,
  SnbText,
  SnbTextField,
  SnbTextFieldSelect,
  SnbTopNav,
} from 'react-native-sinbad-ui';

const Content: React.FC = () => {
  const { func, state } = useRegisterStep5();

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 16 }}>
            <SnbText.H1>DAFTAR</SnbText.H1>
          </View>
          <View style={{ margin: 16 }}>
            <SnbText.B4>5/7 Data Toko</SnbText.B4>
            <View style={{ marginVertical: 4 }} />
            <View
              style={{
                height: 8,
                backgroundColor: color.red60,
                borderRadius: 8,
              }}
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextField.Text
              mandatory
              type={state.type}
              labelText="Nama Toko"
              maxLength={32}
              onChangeText={func.handleOnChangeTextStoreName}
              placeholder="Masukkan nama toko"
              value={state.storeName}
              clearText={() => func.setStoreName('')}
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextFieldSelect
              labelText="Jumlah Karyawan"
              placeholder="Masukkan jumlah karyawan"
              value={state.numOfEmployees}
              type="default"
              onPress={func.selectNumOfEmployees}
              rightType="icon"
              rightIcon="chevron_right"
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextField.Text
              type={state.type}
              labelText="Ukuran Toko"
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={func.handleOnChangeTextStoreSize}
              valMsgError={''}
              placeholder="Masukkan ukuran toko Anda"
              value={state.storeSize}
              clearText={() => func.setStoreSize('')}
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextField.Text
              type={state.type}
              labelText="Merk Paling Laku"
              maxLength={15}
              keyboardType="number-pad"
              onChangeText={func.handleOnChangeTextTopBrand}
              valMsgError={''}
              placeholder="Masukkan merk paling laku"
              value={state.topBrand}
              clearText={() => func.setTopBrand('')}
            />
          </View>
          <View style={{ padding: 16, marginBottom: 24 }}>
            <SnbTextField.Text
              type={state.type}
              labelText="Merk Paling Diinginkan"
              maxLength={16}
              keyboardType="email-address"
              onChangeText={func.handleOnChangeTextWantedBrand}
              valMsgError={''}
              placeholder="Masukkan merk paling diingikan"
              value={state.wantedBrand}
              clearText={() => func.setWantedBrand('')}
            />
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          height: 72,
          backgroundColor: 'red',
        }}>
        <SnbButton.Single
          title="Selanjutnya"
          onPress={func.gotoStep6}
          type="primary"
          shadow
          loading={false}
          disabled={false}
        />
      </View>
    </View>
  );
};

const RegisterStep5View: React.FC = (props) => {
  const {} = props;
  const { goBack } = useRegisterStep5();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={() => goBack()} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

export default RegisterStep5View;
