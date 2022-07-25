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
import { testProps } from '@core/functions/global/test-props';
/** === INTERFACES === */
interface ProductNotAvailableSection {
  unavailableProducts: models.CartMasterUnavailable[];
  handleRemoveProductModal: (params: models.HandleRemoveProduct) => void;
  handleScrollToBottom: () => void;
  testID: string;
}
/** === COMPONENT === */
export const ProductNotAvailableSection: FC<ProductNotAvailableSection> = ({
  unavailableProducts,
  handleRemoveProductModal,
  handleScrollToBottom,
  testID,
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
          <View style={{ flex: 1 }}>
            <SnbText2.Headline.Small
              testID={`title.${testID}`}
              color={colorV2.textColor.default}>
              Belum Dapat Diproses
            </SnbText2.Headline.Small>
          </View>
          <View>
            <TouchableOpacity
              {...testProps(`btn-removeAllUnaivableProducts.${testID}`)}
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
              <SnbText2.Body.Small
                testID={`label.btn-removeAllUnaivableProducts.${testID}`}
                color={colorV2.textColor.link}>
                Hapus
              </SnbText2.Body.Small>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ ...ShoppingCartStyles.cardContainer, marginTop: 0 }}>
          <ProductUnavailableView
            testID={testID}
            unavailableProducts={unavailableProducts}
            handleRemoveProductModal={handleRemoveProductModal}
            handleScrollToBottom={handleScrollToBottom}
          />
        </View>
      </View>
    </View>
  );
};
