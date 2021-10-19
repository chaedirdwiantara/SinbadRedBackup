import { contexts } from '@contexts';
import { useNavigation } from '@react-navigation/core';
import { useInput, useMerchant } from '@screen/auth/functions';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import {
  color,
  SnbButton,
  SnbContainer,
  SnbText,
  SnbTextField,
  SnbTopNav,
} from 'react-native-sinbad-ui';

const MerchantEditAddressView = () => {
  const { stateUser } = React.useContext(contexts.UserContext);
  const { storeAddress }: any = stateUser.detail.data?.storeData || {};
  const { navigate, goBack } = useNavigation();
  const { merchantData } = useMerchant();
  const address = useInput(merchantData.address || storeAddress?.address);
  const noteAddress = useInput(
    merchantData.noteAddress || storeAddress?.noteAddress,
  );
  let mapRef = React.useRef<MapView>(null);

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
    <SnbContainer color={'white'}>
      <SnbTopNav.Type3
        type="red"
        title="Edit Alamat Toko"
        backAction={goBack}
      />
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginTop: 16, marginHorizontal: 16 }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <SnbText.H4>Koordinat Lokasi</SnbText.H4>
              <TouchableOpacity onPress={() => navigate('MapsView')}>
                <SnbText.B4>Ubah</SnbText.B4>
              </TouchableOpacity>
            </View>
            <View style={{ paddingVertical: 4 }} />
            <MapView
              ref={mapRef}
              initialRegion={{
                latitude: storeAddress?.latitude || 0,
                longitude: storeAddress?.longitude || 0,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              zoomEnabled={false}
              pitchEnabled={false}
              scrollEnabled={false}
              style={{
                height: 160,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderRadius: 16,
                backgroundColor: color.black5,
                borderColor: color.black40,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
              <Marker
                coordinate={{
                  latitude:
                    merchantData?.latitude || storeAddress?.latitude || 0,
                  longitude:
                    merchantData?.longitude || storeAddress?.longitude || 0,
                }}
              />
            </MapView>
            <View style={{ marginVertical: 8 }} />
            <View style={{ marginBottom: 16 }}>
              <SnbTextField.Area
                {...address}
                labelText="Alamat"
                mandatory
                placeholder="Masukkan Alamat Toko"
                type={'default'}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <SnbTextField.Area
                {...noteAddress}
                labelText="Catatan Alamat"
                mandatory
                placeholder="Masukkan Catatan Alamat"
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ height: 72 }}>
        <SnbButton.Single
          disabled={true}
          title="Simpan"
          onPress={() => {}}
          type="primary"
        />
      </View>
    </SnbContainer>
  );
};

export default MerchantEditAddressView;
