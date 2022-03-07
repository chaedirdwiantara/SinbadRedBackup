/** === IMPORT PACKAGE HERE ===  */
import {
  matchCartWithCheckData,
  useCancelStockAction,
  useCartMasterAction,
  useCheckoutAction,
  useOmsGeneralFailedState,
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
import * as models from '@models';
import BottomSheetError from '@core/components/BottomSheetError';
import { ShoppingCartStyles } from '@screen/oms/styles';
import { toCurrency } from '@core/functions/global/currency-format';

/** === INTERFACE === */
interface FooterProps {
  cartData: models.CartMaster;
  countTotalProduct: number;
  countTotalPrice: number;
  isInitialCancelReserveDone: boolean;
  onPressCheckout: () => void;
  isCheckoutDisabled: boolean;
}
/** === COMPONENT ===  */
const ShoppingCartFooterMemo: FC<FooterProps> = ({
  cartData,
  countTotalPrice,
  countTotalProduct,
  isInitialCancelReserveDone,
  onPressCheckout,
  isCheckoutDisabled,
}) => {
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const { stateCheckout, dispatchCheckout } = useContext(
    contexts.CheckoutContext,
  );
  const [isErrorShown, setErrorShown] = useState(false);

  const cancelCartAction = useCancelStockAction();
  const cartMasterAction = useCartMasterAction();
  const postCheckProductAction = usePostCheckProductAction();
  const postCheckSellerAction = usePostCheckSellerAction();
  const postCheckStockAction = usePostCheckStockAction();
  const updateCartAction = useUpdateCartAction();
  const checkoutAction = useCheckoutAction();

  // state error modal
  const retryCheckModal = useOmsGeneralFailedState();
  const retryCheckoutModal = useOmsGeneralFailedState();

  const handleOnPressCheckout = useCallback(() => {
    onPressCheckout();
    if (stateCart.buyerAddress.data !== null) {
      updateCartAction.fetch(dispatchCart, {
        buyerName: stateCart.buyerAddress.data.buyerName,
        id: cartData.id,
        carts: cartData.sellers,
      });
    }
  }, [stateCart.buyerAddress.data]);

  const checkProductSellerStock = useCallback(() => {
    if (stateCart.update.data !== null) {
      /** Input product(s) that's been selected and available as payload */
      postCheckProductAction.fetch(dispatchCart);
      postCheckSellerAction.fetch(dispatchCart);
      postCheckStockAction.fetch(dispatchCart);
    }
  }, [stateCart.update.data]);

  /** => did mount & will unmount */
  useEffect(() => {
    /** did mount */
    retryCheckModal.setRetryCount(3);

    /** will unmount */
    return () => {
      postCheckProductAction.reset(dispatchCart);
      postCheckSellerAction.reset(dispatchCart);
      postCheckStockAction.reset(dispatchCart);
      updateCartAction.reset(dispatchCart);
    };
  }, []);

  useEffect(() => {
    checkProductSellerStock();
  }, [checkProductSellerStock]);

  useEffect(() => {
    if (
      stateCart.postCheckProduct.data !== null &&
      stateCart.postCheckSeller.data !== null &&
      stateCart.postCheckStock.data !== null
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
      }
    }
  }, [
    stateCart.postCheckProduct.data,
    stateCart.postCheckSeller.data,
    stateCart.postCheckStock.data,
  ]);

  /** => if one of the check endpoint fail, show error retry */
  useEffect(() => {
    // wait all fetch done first
    if (
      !stateCart.postCheckProduct.loading &&
      !stateCart.postCheckSeller.loading &&
      !stateCart.postCheckStock.loading
    ) {
      // check which endpoint fetch was fail
      const isErrorCheckProduct = stateCart.postCheckProduct.error !== null;
      const isErrorCheckSeller = stateCart.postCheckSeller.error !== null;
      const isErrorCheckStock = stateCart.postCheckStock.error !== null;
      // determine the retry action
      const action = () => {
        if (retryCheckModal.retryCount > 0) {
          if (isErrorCheckProduct) {
            postCheckProductAction.fetch(dispatchCart);
          }
          if (isErrorCheckSeller) {
            postCheckSellerAction.fetch(dispatchCart);
          }
          if (isErrorCheckStock) {
            postCheckStockAction.fetch(dispatchCart, false);
          }
          // decrease the retry count
          retryCheckModal.setRetryCount(retryCheckModal.retryCount - 1);
        } else {
          retryCheckModal.setOpen(false);
        }
      };
      // determine the error data
      let errorData = null;
      if (isErrorCheckProduct) {
        errorData = stateCart.postCheckProduct.error;
      } else if (isErrorCheckSeller) {
        errorData = stateCart.postCheckSeller.error;
      } else {
        errorData = stateCart.postCheckStock.error;
      }
      // show the modal and the data
      if (isErrorCheckProduct || isErrorCheckSeller || isErrorCheckStock) {
        retryCheckModal.setRetryAction(() => action);
        retryCheckModal.setCloseAction(() => retryCheckModal.setOpen(false));
        retryCheckModal.setErrorData(errorData);
        retryCheckModal.setOpen(true);
      }
    }
  }, [
    stateCart.postCheckProduct,
    stateCart.postCheckSeller,
    stateCart.postCheckStock,
  ]);

  useEffect(() => {
    /** Request Checkout API once the validation complete with no errors
     * AND buyer address already give the result
     */
    retryCheckoutModal.setRetryCount(3);
    checkoutAction.fetch(dispatchCheckout);
  }, [
    stateCart.postCheckProduct.error,
    stateCart.postCheckSeller.error,
    stateCart.postCheckStock.error,
    stateCart.buyerAddress.data,
  ]);

  useEffect(() => {
    // wait all fetch done first
    if (!stateCheckout.checkout.loading) {
      // determine the retry action
      const action = () => {
        if (retryCheckModal.retryCount > 0) {
          if (stateCheckout.checkout.error !== null) {
            checkoutAction.fetch(dispatchCart);
          }
          // decrease the retry count
          retryCheckoutModal.setRetryCount(retryCheckoutModal.retryCount - 1);
        } else {
          retryCheckoutModal.setOpen(false);
        }
      };
      // determine the error data
      let errorData = null;
      if (stateCheckout.checkout.error !== null) {
        errorData = stateCheckout.checkout.error;
      }
      // show the modal and the data
      if (stateCheckout.checkout.error !== null) {
        retryCheckoutModal.setRetryAction(() => action);
        retryCheckoutModal.setCloseAction(() => {
          retryCheckoutModal.setOpen(false);
        });
        retryCheckoutModal.setErrorData(errorData);
        retryCheckoutModal.setOpen(true);
      }
    }
  }, [stateCheckout.checkout]);

  useEffect(() => {
    if (stateCart.cancelStock.data && !isInitialCancelReserveDone) {
      cartMasterAction.mergeCheckProduct(stateCart.postCheckProduct.data ?? []);
      cartMasterAction.mergeCheckSeller(stateCart.postCheckSeller.data ?? []);
      cartMasterAction.mergeCheckStock(stateCart.postCheckStock.data ?? []);
    }
  }, [stateCart.cancelStock.data, isInitialCancelReserveDone]);

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
          disabled={isCheckoutDisabled}
        />
      </View>
    </View>
  );

  const renderBusinessErrorModal = () => (
    <ShoppingCartValidation open={isErrorShown} closeAction={handleClose} />
  );

  const renderErrorRetryModal = () => (
    <BottomSheetError
      open={retryCheckModal.isOpen}
      error={retryCheckModal.errorData}
      retryAction={() => {
        retryCheckModal.retryAction();
        retryCheckModal.setOpen(false);
      }}
      closeAction={() => {
        retryCheckModal.closeAction();
        retryCheckModal.setOpen(false);
      }}
    />
  );

  const renderErrorRetryCheckoutModal = () => (
    <BottomSheetError
      open={retryCheckoutModal.isOpen}
      error={retryCheckoutModal.errorData}
      retryAction={() => {
        retryCheckoutModal.retryAction();
        retryCheckoutModal.setOpen(false);
      }}
      closeAction={() => {
        retryCheckoutModal.closeAction();
        retryCheckoutModal.setOpen(false);
      }}
    />
  );

  return (
    <View style={ShoppingCartStyles.footerContainer}>
      {renderFooterContent()}
      {renderBusinessErrorModal()}
      {renderErrorRetryModal()}
      {renderErrorRetryCheckoutModal()}
    </View>
  );
};

export const ShoppingCartFooter = React.memo(ShoppingCartFooterMemo);
