/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbCheckbox, SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ProductView } from './product.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
/** === IMPORT OTHER HERE === */
import * as models from '@models';
import { ShoppingCartStyles } from '@screen/oms/styles';
/** === INTERFACES === */
interface ProductAvailableSectionProps {
  availableProducts: models.CartMasterSellers[];
  handleRemoveProductModal: (params: models.HandleRemoveProduct) => void;
  handleUpdateQty: ({
    productId,
    sellerId,
    warehouseId,
    type,
  }: models.UpdateCartQty) => void;
}
/** === COMPONENT === */
export const ProductAvailableSection: FC<ProductAvailableSectionProps> = ({
  availableProducts,
  handleRemoveProductModal,
  handleUpdateQty,
}) => {
  /** === HOOKS === */
  /** === VIEW === */
  /** => MAIN */
  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      {availableProducts.map((item) => {
        if (item.products.length !== 0) {
          return (
            <View key={item.sellerId}>
              <View style={ShoppingCartStyles.sellerContainer}>
                <View style={{ marginRight: 16 }}>
                  <SnbCheckbox status={'unselect'} onPress={() => {}} />
                </View>
                <SnbText.B4 color={color.black100}>
                  {item.sellerName}
                </SnbText.B4>
              </View>
              {item.products.map((product) => (
                <View
                  key={`${product.productId}.${product.sellerId}`}
                  style={{ ...ShoppingCartStyles.cardContainer, marginTop: 0 }}>
                  <ProductView
                    product={product}
                    handleRemoveProductModal={handleRemoveProductModal}
                    handleUpdateQty={handleUpdateQty}
                  />
                </View>
              ))}
            </View>
          );
        }
      })}
    </View>
  );
};
