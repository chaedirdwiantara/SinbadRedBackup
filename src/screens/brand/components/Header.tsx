/** === IMPORT PACKAGES === */
import React, { FC, useCallback, useContext, memo, useMemo } from 'react';
import { SnbTopNav2 } from 'react-native-sinbad-ui';
import { RouteProp, useRoute } from '@react-navigation/native';
/** === IMPORT FUNCTIONS === */
import {
  goBack,
  goToSearch,
  goToShoppingCart,
  backToLogin,
} from '@core/functions/product';
import { useDataAuth } from '@core/redux/Data';
import { contexts } from '@contexts';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === TYPE === */
interface NavigationHeaderProps {}
type BrandProductRouteParams = {
  BrandProduct: {
    brand: models.BrandListItem;
  };
};

type BrandProductRouteProps = RouteProp<
  BrandProductRouteParams,
  'BrandProduct'
>;
/** === COMPONENT === */
const header: FC<NavigationHeaderProps> = (props) => {
  const {
    params: { brand },
  } = useRoute<BrandProductRouteProps>();

  const { stateCart } = useContext(contexts.CartContext);

  const { me } = useDataAuth();
  // memoize jumlah cart agar tidak rerender
  const cartCount = useMemo(
    () => stateCart.total.data?.totalProducts || 0,
    [stateCart.total.data?.totalProducts],
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
      testID="brand-list-header"
      title={brand.name}
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
