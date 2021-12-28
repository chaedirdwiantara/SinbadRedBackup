import { useNavigation } from '@react-navigation/core';
import {
  useInput,
  useMerchant,
  useTextFieldSelect,
} from '@screen/auth/functions';
import { REGISTER_STEP_6_VIEW } from '@screen/auth/functions/screens_name';
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  SnbButton,
  SnbContainer,
  SnbText,
  SnbTextField,
  SnbTextFieldSelect,
  SnbTopNav,
} from 'react-native-sinbad-ui';
import RegisterProgress from '../shared/register-progress.component';

const Content: React.FC = () => {
  const { saveStoreData, merchantData } = useMerchant();
  const storeName = useInput(merchantData.name);
  const storeSize = useInput(merchantData.largeArea);
  const topBrand = useInput(merchantData.topSellingBrand);
  const wantedBrand = useInput(merchantData.mostWantedBrand);
  const { navigate } = useNavigation();
  const { gotoSelection, selectedItem } = useTextFieldSelect();
  const [numOfEmployee, setNumOfEmployee] = React.useState<any>(null);

  React.useEffect(() => {
    if (selectedItem?.type === 'listNumOfEmployee') {
      setNumOfEmployee(selectedItem.item);
    }
  }, [selectedItem]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 16 }}>
            <SnbText.H1>DAFTAR</SnbText.H1>
          </View>
          <RegisterProgress step={5} title="Data Toko" />
          <View style={{ padding: 16 }}>
            <SnbTextField.Text
              {...storeName}
              mandatory
              labelText="Nama Toko"
              placeholder="Masukkan nama toko"
              maxLength={50}
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextFieldSelect
              labelText="Jumlah Karyawan"
              placeholder="Masukkan jumlah karyawan"
              value={numOfEmployee?.amount || merchantData.numberOfEmployee}
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
              rightText="m²"
              maxLength={4}
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
            saveStoreData({
              name: storeName.value,
              topSellingBrand: topBrand.value,
              mostWantedBrand: wantedBrand.value,
              largeArea: storeSize.value,
              numberOfEmployee:
                numOfEmployee?.amount || merchantData.numberOfEmployee,
            });
            navigate(REGISTER_STEP_6_VIEW);
          }}
          type="primary"
          loading={false}
          disabled={true || storeName.value === ''}
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
