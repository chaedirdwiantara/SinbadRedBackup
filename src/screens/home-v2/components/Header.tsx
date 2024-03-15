/** === IMPORT PACKAGE HERE === */
import React, { FC, memo, useCallback, useContext, useMemo } from 'react';
import { SnbTopNav2 } from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
import { useNotificationTotalActions } from '@screen/notification/functions';
import { useDataAuth } from '@core/redux/Data';
import { contexts } from '@contexts';
import { useGetTotalCartAction } from '@screen/oms/functions';
import { useFocusEffect } from '@react-navigation/native';

/** === INTERFACE === */
interface HeaderProps {}

/** === COMPONENT === */
const Header: FC<HeaderProps> = () => {
  const { stateCart, dispatchCart } = useContext(contexts.CartContext);
  const totalCartActions = useGetTotalCartAction();
  const { totalNotification, fetch: fetchTotalNotification } =
    useNotificationTotalActions();
  const { me } = useDataAuth();
  // state
  const totalCartState: number = useMemo(
    () => stateCart?.total?.data?.totalProducts || 0,
    [stateCart?.total?.data?.totalProducts],
  );

  const totalCountNotification: number = useMemo(
    () => totalNotification?.data?.total ?? 0,
    [totalNotification?.data?.total],
  );

  useFocusEffect(
    React.useCallback(() => {
      if (me.data !== null) {
        totalCartActions.fetch(dispatchCart);
        fetchTotalNotification();
      }
    }, [me.data]),
  );

  const onClickCart = useCallback(() => {
    if (me.data === null) {
      NavigationAction.navigate('LoginPhoneView');
    } else {
      NavigationAction.navigate('OmsShoppingCartView');
    }
  }, [me.data]);

  const onCLickNotification = useCallback(() => {
    if (me.data === null) {
      NavigationAction.navigate('LoginPhoneView');
    } else {
      NavigationAction.navigate('NotificationView');
    }
  }, [me.data]);
  /** === VIEW === */
  /** => main */

  return (
    <SnbTopNav2.Type10
      testID="home"
      placeholder="Cari di sinbad"
      icon1Name="cart"
      icon2Name="notification"
      color="red"
      icon1Action={onClickCart}
      icon1Value={totalCartState}
      icon2Action={onCLickNotification}
      icon2Value={totalCountNotification}
      onSearch={() => NavigationAction.navigate('SearchView')}
    />
  );
};

export default memo(Header);
