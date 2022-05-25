/** === IMPORT PACKAGES === */
import React, { FC, useCallback, useContext, memo } from 'react';
import { View } from 'react-native';
import { SnbTopNav2 } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS === */
import {
  goBack,
  goToHome,
  goToSearch,
  goToShoppingCart,
  backToLogin,
} from '@core/functions/product';
import { useDataAuth } from '@core/redux/Data';
/** === IMPORT TYPE === */
import { ProductHeaderType } from './product-list-core.type';
import { contexts } from '@contexts';
/** === TYPE === */
interface NavigationHeaderProps {
  type?: ProductHeaderType;
  title?: string;
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  onSearch: () => void;
  onSearchClear: () => void;
}
/** === COMPONENT === */
const NavigationHeader: FC<NavigationHeaderProps> = ({
  type = 'default',
  title = 'Product',
  keyword,
  onKeywordChange,
  onSearch,
  onSearchClear,
}) => {
  const { stateCart } = useContext(contexts.CartContext);
  const { me } = useDataAuth();

  const validateCartVisit = useCallback(() => {
    if (me.data === null) {
      backToLogin();
    } else {
      goToShoppingCart();
    }
  }, [me.data]);

  return (
    <View>
      {type === 'default' ? (
        <SnbTopNav2.Type5
          testID="pdp-list-header"
          title={title}
          backAction={goBack}
          color="white"
          icon1Name="search"
          icon1Action={goToSearch}
          icon2Value={stateCart.total.data?.totalProducts}
          icon2Name="cart"
          icon2Action={validateCartVisit}
        />
      ) : (
        <SnbTopNav2.Type8
          testID="pdp-list-header"
          backAction={goBack}
          color="white"
          placeholder="Cari di Sinbad"
          inputValue={keyword}
          onClearText={onSearchClear}
          onEnter={onSearch}
          onChangeText={(text) => onKeywordChange(text)}
          icon1Name="home"
          icon1Action={goToHome}
          icon2Value={stateCart.total.data?.totalProducts}
          icon2Name="cart"
          icon2Action={validateCartVisit}
        />
      )}
    </View>
  );
};

export default memo(NavigationHeader);
