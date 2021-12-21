/** === IMPORT PACKAGE HERE ===  */
import React, { FC, Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ShoppingCartBrand } from './shopping-cart-brand.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ShoppingCartStyles } from '../../styles';
import { CartInvoiceGroup, IProductItemUpdateCart } from '@models';
/** === TYPE ===  */
interface ShoppingCartInvoiceGroupProps {
  invoiceGroup: CartInvoiceGroup;
  invoiceGroupIndex: number;
  invoiceGroups: CartInvoiceGroup[];
  setInvoiceGroups: (any: CartInvoiceGroup[]) => void;
  productSelectedCount: number;
  setProductSelectedCount: Dispatch<SetStateAction<number>>;
  setAllProductsSelected: Dispatch<SetStateAction<boolean>>;
  totalProducts: number;
  sassionQty: number;
  setSassionQty: Dispatch<SetStateAction<number>>;
  onRemoveProduct: (any: IProductItemUpdateCart) => void;
  isFocus: boolean;
  setIsFocus: Dispatch<SetStateAction<boolean>>;
}
/** == COMPONENT === */
export const ShoppingCartInvoiceGroup: FC<ShoppingCartInvoiceGroupProps> = ({
  invoiceGroup,
  invoiceGroupIndex,
  invoiceGroups,
  setInvoiceGroups,
  productSelectedCount,
  setProductSelectedCount,
  setAllProductsSelected,
  totalProducts,
  sassionQty,
  setSassionQty,
  onRemoveProduct,
  isFocus,
  setIsFocus,
}) => {
  return (
    <View
      style={ShoppingCartStyles.cardContainer}
      key={invoiceGroup.invoiceGroupName}>
      <View style={ShoppingCartStyles.topCardSlot}>
        <SnbText.B4>{invoiceGroup.invoiceGroupName}</SnbText.B4>
      </View>
      {invoiceGroup.brands.map((brand, brandIndex) => (
        <ShoppingCartBrand
          key={brandIndex.toString()}
          brand={brand}
          brandIndex={brandIndex}
          invoiceGroupIndex={invoiceGroupIndex}
          invoiceGroups={invoiceGroups}
          setInvoiceGroups={setInvoiceGroups}
          productSelectedCount={productSelectedCount}
          setProductSelectedCount={setProductSelectedCount}
          setAllProductsSelected={setAllProductsSelected}
          totalProducts={totalProducts}
          sassionQty={sassionQty}
          setSassionQty={setSassionQty}
          onRemoveProduct={onRemoveProduct}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
        />
      ))}
    </View>
  );
};
