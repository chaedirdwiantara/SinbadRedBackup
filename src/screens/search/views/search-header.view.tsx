/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbTopNav } from 'react-native-sinbad-ui';
import { goBack } from '../functions';
/** === IMPORT STYLE HERE === */
/** === INTERFACE === */
/** === COMPONENT === */
const SearchHeaderView: FC = () => {
  /** === VIEW === */
  /** => main */
  return (
    <View>
      <SnbTopNav.Type7
        type="red"
        placeholder="Cari disini"
        backAction={() => goBack()}
        onChangeText={(text) => console.log(text)}
        clearText={() => console.log('clear text')}
        enter={() => console.log('enter')}
      />
    </View>
  );
};

export default SearchHeaderView;
