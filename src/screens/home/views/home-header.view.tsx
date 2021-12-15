/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbTopNav } from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
import { useCartTotalProductActions } from '@screen/oms/functions';
import { useNotificationTotalActions } from '@screen/notification/functions';

/** === IMPORT STYLE HERE === */
import HomeStyles from '../styles/home.style';
/** === INTERFACE === */
interface HeaderProps {
  headerChange: boolean;
}
/** === COMPONENT === */
const HomeHeaderView: FC<HeaderProps> = (props) => {
  const { dataTotalProductCart } = useCartTotalProductActions();
  const { totalNotification } = useNotificationTotalActions();

  /** === VIEW === */
  /** => main */
  return (
    <View style={HomeStyles.topNavContainer}>
      <SnbTopNav.Type8
        value={''}
        goToSearch={() => NavigationAction.navigate('SearchView')}
        type={props.headerChange ? 'red' : 'transparent1'}
        placeholder="Cari di Sinbad"
        onChangeText={(text) => console.log(text)}
        clearText={() => console.log('clear text')}
        enter={() => console.log('enter')}
        icon1Value={totalNotification.data}
        icon1Name="notifications_none"
        icon1Action={() => NavigationAction.navigate('NotificationView')}
        icon2Value={dataTotalProductCart.totalProduct}
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
