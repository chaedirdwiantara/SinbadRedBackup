import { useNavigation } from '@react-navigation/core';
import {
  useInput,
  useRegister,
  useTextFieldSelect,
} from '@screen/auth/functions';
import { REGISTER_STEP_6_VIEW } from '@screen/auth/screens_name';
import React from 'react';
import { ScrollView, View } from 'react-native';
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
  const storeName = useInput('Test Toko');
  const storeSize = useInput('24');
  const topBrand = useInput('Rinso');
  const wantedBrand = useInput('Rinso Matic');
  const { saveRegisterStoreData } = useRegister();
  const { navigate } = useNavigation();
  const { gotoSelection, selectedItem } = useTextFieldSelect();

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
              {...storeName}
              mandatory
              labelText="Nama Toko"
              placeholder="Masukkan nama toko"
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextFieldSelect
              labelText="Jumlah Karyawan"
              placeholder="Masukkan jumlah karyawan"
              value={
                selectedItem?.type === 'listNumOfEmployee'
                  ? selectedItem?.item.amount
                  : ''
              }
              type="default"
              onPress={() => {
                gotoSelection({ type: 'listNumOfEmployee' });
              }}
              rightType="icon"
              rightIcon="chevron_right"
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextField.Text
              {...storeSize}
              labelText="Ukuran Toko"
              placeholder="Masukkan ukuran toko Anda"
              keyboardType="number-pad"
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextField.Text
              {...topBrand}
              labelText="Merk Paling Laku"
              placeholder="Masukkan merk paling laku"
            />
          </View>
          <View style={{ padding: 16, marginBottom: 24 }}>
            <SnbTextField.Text
              {...wantedBrand}
              labelText="Merk Paling Diinginkan"
              placeholder="Masukkan merk paling diingikan"
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
          onPress={() => {
            saveRegisterStoreData({
              name: storeName.value,
              topSellingBrand: topBrand.value,
              mostWantedBrand: wantedBrand.value,
              largeArea: storeSize.value,
              numberOfEmployee: selectedItem?.item.amount || '',
            });
            navigate(REGISTER_STEP_6_VIEW);
          }}
          type="primary"
          shadow
          loading={false}
          disabled={storeName.value === ''}
        />
      </View>
    </View>
  );
};

const RegisterStep5View: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

export default RegisterStep5View;
