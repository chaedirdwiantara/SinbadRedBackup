/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS === */
import {
  goBack,
  goToHome,
  goToSearch,
  goToShoppingCart,
  backToLogin,
} from '@core/functions/product';
import { useDataAuth } from '@core/redux/Data';
// import { useCartTotalProductActions } from '@screen/oms/functions';
/** === IMPORT TYPE === */
import { ProductHeaderType } from './product-list-core.type';
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
  // const { dataTotalProductCart } = useCartTotalProductActions();
  const { me } = useDataAuth();

  const validateCartVisit = () => {
    if (me.data === null) {
      backToLogin();
    } else {
      goToShoppingCart();
    }
  };

  return (
    <View>
      {type === 'default' ? (
        <SnbTopNav.Type6
          title={title}
          backAction={goBack}
          type="red"
          icon1Name="search"
          icon1Action={goToSearch}
          // icon2Value={dataTotalProductCart.totalProduct}
          icon2Value={0}
          icon2Name="cart"
          icon2Action={validateCartVisit}
        />
      ) : (
        <SnbTopNav.Type10
          type="red"
          backAction={goBack}
          placeholder="Cari di Sinbad"
          value={keyword}
          clearText={onSearchClear}
          enter={onSearch}
          onChangeText={(text) => onKeywordChange(text)}
          icon1Name="home"
          icon1Action={goToHome}
          // icon2Value={dataTotalProductCart.totalProduct}
          icon2Value={0}
          icon2Name="cart"
          icon2Action={validateCartVisit}
        />
      )}
    </View>
  );
};

export default NavigationHeader;
