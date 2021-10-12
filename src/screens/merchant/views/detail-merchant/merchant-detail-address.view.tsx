import React, { FC } from 'react';
import {
  color,
  SnbContainer,
  SnbTextField,
  SnbTopNav,
} from 'react-native-sinbad-ui';
import { ScrollView, View } from 'react-native';
import { NavigationAction } from '@navigation';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import MapView, { Marker } from 'react-native-maps';

const MerchantDetailAddressView: FC = () => {
  /** === HOOK === */
  const { stateUser } = React.useContext(contexts.UserContext);
  let mapRef = React.useRef<MapView>(null);

  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type4
        type="red"
        title="Alamat Toko"
        backAction={() => NavigationAction.back()}
        buttonTitle="Ubah"
        buttonAction={() =>
          NavigationAction.navigate('MerchantEditView', {
            title: 'Alamat Toko',
            type: 'merchantAddress',
          })
        }
      />
    );
  };
  /** map */
  const renderMap = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude:
              stateUser.detail.data?.storeData.storeAddress.latitude || 0,
            longitude:
              stateUser.detail.data?.storeData.storeAddress.longitude || 0,
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
                stateUser.detail.data?.storeData.storeAddress.latitude || 0,
              longitude:
                stateUser.detail.data?.storeData.storeAddress.longitude || 0,
            }}
          />
        </MapView>
      </View>
    );
  };
  /** input */
  const renderInput = () => {
    const dataAddress = stateUser.detail.data?.storeData.storeAddress;
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Provinsi'}
            placeholder={'-'}
            type={'default'}
            value={dataAddress?.province ? dataAddress?.province : '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Kota'}
            placeholder={'-'}
            type={'default'}
            value={dataAddress?.city ? dataAddress?.city : '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Kecamatan'}
            placeholder={'-'}
            type={'default'}
            value={dataAddress?.district ? dataAddress?.district : '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Kelurahan'}
            placeholder={'-'}
            type={'default'}
            value={dataAddress?.urban ? dataAddress?.urban : '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Kodepos'}
            placeholder={'-'}
            type={'default'}
            value={dataAddress?.zipCode ? dataAddress?.zipCode : '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Area
            labelText={'Alamat'}
            placeholder={'-'}
            type={'default'}
            value={dataAddress?.address ? dataAddress?.address : '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Area
            labelText={'Catatan Alamat'}
            placeholder={'-'}
            type={'default'}
            value={dataAddress?.noteAddress ? dataAddress?.noteAddress : '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
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
