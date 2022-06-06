/** === IMPORT PACKAGE HERE === */
import React, {
  FC,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
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
  const [keyword, setKeyword] = useState('');
  const { stateCart, dispatchCart } = useContext(contexts.CartContext);
  const totalCartActions = useGetTotalCartAction();
  const totalCartState: number = useMemo(
    () => stateCart?.total?.data?.totalProducts || 0,
    [stateCart?.total?.data?.totalProducts],
  );
  const { totalNotification } = useNotificationTotalActions();
  const { me } = useDataAuth();

  useFocusEffect(
    React.useCallback(() => {
      if (me.data !== null) {
        totalCartActions.fetch(dispatchCart);
      }
    }, [me.data]),
  );

  const handleClearText = useCallback(() => {
    setKeyword('');
  }, []);

  const handleEnter = useCallback(() => {
    // jika keyword kosong, tidak navigasi
    if (/^\s*$/.test(keyword)) return setKeyword('');

    NavigationAction.navigate('SearchProductView', { keyword });
  }, [keyword]);

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
      placeholder="Cari di sinbad"
      icon1Name="cart"
      icon2Name="notification"
      color="red"
      icon1Action={onClickCart}
      icon1Value={totalCartState}
      icon2Action={onCLickNotification}
      icon2Value={totalNotification.data}
      inputValue={keyword}
      onChangeText={setKeyword}
      onClearText={handleClearText}
      onEnter={handleEnter}
    />
  );
};

export default memo(Header);