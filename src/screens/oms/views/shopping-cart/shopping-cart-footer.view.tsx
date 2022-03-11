/** === IMPORT PACKAGE HERE ===  */
import {
  matchCartWithCheckData,
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
  isCheckoutDisabled: boolean;
  handleCartCycle: () => void;
  handleMergeCheckData: (props: models.MergeCheckData) => void;
}
/** === COMPONENT ===  */
export const ShoppingCartFooter: FC<FooterProps> = ({
  cartData,
  countTotalPrice,
  countTotalProduct,
  isCheckoutDisabled,
  handleCartCycle,
  handleMergeCheckData,
}) => {
  /** === STATES === */
  const { stateCart, dispatchCart } = useContext(contexts.CartContext);
  const { stateCheckout, dispatchCheckout } = useContext(
    contexts.CheckoutContext,
  );
  const [isErrorShown, setErrorShown] = useState(false);
  const [isMatchValid, setMatchValid] = useState(false);
  const [isCheckoutPressed, setCheckoutPressed] = useState(false);
  const errorModal = useOmsGeneralFailedState();

  /** === ACTIONS === */
  const postCheckProductAction = usePostCheckProductAction();
  const postCheckSellerAction = usePostCheckSellerAction();
  const postCheckStockAction = usePostCheckStockAction();
  const updateCartAction = useUpdateCartAction();
  const checkoutAction = useCheckoutAction();

  /** === FUNCTIONS === */
  /** Update cart after checkout button was clicked */
  const handleOnPressCheckout = useCallback(() => {
    updateCartAction.fetch(dispatchCart, cartData);
    setCheckoutPressed(true);
  }, [cartData, stateCart.buyerAddress.data]);

  /** ==> Check product, seller, and stock after checkout button was clicked and update API requested */
  const checkProductSellerStock = useCallback(() => {
    if (stateCart.update.data !== null && isCheckoutPressed) {
      /** Input product(s) that's been selected and available as payload */
      postCheckProductAction.fetch(dispatchCart);
      postCheckSellerAction.fetch(dispatchCart);
      postCheckStockAction.fetch(dispatchCart);
      setCheckoutPressed(false);
    }
  }, [stateCart.update.data]);

  /** ==> Run cart validation cycle after business error modal dismissed */
  const handleClose = () => {
    handleCartCycle();
    setErrorShown(false);
  };

  /** === HOOKS === */
  /** => did mount & will unmount */
  useEffect(() => {
    /** did mount */

    /** will unmount */
    return () => {
      postCheckProductAction.reset(dispatchCart);
      postCheckSellerAction.reset(dispatchCart);
      postCheckStockAction.reset(dispatchCart);
    };
  }, []);

  /** => Check product, seller, and stock */
  useEffect(() => {
    checkProductSellerStock();
  }, [checkProductSellerStock]);

  /** ==> Check curren cart data with response from check product, seller, and stock */
  useEffect(() => {
    if (
      stateCart.postCheckProduct.data !== null &&
      stateCart.postCheckSeller.data !== null &&
      stateCart.postCheckStock.data !== null
    ) {
      /** Check whether cart and several check responses match */
      const validationResult = matchCartWithCheckData({
        checkProductData: stateCart.postCheckProduct.data ?? [],
        checkSellerData: stateCart.postCheckSeller.data ?? [],
        checkStockData: stateCart.postCheckStock.data ?? [],
        cartData,
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

  /** => if one of the check endpoint fail, show CTA */
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
        errorModal.setCloseAction(() => errorModal.setOpen(false));
        errorModal.setErrorData(errorData);
        errorModal.setOpen(true);
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
    if (isMatchValid) {
      checkoutAction.fetch(dispatchCheckout, cartData);
    }
  }, [isMatchValid]);

  useEffect(() => {
    if (stateCheckout.checkout.data !== null) {
      /**
       * NAVIGATE TO CHECKOUT PAGE
       */
    }
  }, [stateCheckout.checkout.data]);

  /** If checkout results in an error, show CTA */
  useEffect(() => {
    // wait all fetch done first
    if (!stateCheckout.checkout.loading) {
      const isChekoutError = stateCheckout.checkout.error !== null;
      // determine the error data
      let errorData = null;
      // show the modal and the data
      if (isChekoutError) {
        errorData = stateCheckout.checkout.error;
        errorModal.setCloseAction(() => errorModal.setOpen(false));
        errorModal.setErrorData(errorData);
        errorModal.setOpen(true);
      }
    }
  }, [stateCheckout.checkout]);

  /** After cancel stock API requested, merge response from all checks to cart master */
  useEffect(() => {
    if (stateCart.cancelStock.data !== null) {
      handleMergeCheckData({
        checkProductData: stateCart.postCheckProduct.data ?? [],
        checkSellerData: stateCart.postCheckSeller.data ?? [],
        checkStockData: stateCart.postCheckStock.data ?? [],
      });
    }
  }, [stateCart.cancelStock.data]);

  /** === VIEWS === */
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
        closeAction={() => {
          errorModal.closeAction();
        }}
      />
    </View>
  );
};
