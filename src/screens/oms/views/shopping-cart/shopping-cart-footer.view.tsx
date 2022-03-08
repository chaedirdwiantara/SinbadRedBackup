/** === IMPORT PACKAGE HERE ===  */
import {
  matchCartWithCheckData,
  useCartMasterAction,
  useCheckoutAction,
  useOmsGeneralFailedState,
  usePostCancelStockAction,
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
import { cloneDeep } from 'lodash';

/** === INTERFACE === */
interface FooterProps {
  cartData: models.CartMaster;
  countTotalProduct: number;
  countTotalPrice: number;
  isCheckoutDisabled: boolean;
}
/** === COMPONENT ===  */
export const ShoppingCartFooter: FC<FooterProps> = ({
  cartData,
  countTotalPrice,
  countTotalProduct,
  isCheckoutDisabled,
}) => {
  const { stateCart, dispatchCart } = useContext(contexts.CartContext);
  const { stateCheckout, dispatchCheckout } = useContext(
    contexts.CheckoutContext,
  );
  const [isErrorShown, setErrorShown] = useState(false);
  const [isMatchValid, setMatchValid] = useState(false);
  const [isCheckoutPressed, setCheckoutPressed] = useState(false);

  const postCancelCartAction = usePostCancelStockAction();
  const cartMasterAction = useCartMasterAction();
  const postCheckProductAction = usePostCheckProductAction();
  const postCheckSellerAction = usePostCheckSellerAction();
  const postCheckStockAction = usePostCheckStockAction();
  const updateCartAction = useUpdateCartAction();
  const checkoutAction = useCheckoutAction();

  // state error modal
  const errorModal = useOmsGeneralFailedState();

  const handleOnPressCheckout = useCallback(() => {
    cartMasterAction.replaceFromLocal(cloneDeep(cartData));
    updateCartAction.fetch(dispatchCart, cartData);
    setCheckoutPressed(true);
  }, [cartData, stateCart.buyerAddress.data]);

  const checkProductSellerStock = useCallback(() => {
    if (stateCart.update.data !== null && isCheckoutPressed) {
      /** Input product(s) that's been selected and available as payload */
      postCheckProductAction.fetch(dispatchCart);
      postCheckSellerAction.fetch(dispatchCart);
      postCheckStockAction.fetch(dispatchCart);
      setCheckoutPressed(false);
    }
  }, [stateCart.update.data]);

  /** => did mount & will unmount */
  useEffect(() => {
    /** did mount */
    errorModal.setRetryCount(3);

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

      setMatchValid(validationResult);

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
        if (errorModal.retryCount > 0) {
          if (isErrorCheckProduct) {
            postCheckProductAction.fetch(dispatchCart);
          }
          if (isErrorCheckSeller) {
            postCheckSellerAction.fetch(dispatchCart);
          }
          if (isErrorCheckStock) {
            postCheckStockAction.fetch(dispatchCart);
          }
          // decrease the retry count
          errorModal.setRetryCount(errorModal.retryCount - 1);
        } else {
          errorModal.setOpen(false);
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
        errorModal.setRetryAction(() => action);
        errorModal.setErrorData(errorData);
        errorModal.setOpen(true);
      }
    }
  }, [
    stateCart.postCheckProduct,
    stateCart.postCheckSeller,
    stateCart.postCheckStock,
    errorModal.retryCount,
  ]);

  useEffect(() => {
    /** Request Checkout API once the validation complete with no errors
     * AND buyer address already give the result
     */
    if (isMatchValid) {
      errorModal.setRetryCount(3);
      checkoutAction.fetch(dispatchCheckout);
    }
  }, [isMatchValid]);

  useEffect(() => {
    if (stateCheckout.checkout.data !== null) {
      /**
       * NAVIGATE TO CHECKOUT PAGE
       */
    }
  }, [stateCheckout.checkout.data]);

  useEffect(() => {
    // wait all fetch done first
    if (!stateCheckout.checkout.loading) {
      const isChekoutError = stateCheckout.checkout.error !== null;
      // determine the retry action
      const action = () => {
        if (errorModal.retryCount > 0) {
          checkoutAction.fetch(dispatchCart);
          // decrease the retry count
          errorModal.setRetryCount(errorModal.retryCount - 1);
        } else {
          errorModal.setOpen(false);
        }
      };
      // determine the error data
      let errorData = null;
      // show the modal and the data
      if (isChekoutError) {
        errorData = stateCheckout.checkout.error;
        errorModal.setRetryAction(() => action);
        errorModal.setErrorData(errorData);
        errorModal.setOpen(true);
      }
    }
  }, [stateCheckout.checkout, errorModal.retryCount]);

  useEffect(() => {
    if (stateCart.postCancelStock.data !== null) {
      cartMasterAction.mergeCheckProduct(stateCart.postCheckProduct.data ?? []);
      cartMasterAction.mergeCheckSeller(stateCart.postCheckSeller.data ?? []);
      cartMasterAction.mergeCheckStock(stateCart.postCheckStock.data ?? []);
    }

    return () => {
      postCancelCartAction.reset(dispatchCart);
    };
  }, [stateCart.postCancelStock.data]);

  const handleClose = () => {
    postCancelCartAction.fetch(dispatchCart);
    setErrorShown(false);
  };

  console.log('ERROR STATUS: ', { errorModal });

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

  return (
    <View style={ShoppingCartStyles.footerContainer}>
      {renderFooterContent()}
      {renderBusinessErrorModal()}
      <BottomSheetError
        open={errorModal.isOpen}
        error={errorModal.errorData}
        retryAction={() => {
          errorModal.retryAction();
          // errorModal.setOpen(false);
        }}
        closeAction={() => {
          errorModal.closeAction();
          // errorModal.setOpen(false);
        }}
      />
    </View>
  );
};
