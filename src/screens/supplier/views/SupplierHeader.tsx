/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS === */
import {
  goBack,
  goToSearchProduct,
  goToHome,
  goToShoppingCart,
} from '../functions';
/** === TYPE === */
interface SupplierHeaderProps {
  keyword: string;
  onKeywordClear: () => void;
  onKeywordChange: (value: string) => void;
  cartBadge: number;
}
/** === COMPONENT === */
export const SupplierHeader: FC<SupplierHeaderProps> = ({
  keyword,
  onKeywordClear,
  onKeywordChange,
  cartBadge,
}) => (
  <SnbTopNav.Type10
    type="red"
    backAction={goBack}
    placeholder="Cari di Sinbad"
    value={keyword}
    clearText={onKeywordClear}
    enter={() => goToSearchProduct(keyword)}
    onChangeText={(text) => onKeywordChange(text)}
    icon1Name="home"
    icon1Action={goToHome}
    icon2Value={cartBadge}
    icon2Name="cart"
    icon2Action={goToShoppingCart}
  />
);
