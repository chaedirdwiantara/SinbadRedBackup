/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SnbText2, colorV2 } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ProductUnavailableView } from './product-not-available.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
/** === IMPORT OTHER HERE === */
import * as models from '@models';
import { ShoppingCartStyles } from '@screen/oms/styles';
/** === INTERFACES === */
interface ProductNotAvailableSection {
  unavailableProducts: models.CartMasterUnavailable[];
  handleRemoveProductModal: (params: models.HandleRemoveProduct) => void;
  handleScrollToBottom: () => void;
}
/** === COMPONENT === */
export const ProductNotAvailableSection: FC<ProductNotAvailableSection> = ({
  unavailableProducts,
  handleRemoveProductModal,
  handleScrollToBottom,
}) => {
  /** === HOOKS === */
  /** === VIEW === */
  /** => MAIN */
  if (unavailableProducts.length === 0) {
    return null;
  }
  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      <View>
        <View style={ShoppingCartStyles.unavailableHeaderContainer}>
          <SnbText2.Headline.Small color={colorV2.textColor.default}>
            Tidak bisa diproses
          </SnbText2.Headline.Small>
          <View>
            <TouchableOpacity
              onPress={() => {
                const removedProducts: models.RemovedProducts[] = [];
                unavailableProducts.map((item) => {
                  removedProducts.push({
                    productId: item.productId,
                    warehouseId: item.warehouseId,
                  });
                });
                handleRemoveProductModal({
                  source: 'unavailable',
                  removedProducts,
                });
              }}
              style={{
                width: '100%',
              }}>
              <SnbText2.Body.Small color={colorV2.textColor.link}>
                Hapus
              </SnbText2.Body.Small>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ ...ShoppingCartStyles.cardContainer, marginTop: 0 }}>
          <ProductUnavailableView
            unavailableProducts={unavailableProducts}
            handleRemoveProductModal={handleRemoveProductModal}
            handleScrollToBottom={handleScrollToBottom}
          />
        </View>
      </View>
    </View>
  );
};
