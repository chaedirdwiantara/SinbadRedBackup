/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbCheckbox, SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ProductView } from './product.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
/** === IMPORT OTHER HERE === */
import { ShoppingCartStyles } from '@screen/oms/styles';
/** === COMPONENT === */
export const ProductAvailableSection: FC = () => {
  /** === HOOKS === */
  /** === VIEW === */
  /** => Main */
  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      <View>
        <View
          style={{
            marginTop: 16,
            marginBottom: 2,
            paddingHorizontal: 16,
            paddingVertical: 16,
            flexDirection: 'row',
            backgroundColor: color.white,
          }}>
          <View style={{ marginRight: 16 }}>
            <SnbCheckbox status={'unselect'} onPress={() => {}} />
          </View>
          <SnbText.B4 color={color.black100}>Tigaraksa Danone</SnbText.B4>
        </View>
        {[0].map((i) => (
          <View
            key={i}
            style={{ ...ShoppingCartStyles.cardContainer, marginTop: 0 }}>
            <ProductView />
          </View>
        ))}
      </View>
    </View>
  );
};
