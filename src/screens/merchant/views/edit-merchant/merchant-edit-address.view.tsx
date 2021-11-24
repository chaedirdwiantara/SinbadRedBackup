import { contexts } from '@contexts';
import { useNavigation } from '@react-navigation/core';
import { useInput, useMerchant } from '@screen/auth/functions';
import { MerchantHookFunc } from '@screen/merchant/function';
import { UserHookFunc } from '@screen/user/functions';
import React from 'react';
import { ToastAndroid, TouchableOpacity, View } from 'react-native';
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
  const { merchantData, resetMerchantData } = useMerchant();
  const address = useInput(merchantData.address || storeAddress?.address);
  const noteAddress = useInput(
    merchantData.noteAddress || storeAddress?.noteAddress,
  );
  let mapRef = React.useRef<MapView>(null);
  const { editMerchant, reset } = MerchantHookFunc.useEditMerchant();
  const { detail } = UserHookFunc.useStoreDetailAction();
  const { stateMerchant, dispatchSupplier } = React.useContext(
    contexts.MerchantContext,
  );
  const { dispatchUser } = React.useContext(contexts.UserContext);

  React.useEffect(() => {
    if (stateMerchant.merchantEdit.data) {
      ToastAndroid.showWithGravityAndOffset(
        'Berhasil Ubah Alamat Toko',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        240,
      );
      goBack();
      reset(dispatchSupplier);
      resetMerchantData();
      detail(dispatchUser);
    }
  }, [stateMerchant]);

  React.useEffect(() => {
    if (merchantData?.longitude !== null && merchantData?.latitude !== null) {
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

  const handleDisableButton = () => {
    if (address.value !== '' && noteAddress.value !== '') {
      if (
        noteAddress.value === storeAddress?.noteAddress &&
        address.value === storeAddress?.address
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const handleUpdate = () => {
    const data: any = {};
    if (merchantData.latitude !== null && merchantData.longitude !== null) {
      data.latitude = merchantData.latitude;
      data.longitude = merchantData.longitude;
    }
    if (merchantData.urbanId !== null) {
      data.urbanId = merchantData.urbanId;
    }
    if (address.value !== storeAddress?.address) {
      data.address = address.value;
    }
    if (noteAddress.value !== storeAddress?.noteAddress) {
      data.noteAddress = noteAddress.value;
    }
    editMerchant(dispatchSupplier, { data });
  };

  return (
    <SnbContainer color={'white'}>
      <SnbTopNav.Type3 type="red" title="Alamat Toko" backAction={goBack} />
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
              <TouchableOpacity
                onPress={() => navigate('MapsView', { action: 'edit' })}>
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
                placeholder="Masukkan Alamat Toko"
                mandatory
                maxLength={200}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <SnbTextField.Area
                {...noteAddress}
                labelText="Catatan Alamat"
                placeholder="Masukkan Catatan Alamat"
                maxLength={200}
                mandatory
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ height: 72 }}>
        <SnbButton.Single
          disabled={handleDisableButton()}
          title="Simpan"
          onPress={handleUpdate}
          type="primary"
        />
      </View>
    </SnbContainer>
  );
};

export default MerchantEditAddressView;
