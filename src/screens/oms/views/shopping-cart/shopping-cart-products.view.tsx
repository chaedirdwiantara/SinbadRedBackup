/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbCheckbox, SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ProductAvailableSection } from './product-available-section.view';
import { ProductNotAvailableSection } from './product-not-available-section.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
/** === IMPORT OTHER HERE === */
import * as models from '@models';
import { ShoppingCartStyles } from '@screen/oms/styles';
/** === INTERFACES === */
interface ShoppingCartProductsProps {
  availableProducts: models.CartMasterSellers[];
  unavailableProducts: models.CartMasterUnavailable[];
}
/** === COMPONENT === */
export const ShoppingCartProducts: FC<ShoppingCartProductsProps> = ({
  availableProducts,
  unavailableProducts,
}) => {
  /** === HOOKS === */
  /** === VIEW === */
  /** => Main */
  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      <View
        style={{
          ...ShoppingCartStyles.cardContainer,
          flexDirection: 'row',
          paddingVertical: 16,
        }}>
        <View style={{ marginRight: 16 }}>
          <SnbCheckbox status={'unselect'} onPress={() => {}} />
        </View>
        <SnbText.B4 color={color.black100}>Pilih Semua</SnbText.B4>
      </View>
      <ProductAvailableSection availableProducts={availableProducts} />
      <ProductNotAvailableSection unavailableProducts={unavailableProducts} />
    </View>
  );
};
