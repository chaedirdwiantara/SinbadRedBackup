/** === IMPORT PACKAGE HERE ===  */
import {
  matchCartWithCheckData,
  useCartMasterAction,
  useCheckProductAction,
  useCheckSellerAction,
  useCheckStockAction,
  useUpdateCartAction,
} from '@screen/oms/functions';
import React, { FC, useCallback, useEffect, useState } from 'react';
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
  const [retryCounter, setRetryCounter] = useState(0);

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

  const checkProductSellerStock = useCallback(() => {
    if (stateCart.update.data) {
      /** Get available product(s) from .sellers, then filter it based on the selected one */
      const carts =
        cartMasterAction.cartMaster.sellers.flatMap((seller) =>
          seller.products
            .filter((product) => !!product.selected)
            .map((product) => ({
              productId: product.productId,
              warehouseId: product.warehouseId,
            })),
        ) ?? [];

      /** Form an array of sellerId(s) */
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
    checkProductSellerStock();
  }, [checkProductSellerStock]);

  useEffect(() => {
    /** Matching response data from checkProduct, checkSeller, and checkStock with data in Cart Master */
    const validationResult = matchCartWithCheckData({
      checkProductData: stateCart.checkProduct.data ?? [],
      checkSellerData: stateCart.checkSeller.data ?? [],
      checkStockData: stateCart.checkStock.data ?? [],
      cartData: cartMasterAction.cartMaster,
    });

    /** Show business error if and only if the data from those responses doesn't match with Cart Master  */
    if (!validationResult) {
      setErrorShown(true);
    }
  }, [
    stateCart.checkProduct.data,
    stateCart.checkSeller.data,
    stateCart.checkStock.data,
  ]);

  useEffect(() => {
    /** Show (Global) error, if and only if one or more of these endpoints got an error response */
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

  const handleRetry = () => {
    if (retryCounter < 3) {
      checkProductSellerStock();
      setRetryCounter((prev) => prev + 1);
    } else {
      setRetryShown(false);
    }
  };

  const renderFooterContent = () => (
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
  );

  const renderBusinessErrorModal = () => (
    <ShoppingCartValidation
      open={isErrorShown}
      closeAction={() => setErrorShown(false)}
    />
  );

  const renderGlobalErrorModal = () => (
    <BottomSheetError
      open={isRetryShown}
      error={{
        message: "There's an issue in our service",
        errorMessage: 'Error',
        type: '',
        code: retryCounter < 3 ? 12340378910 : 12340078910,
      }}
      retryAction={handleRetry}
    />
  );

  return (
    <View style={ShoppingCartStyles.footerContainer}>
      {renderFooterContent()}
      {renderBusinessErrorModal()}
      {renderGlobalErrorModal()}
    </View>
  );
};
