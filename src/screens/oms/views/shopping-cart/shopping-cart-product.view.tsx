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
} from '../../functions';
import { goToProductDetail } from '@core/functions/product';
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
  sassionQty: number;
  setSassionQty: Dispatch<SetStateAction<number>>;
  onRemoveProduct: (any: IProductItemUpdateCart) => void;
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
  setSassionQty,
  onRemoveProduct,
}) => {
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
        <TouchableOpacity onPress={() => goToProductDetail(product.productId)}>
          <Image
            source={{ uri: product.urlImages }}
            style={{ marginRight: 8, width: 77, height: 77 }}
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => goToProductDetail(product.productId)}
            style={{ marginBottom: 12, maxWidth: 160 }}>
            <SnbText.B4>{product.productName}</SnbText.B4>
          </TouchableOpacity>
          <View style={{ marginBottom: 12 }}>
            <SnbText.B4 color={color.red50}>
              {toCurrency(product.displayPrice, { withFraction: false })}
            </SnbText.B4>
          </View>
          <SnbNumberCounter
            value={product.qty}
            onIncrease={() =>
              handleProductQuantityChange(
                invoiceGroupIndex,
                brandIndex,
                productIndex,
                'increase',
                [invoiceGroups, setInvoiceGroups],
                product.qty,
                setSassionQty,
              )
            }
            onDecrease={() =>
              handleProductQuantityChange(
                invoiceGroupIndex,
                brandIndex,
                productIndex,
                'decrease',
                [invoiceGroups, setInvoiceGroups],
                product.qty,
                setSassionQty,
              )
            }
            onChange={(qty: number) =>
              handleProductQuantityChange(
                invoiceGroupIndex,
                brandIndex,
                productIndex,
                'onChange',
                [invoiceGroups, setInvoiceGroups],
                qty,
                setSassionQty,
              )
            }
            minusDisabled={
              product.qty <= product.minQty ||
              product.qty - product.multipleQty < product.minQty
            }
            plusDisabled={
              product.qty >= product.stock ||
              product.qty + product.multipleQty > product.stock
            }
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '20%',
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
        {(product.stock <= 1000 || product.qty > product.stock) && (
          <SnbText.B3
            color={
              color.red50
            }>{`Tersisa ${product.stock} ${product.uom}`}</SnbText.B3>
        )}
      </View>
    </View>
  );
};
