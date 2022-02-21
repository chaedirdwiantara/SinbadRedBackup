/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT INTERNAL COMPONENT HERE === */
import { ShoppingCartHeader } from './shopping-cart-header.view';
import { ShoppingCartAddress } from './shopping-cart-address.view';
import { ShoppingCartFooter } from './shopping-cart-footer.view';
import { ShoppingCartProducts } from './shopping-cart-products.view';
/** === IMPORT EXTERNAL COMPONENT HERE === */
/** === IMPORT INTERNAL FUNCTION HERE === */
import {
  goBack,
  useGetCartAction,
  useCartMasterAction,
  useCheckProductAction,
  useCheckSellerAction,
  useCheckStockAction,
  useCancelStockAction,
} from '../../functions';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT OTHER HERE === */
import { contexts } from '@contexts';
/** === DUMMIES === */
/** === COMPONENT === */
const OmsShoppingCartView: FC = () => {
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const getCartAction = useGetCartAction();
  const cartMasterAction = useCartMasterAction();
  const checkProductAction = useCheckProductAction();
  const checkSellerAction = useCheckSellerAction();
  const checkStockAction = useCheckStockAction();
  const cancelStockAction = useCancelStockAction();
  /** === HOOKS === */
  /** => Did Mount */
  useEffect(() => {
    getCartAction.fetch(dispatchCart);
    checkProductAction.fetch(dispatchCart, {
      carts: [
        {
          productId: '53c9b0000000000000000000',
          warehouseId: 1,
        },
        {
          productId: '53c9b0000000000000000002',
          warehouseId: 2,
        },
      ],
    });
    checkSellerAction.fetch(dispatchCart, {
      sellerIds: [1, 2],
    });
    checkStockAction.fetch(dispatchCart, {
      reserved: true,
      carts: [
        {
          productId: '53c9b0000000000000000000',
          warehouseId: 1,
        },
        {
          productId: '53c9b0000000000000000002',
          warehouseId: 1,
        },
      ],
    });
    cancelStockAction.fetch(dispatchCart);
  }, []);
  /** => after success fetch getCart, save data to redux */
  useEffect(() => {
    if (stateCart.get.data !== null) {
      cartMasterAction.setCartMaster(stateCart.get.data);
    }
  }, [stateCart.get.data]);
  /** => after success fetch checkProduct, merge data to redux */
  useEffect(() => {
    if (
      stateCart.checkProduct.data !== null &&
      cartMasterAction.cartMaster.id !== ''
    ) {
      cartMasterAction.mergeCheckProduct(stateCart.checkProduct.data);
    }
  }, [stateCart.checkProduct.data]);
  /** => after success fetch checkSeller, merge data to redux */
  useEffect(() => {
    if (
      stateCart.checkSeller.data !== null &&
      cartMasterAction.cartMaster.id !== ''
    ) {
      cartMasterAction.mergeCheckSeller(stateCart.checkSeller.data);
    }
  }, [cartMasterAction.cartMaster.sellers, stateCart.checkSeller.data]);
  console.log({
    cartMaster: cartMasterAction.cartMaster,
    stateCart,
  });
  /** === VIEW === */
  /** => Main */
  return (
    <SnbContainer color="grey">
      <ShoppingCartHeader goBack={goBack} />
      <ScrollView>
        <View style={{ flex: 1 }}>
          <ShoppingCartAddress />
          <ShoppingCartProducts />
        </View>
      </ScrollView>
      <ShoppingCartFooter onPressCheckout={() => cartMasterAction.reset()} />
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
