/** === IMPORT PACKAGE HERE ===  */
import React, { FC, Dispatch, SetStateAction } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  SnbText,
  SnbCheckbox,
  SnbIcon,
  color,
  SnbNumberCounter,
} from 'react-native-sinbad-ui';
import { toCurrency } from '../../../../../core/functions/global/currency-format';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import {
  handleSelectedProductChange,
  handleProductDelete,
  handleProductQuantityChange,
  useCartUpdateActions,
} from '../../functions';
import { useShopingCartContext } from 'src/data/contexts/oms/shoping-cart/useShopingCartContext';
import { ShoppingCartStyles } from '../../styles';
import {
  CartBrand,
  CartProduct,
  CartInvoiceGroup,
  IProductItemUpdateCart,
} from '@models';
/** === TYPE ===  */
interface ShoppingCartProductProps {
  product: CartProduct;
  productIndex: number;
  brand: CartBrand;
  brandIndex: number;
  invoiceGroupIndex: number;
  invoiceGroups: CartInvoiceGroup[];
  setInvoiceGroups: (any: CartInvoiceGroup[]) => void;
  productSelectedCount: number;
  setProductSelectedCount: Dispatch<SetStateAction<number>>;
  setAllProductsSelected: Dispatch<SetStateAction<boolean>>;
  totalProducts: number;
  setProductIdRemoveSelected: Dispatch<SetStateAction<string | null>>;
}
/** == COMPONENT === */
export const ShoppingCartProduct: FC<ShoppingCartProductProps> = ({
  product,
  productIndex,
  brand,
  brandIndex,
  invoiceGroupIndex,
  invoiceGroups,
  setInvoiceGroups,
  productSelectedCount,
  setProductSelectedCount,
  setAllProductsSelected,
  totalProducts,
  setProductIdRemoveSelected,
}) => {
  const { dispatchShopingCart } = useShopingCartContext();
  const cartUpdateActions = useCartUpdateActions();

  const onRemoveProduct = (productRemove: IProductItemUpdateCart) => {
    const params = {
      action: 'submit',
      products: [productRemove],
    };
    setProductIdRemoveSelected(productRemove.productId);
    cartUpdateActions.fetch(dispatchShopingCart, params);
  };

  return (
    <View
      style={{
        ...ShoppingCartStyles.horizontalBottomCardSlot,
        paddingBottom: 18,
        borderBottomWidth: productIndex === brand.products.length - 1 ? 0 : 1,
        borderStyle: 'solid',
        borderBottomColor: color.black10,
      }}
      key={product.productName}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginRight: 20, marginLeft: 4 }}>
          <SnbCheckbox
            status={product.selected ? 'selected' : 'unselect'}
            onPress={() =>
              handleSelectedProductChange(
                invoiceGroupIndex,
                brandIndex,
                productIndex,
                product.selected ? false : true,
                [invoiceGroups, setInvoiceGroups],
                [productSelectedCount, setProductSelectedCount],
                setAllProductsSelected,
                totalProducts,
              )
            }
          />
        </View>
        <Image
          source={{ uri: product.urlImages }}
          style={{ marginRight: 8, width: 77, height: 77 }}
        />
        <View>
          <View style={{ marginBottom: 12, maxWidth: 160 }}>
            <SnbText.B4>{product.productName}</SnbText.B4>
          </View>
          <View style={{ marginBottom: 12 }}>
            <SnbText.B4 color={color.red50}>
              {toCurrency(product.displayPrice)}
            </SnbText.B4>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <SnbNumberCounter
              value={product.qty}
              onIncrease={() =>
                handleProductQuantityChange(
                  invoiceGroupIndex,
                  brandIndex,
                  productIndex,
                  'increase',
                  [invoiceGroups, setInvoiceGroups],
                )
              }
              onDecrease={() =>
                handleProductQuantityChange(
                  invoiceGroupIndex,
                  brandIndex,
                  productIndex,
                  'decrease',
                  [invoiceGroups, setInvoiceGroups],
                )
              }
              minusDisabled={product.qty === 1}
              plusDisabled={product.qty === product.stock}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() =>
            handleProductDelete(
              invoiceGroupIndex,
              brandIndex,
              productIndex,
              invoiceGroups,
              onRemoveProduct,
            )
          }>
          <SnbIcon name="delete_outline" color={color.black60} size={32} />
        </TouchableOpacity>
        {product.stock <= 10 && (
          <SnbText.B3
            color={
              color.red50
            }>{`Tersisa ${product.stock} ${product.uom}`}</SnbText.B3>
        )}
      </View>
    </View>
  );
};
