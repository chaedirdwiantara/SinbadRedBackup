/** === IMPORT PACKAGES === */
import React, { FC, useCallback, useContext, memo, useMemo } from 'react';
import { SnbTopNav2 } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS === */
import {
  goBack,
  goToSearch,
  goToShoppingCart,
  backToLogin,
} from '@core/functions/product';
import { useDataAuth } from '@core/redux/Data';
import { contexts } from '@contexts';
import { useProductListContext } from '@core/components/product/product-list';
/** === IMPORT TYPE === */
/** === TYPE === */
interface NavigationHeaderProps {}
/** === COMPONENT === */
const header: FC<NavigationHeaderProps> = (props) => {
  const { stateCart } = useContext(contexts.CartContext);
  const { state } = useProductListContext();

  const { me } = useDataAuth();
  // memoize jumlah cart agar tidak rerender
  const cartCount = useMemo(
    () => stateCart.total.data?.totalProducts || 0,
    [stateCart.total.data?.totalProducts],
  );
  // title header
  const title = useMemo(
    () => state.category?.name ?? '',
    [state.category?.name],
  );
  // validasi ketika tap cart icon
  const validateCartVisit = useCallback(() => {
    if (me.data === null) {
      backToLogin();
    } else {
      goToShoppingCart();
    }
  }, [me.data]);

  return (
    <SnbTopNav2.Type5
      testID="category-product-header"
      title={title}
      backAction={goBack}
      color="white"
      icon2Name="search"
      icon2Action={goToSearch}
      icon1Value={cartCount}
      icon1Name="cart"
      icon1Action={validateCartVisit}
    />
  );
};

export const Header = memo(header);
