import { useNavigation } from '@react-navigation/core';
import {
  renderIF,
  useInput,
  useMerchant,
  useTextFieldSelect,
} from '@screen/auth/functions';
import { REGISTER_STEP_7_VIEW } from '@screen/auth/functions/screens_name';
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
  const { saveStoreData, merchantData } = useMerchant();
  const address = useInput(merchantData.address);
  const noteAddress = useInput(merchantData.noteAddress);
  const vehicleAccessibilityAmount = useInput(
    merchantData.vehicleAccessibilityAmount?.toString() || '',
  );
  const { gotoSelection, selectedItem } = useTextFieldSelect();
  const { navigate } = useNavigation();
  const [vehicleAccessibility, setVehicleAccessibility] =
    React.useState<any>(null);
  let mapRef = React.useRef<MapView>(null);

  React.useEffect(() => {
    if (selectedItem?.type === 'listVehicleAccess') {
      setVehicleAccessibility(selectedItem.item);
    }
  }, [selectedItem]);

  React.useEffect(() => {
    if (merchantData.longitude !== null) {
      mapRef.current?.animateToRegion({
        latitude: merchantData?.latitude || 0,
        longitude: merchantData?.longitude || 0,
        longitudeDelta: 0.02,
        latitudeDelta: 0.02,
      });
    }
    if (merchantData.address !== '') {
      address.setValue(merchantData.address || '');
    }
  }, [merchantData]);

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
              <View style={{ flexDirection: 'row' }}>
                <SnbText.H4>Koordinat Lokasi</SnbText.H4>
                <View style={{ marginHorizontal: 2 }} />
                <SnbText.H4 color={color.red60}>*</SnbText.H4>
              </View>
              {renderIF(
                merchantData.longitude !== null,
                <TouchableOpacity
                  onPress={() => navigate('MapsView', { action: 'register' })}>
                  <SnbText.B4>Ubah</SnbText.B4>
                </TouchableOpacity>,
              )}
            </View>
            <View style={{ paddingVertical: 4 }} />
            {renderIF(
              merchantData.longitude !== null,
              <MapView
                ref={mapRef}
                initialRegion={{
                  latitude: merchantData?.latitude || 0,
                  longitude: merchantData?.longitude || 0,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
                zoomEnabled={false}
                pitchEnabled={false}
                scrollEnabled={false}
                style={styles.pinPoint}>
                <Marker
                  coordinate={{
                    latitude: merchantData?.latitude || 0,
                    longitude: merchantData?.longitude || 0,
                  }}
                />
              </MapView>,
              <TouchableOpacity
                onPress={() => navigate('MapsView', { action: 'register' })}
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
              mandatory
              value={
                vehicleAccessibility?.name ||
                merchantData.vehicleAccessibilityId
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
              labelText="Kapasitas Jalan"
              placeholder="Masukkan kapasitas jalan"
              keyboardType="phone-pad"
              helpText={'Jumlah kendaraan yang bisa melewati jalan menuju Toko'}
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
              address: address.value,
              noteAddress: noteAddress.value,
              vehicleAccessibilityId:
                vehicleAccessibility?.id || merchantData.vehicleAccessibilityId,
              vehicleAccessibilityAmount: Number(
                vehicleAccessibilityAmount.value,
              ),
            });
            navigate(REGISTER_STEP_7_VIEW);
          }}
          type="primary"
          shadow
          loading={false}
          disabled={
            address.value === '' ||
            noteAddress.value === '' ||
            vehicleAccessibility === null ||
            merchantData.urbanId === null
          }
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
