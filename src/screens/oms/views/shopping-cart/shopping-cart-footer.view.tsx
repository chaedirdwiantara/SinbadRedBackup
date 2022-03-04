/** === IMPORT PACKAGE HERE ===  */
import {
  matchCartWithCheckData,
  useCancelStockAction,
  useCartBuyerAddressAction,
  useCartMasterAction,
  useCheckoutAction,
  usePostCheckProductAction,
  usePostCheckSellerAction,
  usePostCheckStockAction,
  useUpdateCartAction,
} from '@screen/oms/functions';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SnbText, SnbButton, color } from 'react-native-sinbad-ui';
import ShoppingCartValidation from './shopping-cart-validation.view';
/** === IMPORT OTHER HERE === */
import { contexts } from '@contexts';
import BottomSheetError from '@core/components/BottomSheetError';
import { ShoppingCartStyles } from '@screen/oms/styles';
import { toCurrency } from '@core/functions/global/currency-format';
import { usePrevious } from '@core/functions/hook/prev-value';

/** === INTERFACE === */
interface FooterProps {
  onPressCheckout: () => void;
  countTotalProduct: number;
  countTotalPrice: number;
  isInitialCancelReserveDone: boolean;
}
/** === COMPONENT ===  */
const ShoppingCartFooterMemo: FC<FooterProps> = ({
  onPressCheckout,
  countTotalPrice,
  countTotalProduct,
  isInitialCancelReserveDone,
}) => {
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const { stateCheckout, dispatchCheckout } = useContext(
    contexts.CheckoutContext,
  );
  const [isErrorShown, setErrorShown] = useState(false);
  const [isRetryShown, setRetryShown] = useState(false);
  const [retryCounter, setRetryCounter] = useState(0);

  const updateCartAction = useUpdateCartAction();
  const cancelCartAction = useCancelStockAction();
  const cartMasterAction = useCartMasterAction();
  const postCheckProductAction = usePostCheckProductAction();
  const postCheckSellerAction = usePostCheckSellerAction();
  const postCheckStockAction = usePostCheckStockAction();
  const buyerAddressAction = useCartBuyerAddressAction();
  const checkoutAction = useCheckoutAction();

  const prevCartMaster = usePrevious(cartMasterAction.cartMaster);

  const handleOnPressCheckout = async () => {
    if (stateCart.buyerAddress.data) {
      onPressCheckout();
      updateCartAction.fetch(dispatchCart, {
        buyerName: stateCart.buyerAddress.data.buyerName,
        id: cartMasterAction.cartMaster.id,
        carts: cartMasterAction.cartMaster.sellers,
      });
    }
  };

  const checkProductSellerStock = useCallback(() => {
    if (stateCart.update.data !== null) {
      /** Input product(s) that's been selected and available as payload */
      postCheckProductAction.fetch(dispatchCart);
      postCheckSellerAction.fetch(dispatchCart);
      postCheckStockAction.fetch(dispatchCart);
    }
    return () => {
      postCheckProductAction.reset(dispatchCart);
      postCheckSellerAction.reset(dispatchCart);
      postCheckStockAction.reset(dispatchCart);
    };
  }, [stateCart.update.data]);

  useEffect(() => {
    checkProductSellerStock();
  }, [checkProductSellerStock]);

  useEffect(() => {
    if (
      stateCart.postCheckProduct.data &&
      stateCart.postCheckSeller.data &&
      stateCart.postCheckStock.data
    ) {
      /** Matching response data from checkProduct, checkSeller, and checkStock with data in Cart Master */
      const validationResult = matchCartWithCheckData({
        checkProductData: stateCart.postCheckProduct.data ?? [],
        checkSellerData: stateCart.postCheckSeller.data ?? [],
        checkStockData: stateCart.postCheckStock.data ?? [],
        cartData: cartMasterAction.cartMaster,
      });

      /** Show business error if and only if the data from those responses doesn't match with Cart Master  */
      if (!validationResult) {
        setErrorShown(true);
      } else {
        buyerAddressAction.fetch(dispatchCart);
      }
    }
  }, [
    stateCart.postCheckProduct.data,
    stateCart.postCheckSeller.data,
    stateCart.postCheckStock.data,
  ]);

  useEffect(() => {
    /** Show (Global) error, if and only if one or more of these endpoints got an error response */
    if (
      stateCart.postCheckProduct.error ||
      stateCart.postCheckSeller.error ||
      stateCart.postCheckStock.error
    ) {
      setRetryShown(true);
    }
  }, [
    stateCart.postCheckProduct.error,
    stateCart.postCheckSeller.error,
    stateCart.postCheckStock.error,
  ]);

  useEffect(() => {
    /** Request Checkout API once the validation complete with no errors
     * AND buyer address already give the result
     */
    checkoutAction.fetch(dispatchCheckout);
  }, [
    stateCart.postCheckProduct.error,
    stateCart.postCheckSeller.error,
    stateCart.postCheckStock.error,
    stateCart.buyerAddress.data,
  ]);

  useEffect(() => {
    /** Show Checkout error, if and only if one or more of these endpoints got an error response */
    if (stateCart.buyerAddress.error || stateCheckout.checkout.error) {
      setRetryShown(true);
    }
  }, [stateCart.buyerAddress.error, stateCheckout.checkout.error]);

  useEffect(() => {
    if (stateCart.cancelStock.data && !isInitialCancelReserveDone) {
      cartMasterAction.mergeCheckProduct(stateCart.postCheckProduct.data ?? []);
      cartMasterAction.mergeCheckSeller(stateCart.postCheckSeller.data ?? []);
      cartMasterAction.mergeCheckStock(stateCart.postCheckStock.data ?? []);
    }
  }, [stateCart.cancelStock.data, isInitialCancelReserveDone]);

  const handleRetry = () => {
    if (retryCounter < 3) {
      checkProductSellerStock();
      setRetryCounter((prev) => prev + 1);
    } else {
      setRetryShown(false);
      setRetryCounter(0);
    }
  };

  const handleClose = () => {
    cancelCartAction.fetch(dispatchCart);
    setErrorShown(false);
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
          <SnbText.H4 color={color.red50}>
            {toCurrency(countTotalPrice, { withFraction: false })}
          </SnbText.H4>
        </View>
        <SnbText.B4
          color={
            color.black60
          }>{`${countTotalProduct} barang dipilih`}</SnbText.B4>
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
    <ShoppingCartValidation open={isErrorShown} closeAction={handleClose} />
  );

  const renderErrorRetryModal = () => (
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
      {renderErrorRetryModal()}
    </View>
  );
};

export const ShoppingCartFooter = React.memo(ShoppingCartFooterMemo);
