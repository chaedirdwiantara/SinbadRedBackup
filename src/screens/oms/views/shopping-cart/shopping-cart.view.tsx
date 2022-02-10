/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ShoppingCartHeader } from './shopping-cart-header.view';
import { ShoppingCartAddress } from './shopping-cart-address.view';
import { ShoppingCartFooter } from './shopping-cart-footer.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { goBack } from '../../functions';
import { ProductView } from './product.view';
import { ProductUnavailableView } from './product-not-available.view';
import { ShoppingCartStyles } from '@screen/oms/styles';
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
/** === COMPONENT === */
const OmsShoppingCartView: FC = () => {
  /** === HOOKS === */

  /** === VIEW === */
  /** => Main */
  return (
    <SnbContainer color="grey">
      <ShoppingCartHeader goBack={goBack} />
      <View style={{ flex: 1 }}>
        <ShoppingCartAddress />
        <View style={ShoppingCartStyles.cardContainer}>
          <ProductView />
        </View>
        <View style={ShoppingCartStyles.cardContainer}>
          <ProductUnavailableView />
        </View>
      </View>
      <ShoppingCartFooter />
    </SnbContainer>
  );
};

export default OmsShoppingCartView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: ryan
 * updatedDate: 07022022
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
