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
} from '@core/functions/product';
import { useCartTotalProductActions } from '@screen/oms/functions';
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
  const { dataTotalProductCart } = useCartTotalProductActions();
  return (
    <View>
      {type === 'default' ? (
        <SnbTopNav.Type6
          title={title}
          backAction={goBack}
          type="red"
          icon1Name="search"
          icon1Action={goToSearch}
          icon2Value={dataTotalProductCart.totalProduct}
          icon2Name="cart"
          icon2Action={goToShoppingCart}
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
          icon2Value={dataTotalProductCart.totalProduct}
          icon2Name="cart"
          icon2Action={goToShoppingCart}
        />
      )}
    </View>
  );
};

export default NavigationHeader;
