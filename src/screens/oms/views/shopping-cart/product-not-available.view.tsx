/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SnbText, SnbIcon, color } from 'react-native-sinbad-ui';
import { toCurrency } from '../../../../../core/functions/global/currency-format';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { handleProductNotAvailableDelete } from '../../functions';
import { goToProductDetail } from '@core/functions/product';
import { ShoppingCartStyles } from '../../styles';
import {
  ICartMasterProductNotAvailable,
  IProductRemoveSelected,
} from '@models';
/** === TYPE ===  */
interface ProductNotAvailableViewProps {
  product: ICartMasterProductNotAvailable;
  productIndex: number;
  productLength: number;
  onRemoveProduct: (any: IProductRemoveSelected) => void;
  type: 'dataEmptyStock' | 'dataNotFound';
}
/** == COMPONENT === */
export const ProductNotAvailableView: FC<ProductNotAvailableViewProps> = ({
  product,
  productIndex,
  productLength,
  onRemoveProduct,
  type,
}) => {
  return (
    <View
      style={{
        ...ShoppingCartStyles.horizontalBottomCardSlot,
        paddingBottom: 18,
        borderBottomWidth: productIndex === productLength - 1 ? 0 : 1,
        borderStyle: 'solid',
        borderBottomColor: color.black10,
      }}
      key={product.productName}>
      <View style={{ flexDirection: 'row' }}>
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
        </View>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() =>
            handleProductNotAvailableDelete(product, onRemoveProduct, type)
          }>
          <SnbIcon name="delete_outline" color={color.black60} size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
