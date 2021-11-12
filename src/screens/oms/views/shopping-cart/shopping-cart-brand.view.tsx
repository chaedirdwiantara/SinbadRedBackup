/** === IMPORT PACKAGE HERE ===  */
import React, { FC, Dispatch, SetStateAction, Fragment } from 'react';
import { View } from 'react-native';
import { SnbText, SnbCheckbox, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ShoppingCartProduct } from './shopping-cart-product.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { handleSelectedBrandChange } from '../../functions';
import { ShoppingCartStyles } from '../../styles';
import { CartInvoiceGroup, CartBrand } from '@models';
/** === TYPE ===  */
interface ShoppingCartBrandProps {
  brand: CartBrand;
  brandIndex: number;
  invoiceGroupIndex: number;
  invoiceGroups: CartInvoiceGroup[];
  setInvoiceGroups: Dispatch<SetStateAction<CartInvoiceGroup[]>>;
  productSelectedCount: number;
  setProductSelectedCount: Dispatch<SetStateAction<number>>;
  setAllProductsSelected: Dispatch<SetStateAction<boolean>>;
  totalProducts: number;
}
/** == COMPONENT === */
export const ShoppingCartBrand: FC<ShoppingCartBrandProps> = ({
  brand,
  brandIndex,
  invoiceGroupIndex,
  invoiceGroups,
  setInvoiceGroups,
  productSelectedCount,
  setProductSelectedCount,
  setAllProductsSelected,
  totalProducts,
}) => (
  <Fragment key={brand.brandName}>
    <View
      style={{
        ...ShoppingCartStyles.topCardSlot,
        borderStyle: 'solid',
        borderTopWidth: brandIndex === 0 ? 0 : 1,
        borderTopColor: color.black10,
      }}>
      <View style={{ marginRight: 20, marginLeft: 4 }}>
        <SnbCheckbox
          status={brand.selected ? 'selected' : 'unselect'}
          onPress={() =>
            handleSelectedBrandChange(
              invoiceGroupIndex,
              brandIndex,
              brand.selected === false ? true : false,
              [invoiceGroups, setInvoiceGroups],
              [productSelectedCount, setProductSelectedCount],
              setAllProductsSelected,
              totalProducts,
            )
          }
        />
      </View>
      <SnbText.B4>{brand.brandName}</SnbText.B4>
    </View>
    {brand.products.map((product, productIndex) => (
      <ShoppingCartProduct
        key={product.productId.toString()}
        product={product}
        productIndex={productIndex}
        brand={brand}
        brandIndex={brandIndex}
        invoiceGroupIndex={invoiceGroupIndex}
        invoiceGroups={invoiceGroups}
        setInvoiceGroups={setInvoiceGroups}
        productSelectedCount={productSelectedCount}
        setProductSelectedCount={setProductSelectedCount}
        setAllProductsSelected={setAllProductsSelected}
        totalProducts={totalProducts}
      />
    ))}
  </Fragment>
);
