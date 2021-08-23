/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbTopNav } from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
/** === IMPORT STYLE HERE === */
import HomeStyles from '../styles/home.style';
/** === INTERFACE === */
interface HeaderProps {
  headerChange: boolean;
}
/** === COMPONENT === */
const HomeHeaderView: FC<HeaderProps> = (props) => {
  /** === VIEW === */
  /** => main */
  return (
    <View style={HomeStyles.topNavContainer}>
      <SnbTopNav.Type8
        goToSearch={() => console.log('search')}
        type={props.headerChange ? 'red' : 'transparent1'}
        placeholder="Cari di Sinbad"
        onChangeText={(text) => console.log(text)}
        clearText={() => console.log('clear text')}
        enter={() => console.log('enter')}
        icon1Value={100}
        icon1Name="notifications"
        icon1Action={() => console.log('this example for icon 1 action')}
        icon2Value={100}
        icon2Name="cart"
        icon2Action={() => NavigationAction.navigate('OmsShoppingCartView')}
      />
    </View>
  );
};

export default HomeHeaderView;

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
