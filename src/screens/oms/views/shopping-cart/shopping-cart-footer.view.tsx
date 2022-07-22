/** === IMPORT PACKAGE HERE ===  */
import {
  matchCartWithCheckData,
  useCheckoutAction,
  usePostCheckProductAction,
  usePostCheckSellerAction,
  usePostCheckStockAction,
  useUpdateCartAction,
} from '@screen/oms/functions';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { FooterButton } from 'react-native-sinbad-ui';
/** === IMPORT OTHER HERE === */
import { contexts } from '@contexts';
import * as models from '@models';
import { goToCheckout } from '@core/functions/product';
import { useIsFocused } from '@react-navigation/native';
import { toCurrency } from '@core/functions/global/currency-format';

/** === INTERFACE === */
interface FooterProps {
  cartData: models.CartMaster;
  countTotalProduct: number;
  isCheckoutDisabled: boolean;
  handleOpenErrorBusinessModal: () => void;
  handleErrorGlobalModalData: any;
}
interface SelectedVoucherProps {
  sinbadVoucherId: number;
  voucherAmount: number;
}
/** === COMPONENT ===  */
export const ShoppingCartFooter: FC<FooterProps> = ({
  cartData,
  countTotalProduct,
  isCheckoutDisabled,
  handleOpenErrorBusinessModal,
  handleErrorGlobalModalData,
}) => {
  /** === STATES === */
  const { stateCart, dispatchCart } = useContext(contexts.CartContext);
  const { stateCheckout, dispatchCheckout } = useContext(
    contexts.CheckoutContext,
  );
  const { stateVoucher } = React.useContext(contexts.VoucherContext);
  const [footerData, setFooterData] =
    useState<models.CheckSinbadVoucherResponse | null>(null);
  const [selectedVoucher, setSelectedVoucher] =
    useState<SelectedVoucherProps | null>(null);
  const [isMatchValid, setMatchValid] = useState(false);
  const [isCheckoutPressed, setCheckoutPressed] = useState(false);
  const [isCheckoutBtnLoading, setCheckoutBtnLoading] = useState(false);
  const [isUpdateError, setUpdateError] = useState(false);
  const isFocused = useIsFocused();

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
    setCheckoutBtnLoading(true);
  }, [cartData, stateCart.checkBuyer.data]);

  /** ==> Check product, seller, and stock after checkout button was clicked and update API requested */
  const checkProductSellerStock = () => {
    if (stateCart.update.data !== null && isCheckoutPressed) {
      /** Input product(s) that's been selected and available as payload */
      postCheckProductAction.fetch(dispatchCart, cartData);
      postCheckSellerAction.fetch(dispatchCart, cartData);
      postCheckStockAction.fetch(dispatchCart, cartData);
      setCheckoutPressed(false);
      setCheckoutBtnLoading(true);
    }
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
      checkoutAction.reset(dispatchCheckout);
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
        handleOpenErrorBusinessModal();
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
      stateCart.postCheckProduct.error !== null ||
      stateCart.postCheckSeller.error !== null ||
      stateCart.postCheckStock.error !== null
    ) {
      // check which endpoint fetch was fail
      const isErrorCheckProduct = stateCart.postCheckProduct.error !== null;
      const isErrorCheckSeller = stateCart.postCheckSeller.error !== null;
      const isErrorCheckStock = stateCart.postCheckStock.error !== null;

      const action = () => {
        handleErrorGlobalModalData.setOpen(false);
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
        handleErrorGlobalModalData.setCloseAction(() => action);
        handleErrorGlobalModalData.setErrorData(errorData);
        handleErrorGlobalModalData.setOpen(true);
        setCheckoutBtnLoading(false);
      }
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
    if (isMatchValid) {
      checkoutAction.fetch(dispatchCheckout, cartData);
      setCheckoutBtnLoading(true);
      setMatchValid(false);
    }
  }, [isMatchValid]);

  useEffect(() => {
    if (stateCheckout.checkout.data !== null) {
      goToCheckout();
      /**
       * NAVIGATE TO CHECKOUT PAGE
       */
      setCheckoutBtnLoading(false);
    }
  }, [stateCheckout.checkout.data]);

  /** If checkout results in an error, show CTA */
  useEffect(() => {
    // wait all fetch done first
    if (stateCheckout.checkout.error !== null) {
      const action = () => {
        handleErrorGlobalModalData.setOpen(false);
      };
      // determine the error data
      let errorData = stateCheckout.checkout.error;
      // show the modal and the data
      errorData = stateCheckout.checkout.error;
      handleErrorGlobalModalData.setCloseAction(() => action);
      handleErrorGlobalModalData.setErrorData(errorData);
      handleErrorGlobalModalData.setOpen(true);
      setCheckoutBtnLoading(false);
    }
  }, [stateCheckout.checkout.error]);

  /** if fetch update error, set state variable  */
  useEffect(() => {
    if (isFocused && stateCart.update.error) {
      setUpdateError(true);
    }
  }, [isFocused, stateCart.update.error]);

  useEffect(() => {
    if (isUpdateError && stateCart.update.error) {
      const action = () => {
        setUpdateError(false);
        handleErrorGlobalModalData.setOpen(false);
      };
      handleErrorGlobalModalData.setCloseAction(() => action);
      handleErrorGlobalModalData.setErrorData(stateCart.update.error);
      handleErrorGlobalModalData.setOpen(true);
      setCheckoutBtnLoading(false);
    }
  }, [isUpdateError]);

  /** => listen check voucher fetch */
  useEffect(() => {
    if (stateVoucher.checkSinbadVoucher.data !== null) {
      setFooterData(stateVoucher.checkSinbadVoucher.data);
    }
  }, [stateVoucher.checkSinbadVoucher]);

  /** === VIEWS === */
  /** ==> content */
  const renderFooterContent = () => (
    <FooterButton.Order
      titleButton="Checkout Sekarang"
      loading={!footerData}
      loadingButton={isCheckoutBtnLoading}
      disabled={isCheckoutDisabled || isCheckoutBtnLoading}
      value={footerData?.totalOrderAfterSinbadVoucher || 0}
      vouchers={
        footerData
          ? {
              isNoProductSelected: countTotalProduct === 0,
              isVoucherAvailable: footerData.isVoucherExist,
              isVoucherSelected: !!selectedVoucher?.sinbadVoucherId,
              selectedAmount: toCurrency(selectedVoucher?.voucherAmount, {
                withFraction: false,
              }),
            }
          : undefined
      }
      description={
        countTotalProduct > 0
          ? `(${countTotalProduct}) barang dipilih`
          : undefined
      }
      buttonPress={handleOnPressCheckout}
      type={'cart'}
    />
  );

  /** ==> Main */
  return (
    <View style={{ justifyContent: 'flex-end' }}>{renderFooterContent()}</View>
  );
};
