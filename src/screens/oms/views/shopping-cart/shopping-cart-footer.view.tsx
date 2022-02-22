/** === IMPORT PACKAGE HERE ===  */
import {
  matchCartWithCheckData,
  useCartMasterAction,
  useCheckProductAction,
  useCheckSellerAction,
  useCheckStockAction,
  useUpdateCartAction,
} from '@screen/oms/functions';
import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SnbText, SnbButton, color } from 'react-native-sinbad-ui';
import ShoppingCartValidation from './shopping-cart-validation.view';
/** === IMPORT OTHER HERE === */
import { contexts } from '@contexts';
import BottomSheetError from '@core/components/BottomSheetError';
import { ShoppingCartStyles } from '@screen/oms/styles';

/** === INTERFACE === */
interface FooterProps {
  onPressCheckout: () => void;
}
/** === COMPONENT ===  */
export const ShoppingCartFooter: FC<FooterProps> = ({ onPressCheckout }) => {
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const [isErrorShown, setErrorShown] = useState(false);
  const [isRetryShown, setRetryShown] = useState(false);

  const updateCartAction = useUpdateCartAction();
  const cartMasterAction = useCartMasterAction();
  const checkProductAction = useCheckProductAction();
  const checkSellerAction = useCheckSellerAction();
  const checkStockAction = useCheckStockAction();

  const handleOnPressCheckout = () => {
    onPressCheckout();
    updateCartAction.fetch(dispatchCart, {
      id: cartMasterAction.cartMaster.id,
      carts: cartMasterAction.cartMaster.sellers,
    });
  };

  useEffect(() => {
    if (stateCart.update.data) {
      const carts =
        cartMasterAction.cartMaster.sellers.flatMap((seller) =>
          seller.products.map((product) => ({
            productId: product.productId,
            warehouseId: product.warehouseId,
          })),
        ) ?? [];
      const sellerIds =
        cartMasterAction.cartMaster.sellers.map((seller) => seller.sellerId) ??
        [];

      console.log({ carts, sellerIds });

      /** Input product(s) that's been selected and available as payload */
      checkProductAction.fetch(dispatchCart, {
        carts,
      });
      checkSellerAction.fetch(dispatchCart, {
        sellerIds,
      });
      checkStockAction.fetch(dispatchCart, {
        cartId: cartMasterAction.cartMaster.id,
        reserved: true,
        carts,
      });
    }
  }, [stateCart.update.data]);

  useEffect(() => {
    const validationResult = matchCartWithCheckData({
      checkProductData: stateCart.checkProduct.data ?? [],
      checkSellerData: stateCart.checkSeller.data ?? [],
      checkStockData: stateCart.checkStock.data ?? [],
      cartData: cartMasterAction.cartMaster,
    });

    if (!validationResult) {
      setErrorShown(true);
    }
  }, [
    stateCart.checkProduct.data,
    stateCart.checkSeller.data,
    stateCart.checkStock.data,
  ]);

  useEffect(() => {
    if (
      stateCart.checkProduct.error ||
      stateCart.checkSeller.error ||
      stateCart.checkStock.error
    ) {
      setRetryShown(true);
    }
  }, [
    stateCart.checkProduct.error,
    stateCart.checkSeller.error,
    stateCart.checkStock.error,
  ]);

  return (
    <View style={ShoppingCartStyles.footerContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SnbText.B2 color={color.black60}>Total: </SnbText.B2>
            <SnbText.H4 color={color.red50}>Rp0</SnbText.H4>
          </View>
          <SnbText.B4 color={color.black60}>0 barang dipilih</SnbText.B4>
        </View>
        <View>
          <SnbButton.Dynamic
            title="Checkout"
            type="primary"
            onPress={handleOnPressCheckout}
            size={'large'}
          />
        </View>
      </View>
      <ShoppingCartValidation
        open={isErrorShown}
        closeAction={() => setErrorShown(false)}
      />
      <BottomSheetError
        open={isRetryShown}
        error={{
          message: "There's an issue in our service",
          errorMessage: 'Error',
          type: '',
          code: 12340378910,
        }}
        retryAction={() => setRetryShown(false)}
      />
    </View>
  );
};
