import { useRegisterStep1 } from '@screen/auth/functions';
import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  color,
  SnbButton,
  SnbContainer,
  SnbText,
  SnbTextField,
  SnbTopNav,
} from 'react-native-sinbad-ui';

const Content: React.FC = () => {
  const { func, state }: any = useRegisterStep1();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 16 }}>
            <SnbText.H1>DAFTAR</SnbText.H1>
          </View>
          <View style={{ margin: 16 }}>
            <SnbText.B4>1/7 Profil Pemilik</SnbText.B4>
            <View style={{ marginVertical: 4 }} />
            <View
              style={{
                height: 8,
                backgroundColor: color.red60,
                borderRadius: 8,
              }}
            />
          </View>
          <View style={{ height: 92, padding: 16 }}>
            <SnbTextField.Text
              mandatory
              type={state.type}
              labelText="Nama Pemilik Toko"
              maxLength={32}
              onChangeText={func.handleOnChangeTextName}
              placeholder="Masukkan nama pemilik toko"
              value={state.name}
              clearText={() => func.setName('')}
            />
          </View>
          <View style={{ height: 92, padding: 16 }}>
            <SnbTextField.Text
              mandatory
              type={state.type}
              labelText="Nomor KTP"
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={func.handleOnChangeTextIdNumber}
              valMsgError={''}
              placeholder="Masukkan nomor KTP anda"
              value={state.idNumber}
              clearText={() => func.setIdNumber('')}
            />
          </View>
          <View style={{ height: 92, padding: 16 }}>
            <SnbTextField.Text
              type={state.type}
              labelText="Nomor NPWP Pemilik"
              maxLength={15}
              keyboardType="number-pad"
              onChangeText={func.handleOnChangeTextTaxNumber}
              valMsgError={''}
              placeholder="Masukkan nomor NPWP anda"
              value={state.taxNumber}
              clearText={() => func.setTaxNumber('')}
            />
          </View>
          <View style={{ height: 92, padding: 16, marginBottom: 24 }}>
            <SnbTextField.Text
              type={state.type}
              labelText="Alamat Email Pemilik"
              maxLength={16}
              keyboardType="email-address"
              onChangeText={func.handleOnChangeTextEmail}
              valMsgError={''}
              placeholder="Masukkan alamat email anda"
              value={state.email}
              clearText={() => func.setEmail('')}
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
          onPress={func.goToStep2}
          type="primary"
          shadow
          loading={state.loading}
          disabled={false}
        />
      </View>
    </View>
  );
};

const RegisterStep1View: React.FC = () => {
  const { goBack } = useRegisterStep1();

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={() => goBack()} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

export default RegisterStep1View;
