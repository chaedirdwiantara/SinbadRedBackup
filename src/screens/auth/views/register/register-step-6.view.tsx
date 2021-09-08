import { useRegisterStep6 } from '@screen/auth/functions';
import React from 'react';
import {
  LogBox,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const { func, state } = useRegisterStep6();

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
            <SnbText.B4>6/7 Data Toko</SnbText.B4>
            <View style={{ marginVertical: 4 }} />
            <View
              style={{
                height: 8,
                backgroundColor: color.red60,
                borderRadius: 8,
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <SnbText.H4>Koordinat Lokasi</SnbText.H4>
            <View style={{ paddingVertical: 4 }} />
            <TouchableOpacity onPress={func.goToMaps} style={styles.pinPoint}>
              <SnbText.B4 color={color.black60}>Pin Lokasi Toko</SnbText.B4>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextField.Text
              mandatory
              type={state.type}
              labelText="Detail Alamat"
              maxLength={32}
              onChangeText={func.handleOnChangeTextStoreAddress}
              placeholder="Masukkan detail alamat"
              value={state.storeAddress}
              clearText={() => func.setStoreAddress('')}
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextField.Text
              mandatory
              type={state.type}
              labelText="Catatan Alamat"
              maxLength={32}
              onChangeText={func.handleOnChangeTextStoreNoteAddress}
              placeholder="Masukkan catatan alamat"
              value={state.storeNoteAddress}
              clearText={() => func.setStoreNoteAddress('')}
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextFieldSelect
              labelText="Aksesibilitas Kendaraan"
              value={state.storeVehicleAccessibility}
              placeholder="Pilih aksesibitas kendaraan"
              type="default"
              onPress={func.selectStoreVehicleAccessibility}
              rightType="icon"
              rightIcon="chevron_right"
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextFieldSelect
              labelText="Kapasitas Jalan"
              value={state.storeRoadCapacity}
              placeholder="Pilih kapasitas jalan"
              type="default"
              onPress={func.selectStoreRoadCapacity}
              rightType="icon"
              rightIcon="chevron_right"
              helpText="Jumlah kendaraan yang bisa melewati jalan menuju Toko"
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
          onPress={func.gotoStep7}
          type="primary"
          shadow
          loading={false}
          disabled={false}
        />
      </View>
    </View>
  );
};

const RegisterStep6View: React.FC = (props) => {
  const {} = props;
  const { goBack } = useRegisterStep6();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={() => goBack()} type="white" title="" />
      <Content />
    </SnbContainer>
  );
};

const styles = StyleSheet.create({
  pinPoint: {
    height: 160,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 16,
    backgroundColor: color.black5,
    borderColor: color.black40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterStep6View;
