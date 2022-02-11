/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT INTERNAL COMPONENT HERE === */
import { ShoppingCartHeader } from './shopping-cart-header.view';
import { ShoppingCartAddress } from './shopping-cart-address.view';
import { ShoppingCartFooter } from './shopping-cart-footer.view';
import { ProductView } from './product.view';
import { ProductUnavailableView } from './product-not-available.view';
/** === IMPORT EXTERNAL COMPONENT HERE === */
/** === IMPORT INTERNAL FUNCTION HERE === */
import {
  goBack,
  useCartExampleAction,
  useGetCartAction,
} from '../../functions';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT OTHER HERE === */
import { ShoppingCartStyles } from '@screen/oms/styles';
import { contexts } from '@contexts';
/** === COMPONENT === */
const OmsShoppingCartView: FC = () => {
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const cartExampleAction = useCartExampleAction();
  const getCartAction = useGetCartAction();
  /** === HOOKS === */
  useEffect(() => {
    cartExampleAction.fetch(dispatchCart);
    getCartAction.fetch(dispatchCart);
  }, []);
  console.log(stateCart);
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
