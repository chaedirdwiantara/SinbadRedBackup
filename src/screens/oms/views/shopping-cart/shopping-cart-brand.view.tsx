/** === IMPORT PACKAGE HERE ===  */
import React, { FC, Dispatch, SetStateAction, Fragment } from 'react';
import { View } from 'react-native';
import { SnbText, SnbCheckbox, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ShoppingCartProduct } from './shopping-cart-product.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { handleSelectedBrandChange } from '../../functions';
import { ShoppingCartStyles } from '../../styles';
import { CartInvoiceGroup, CartBrand, IProductItemUpdateCart } from '@models';
/** === TYPE ===  */
interface ShoppingCartBrandProps {
  brand: CartBrand;
  brandIndex: number;
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
  sassionQty,
  setSassionQty,
  onRemoveProduct,
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
        key={productIndex.toString()}
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
        sassionQty={sassionQty}
        setSassionQty={setSassionQty}
        onRemoveProduct={onRemoveProduct}
      />
    ))}
  </Fragment>
);
