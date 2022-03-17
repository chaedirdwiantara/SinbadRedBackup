import React, { FC, useEffect } from 'react';
import {
  color,
  SnbContainer,
  SnbTextField,
  SnbTopNav,
  SnbText,
  SnbToast,
} from 'react-native-sinbad-ui';
import { ScrollView, View, BackHandler } from 'react-native';
import { NavigationAction } from '@navigation';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import MapView, { Marker } from 'react-native-maps';
import { useMerchant } from '@screen/auth/functions';

const MerchantDetailAddressView: FC = () => {
  /** === HOOK === */
  const { stateUser } = React.useContext(contexts.UserContext);
  const { storeAddress }: any = stateUser.detail.data?.storeData || {};
  let mapRef = React.useRef<MapView>(null);
  const { resetMerchantData } = useMerchant();
  const { stateMerchant } = React.useContext(contexts.MerchantContext);

  React.useEffect(() => {
    if (storeAddress?.longitude !== null && storeAddress?.latitude !== null) {
      mapRef.current?.animateToRegion({
        latitude: storeAddress?.latitude || 0,
        longitude: storeAddress?.longitude || 0,
        longitudeDelta: 0.02,
        latitudeDelta: 0.02,
      });
    }
  }, [storeAddress]);
  //hardware back handler
  useEffect(() => {
    const backAction = () => {
      NavigationAction.back();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (stateMerchant.merchantEdit.data !== null) {
      SnbToast.show('Data Berhasil Diperbaharui', 2500, { positionValue: 56 });
    }
  }, [stateMerchant]);

  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type4
        type="red"
        title="Alamat Toko"
        backAction={() => NavigationAction.back()}
        buttonTitle="Ubah"
        buttonAction={() => {
          resetMerchantData();
          NavigationAction.navigate('MerchantEditAddressView');
        }}
      />
    );
  };
  /** map */
  const renderMap = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <View style={{ marginBottom: 8 }}>
          <SnbText.H4>Koordinat Lokasi</SnbText.H4>
        </View>
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
              latitude: storeAddress?.latitude || 0,
              longitude: storeAddress?.longitude || 0,
            }}
          />
        </MapView>
      </View>
    );
  };
  /** input */
  const renderInput = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Provinsi'}
            placeholder={'-'}
            type={'read'}
            value={storeAddress?.province || '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Kota'}
            placeholder={'-'}
            value={storeAddress?.city || '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
            type={'read'}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Kecamatan'}
            placeholder={'-'}
            value={storeAddress?.district || '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
            type={'read'}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Kelurahan'}
            placeholder={'-'}
            value={storeAddress?.urban || '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
            type={'read'}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Kodepos'}
            placeholder={'-'}
            value={storeAddress?.zipCode || '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
            type={'read'}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Area
            labelText={'Alamat'}
            placeholder={'-'}
            value={storeAddress?.address ? storeAddress?.address : '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
            type={'read'}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Area
            labelText={'Catatan Alamat'}
            placeholder={'-'}
            value={storeAddress?.noteAddress || '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
            type={'read'}
          />
        </View>
      </View>
    );
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        {renderMap()}
        {renderInput()}
      </ScrollView>
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'white'}>
      {header()}
      {content()}
    </SnbContainer>
  );
};
export default MerchantDetailAddressView;
