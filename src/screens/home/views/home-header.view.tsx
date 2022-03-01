/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { SnbTopNav } from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
import { useCartTotalProductActions } from '@screen/oms/functions';
import { useNotificationTotalActions } from '@screen/notification/functions';
import { useDataAuth } from '@core/redux/Data';

/** === INTERFACE === */
interface HeaderProps {
  headerChange: boolean;
}
/** === COMPONENT === */
const HomeHeaderView: FC<HeaderProps> = (props) => {
  const { dataTotalProductCart } = useCartTotalProductActions();
  const { totalNotification } = useNotificationTotalActions();
  const { me } = useDataAuth();
  /** === VIEW === */
  /** => main */

  const handleOnChangeKeyword = () => {};
  const handleClearText = () => {};
  const handleEnter = () => {};
  return (
    <SnbTopNav.Type8
      value={''}
      goToSearch={() => NavigationAction.navigate('SearchView')}
      type={props.headerChange ? 'red' : 'transparent1'}
      placeholder="Cari di Sinbad"
      onChangeText={handleOnChangeKeyword}
      clearText={handleClearText}
      enter={handleEnter}
      icon1Value={totalNotification.data}
      icon1Name="notifications_none"
      icon1Action={() => {
        if (me.data === null) {
          NavigationAction.navigate('LoginPhoneView');
        } else {
          NavigationAction.navigate('NotificationView');
        }
      }}
      icon2Value={dataTotalProductCart.totalProduct}
      icon2Name="cart"
      icon2Action={() => {
        if (me.data === null) {
          NavigationAction.navigate('LoginPhoneView');
        } else {
          NavigationAction.navigate('OmsShoppingCartView');
        }
      }}
    />
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
