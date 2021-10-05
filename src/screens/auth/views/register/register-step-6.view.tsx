import { useNavigation } from '@react-navigation/core';
import {
  renderIF,
  useInput,
  useRegister,
  useTextFieldSelect,
} from '@screen/auth/functions';
import { REGISTER_STEP_7_VIEW } from '@screen/auth/screens_name';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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
  const { saveRegisterStoreData, registerData } = useRegister();
  const address = useInput();
  const noteAddress = useInput('Catatan Alamat');
  const vehicleAccessibilityAmount = useInput();
  const { gotoSelection, selectedItem } = useTextFieldSelect();
  const { navigate } = useNavigation();
  let mapRef = React.useRef<MapView>(null);

  React.useEffect(() => {
    if (registerData.longitude !== null) {
      mapRef.current?.animateToRegion({
        latitude: registerData?.latitude || 0,
        longitude: registerData?.longitude || 0,
        longitudeDelta: 0.02,
        latitudeDelta: 0.02,
      });
    }
    if (registerData.address !== '') {
      address.setValue(registerData.address || '');
    }
  }, [registerData]);

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
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <SnbText.H4>Koordinat Lokasi</SnbText.H4>
              {renderIF(
                registerData.longitude !== null,
                <TouchableOpacity onPress={() => navigate('MapsView')}>
                  <SnbText.B4>Ubah</SnbText.B4>
                </TouchableOpacity>,
              )}
            </View>
            <View style={{ paddingVertical: 4 }} />
            {renderIF(
              registerData.longitude !== null,
              <MapView
                ref={mapRef}
                initialRegion={{
                  latitude: registerData?.latitude || 0,
                  longitude: registerData?.longitude || 0,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
                zoomEnabled={false}
                pitchEnabled={false}
                scrollEnabled={false}
                style={styles.pinPoint}>
                <Marker
                  coordinate={{
                    latitude: registerData?.latitude || 0,
                    longitude: registerData?.longitude || 0,
                  }}
                />
              </MapView>,
              <TouchableOpacity
                onPress={() => navigate('MapsView')}
                style={styles.pinPoint}>
                <SnbText.B4 color={color.black60}>Pin Lokasi Toko</SnbText.B4>
              </TouchableOpacity>,
            )}
          </View>
          <View style={{ padding: 16 }}>
            <SnbTextField.Text
              {...address}
              mandatory
              maxLength={250}
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
              onPress={() => gotoSelection({ type: 'listVehicleAccess' })}
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
              vehicleAccessibilityId: selectedItem.item?.id,
              vehicleAccessibilityAmount: Number(
                vehicleAccessibilityAmount.value,
              ),
            });
            navigate(REGISTER_STEP_7_VIEW);
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
    overflow: 'hidden',
  },
});

export default RegisterStep6View;
