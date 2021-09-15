import React, { FC } from 'react';
import {
  SnbContainer,
  SnbText,
  SnbTextField,
  SnbTopNav,
} from 'react-native-sinbad-ui';
import { ScrollView, View } from 'react-native';
import { NavigationAction } from '@navigation';

const MerchantDetailAddressView: FC = () => {
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title="Alamat Toko"
        backAction={() => NavigationAction.back()}
      />
    );
  };
  /** map */
  const renderMap = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <SnbText.B1>map</SnbText.B1>
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
            type={'default'}
            value={''}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Kota'}
            placeholder={'-'}
            type={'default'}
            value={''}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Kecamatan'}
            placeholder={'-'}
            type={'default'}
            value={''}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Kelurahan'}
            placeholder={'-'}
            type={'default'}
            value={''}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Kodepos'}
            placeholder={'-'}
            type={'default'}
            value={''}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Area
            labelText={'Alamat'}
            placeholder={'-'}
            type={'default'}
            value={''}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Area
            labelText={'Catatan Alamat'}
            placeholder={'-'}
            type={'default'}
            value={''}
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
