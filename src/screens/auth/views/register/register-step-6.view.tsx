import { useNavigation } from '@react-navigation/core';
import {
  useInput,
  useRegister,
  useTextFieldSelect,
} from '@screen/auth/functions';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
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
  const { saveRegisterStoreData } = useRegister();
  const address = useInput();
  const noteAddress = useInput();
  const vehicleAccessibilityAmount = useInput();
  const { gotoSelection, selectedItem } = useTextFieldSelect();

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
            <TouchableOpacity onPress={() => {}} style={styles.pinPoint}>
              <SnbText.B4 color={color.black60}>Pin Lokasi Toko</SnbText.B4>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextField.Text
              {...address}
              mandatory
              labelText="Detail Alamat"
              placeholder="Masukkan detail alamat"
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextField.Text
              {...noteAddress}
              mandatory
              labelText="Catatan Alamat"
              placeholder="Masukkan catatan alamat"
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextFieldSelect
              labelText="Aksesibilitas Kendaraan"
              value={
                selectedItem?.type === 'listVehicleAccess'
                  ? selectedItem?.item.name
                  : ''
              }
              placeholder="Pilih aksesibitas kendaraan"
              type="default"
              onPress={() => gotoSelection('listVehicleAccess')}
              rightType="icon"
              rightIcon="chevron_right"
            />
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextField.Text
              {...vehicleAccessibilityAmount}
              mandatory
              labelText="Kapasitas Jalan"
              placeholder="Masukkan kapasitas jalan"
              keyboardType="phone-pad"
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
              address: address.value,
              noteAddress: noteAddress.value,
              vehicleAccessibilityId: selectedItem.data?.id,
              latitude: 0,
              longitude: 0,
              vehicleAccessibilityAmount: Number(
                vehicleAccessibilityAmount.value,
              ),
            });
          }}
          type="primary"
          shadow
          loading={false}
          disabled={address.value === '' || noteAddress.value === ''}
        />
      </View>
    </View>
  );
};

const RegisterStep6View: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} type="white" title="" />
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
