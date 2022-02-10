/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ShoppingCartHeader } from './shopping-cart-header.view';
import { ShoppingCartAddress } from './shopping-cart-address.view';
import { ShoppingCartFooter } from './shopping-cart-footer.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { goBack, useCartExampleAction } from '../../functions';
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
/** === IMPORT OTHER FUNCTION HERE === */
import { contexts } from '@contexts';
/** === COMPONENT === */
const OmsShoppingCartView: FC = () => {
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const cartExampleAction = useCartExampleAction();
  /** === HOOKS === */
  useEffect(() => {
    cartExampleAction.fetch(dispatchCart);
  }, []);
  console.log(stateCart);
  /** === VIEW === */
  /** => Main */
  return (
    <SnbContainer color="grey">
      <ShoppingCartHeader goBack={goBack} />
      <View style={{ flex: 1 }}>
        <ShoppingCartAddress />
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
