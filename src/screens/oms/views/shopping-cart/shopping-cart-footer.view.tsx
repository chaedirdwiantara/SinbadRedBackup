/** === IMPORT PACKAGE HERE ===  */
import {
  matchCartWithCheckData,
  useCheckoutAction,
  useCheckSinbadVoucherAction,
  useFooterData,
  usePostCheckProductAction,
  usePostCheckSellerAction,
  usePostCheckStockAction,
  useUpdateCartAction,
} from '../../functions';
import { useVoucherLocalData } from '@screen/voucher/functions';
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
  localCartMasterDebouce: models.CartMaster;
  countTotalProduct: number;
  isCheckoutDisabled: boolean;
  handleOpenErrorBusinessModal: () => void;
  handleErrorGlobalModalData: ErrorGlobalModalDataProps;
  handleParentToast: (message: string) => void;
  testID: string;
}
interface ErrorGlobalModalDataProps {
  setOpen: (val: boolean) => void;
  setRetryAction: (val: () => void) => void;
  setCloseAction: (val: () => void) => void;
  setErrorData: (val: models.ErrorProps | null) => void;
  setRetryCount: (val: number) => void;
  isOpen: boolean;
  retryAction: Function;
  closeAction: Function;
  errorData: models.ErrorProps | null;
  retryCount: number;
}
type IVoucherStatus = 'green' | 'yellow' | 'gray' | 'hidden';
/** === COMPONENT ===  */
export const ShoppingCartFooter: FC<FooterProps> = ({
  cartData,
  localCartMasterDebouce,
  countTotalProduct,
  isCheckoutDisabled,
  handleOpenErrorBusinessModal,
  handleErrorGlobalModalData,
  handleParentToast,
  testID,
}) => {
  /** === STATES === */
  const { stateCart, dispatchCart } = useContext(contexts.CartContext);
  const { stateCheckout, dispatchCheckout } = useContext(
    contexts.CheckoutContext,
  );
  const { stateVoucher, dispatchVoucher } = React.useContext(
    contexts.VoucherContext,
  );
  const [isMatchValid, setMatchValid] = useState(false);
  const [isCheckoutPressed, setCheckoutPressed] = useState(false);
  const [isCheckoutBtnLoading, setCheckoutBtnLoading] = useState(false);
  const [isUpdateError, setUpdateError] = useState(false);
  const isFocused = useIsFocused();
  const { selectedVoucher, resetSelectedVoucher } = useVoucherLocalData();
  const { footerData, setFooterData } = useFooterData();

  /** === ACTIONS === */
  const postCheckProductAction = usePostCheckProductAction();
  const postCheckSellerAction = usePostCheckSellerAction();
  const postCheckStockAction = usePostCheckStockAction();
  const updateCartAction = useUpdateCartAction();
  const checkoutAction = useCheckoutAction();
  const checkSinbadVoucherAction = useCheckSinbadVoucherAction();

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
  }, [stateVoucher.checkSinbadVoucher.data]);

  /** => listen when something change in products */
  useEffect(() => {
    if (localCartMasterDebouce) {
      /** fetch check sinbad voucher */
      checkSinbadVoucherAction.fetch(
        dispatchVoucher,
        false,
        selectedVoucher?.voucherId || null,
      );
    }
  }, [localCartMasterDebouce]);

  const manageVoucherCheckbox = () => {
    const isVoucherSelected = selectedVoucher?.voucherId !== null;
    const isProductSelected = countTotalProduct > 0;
    const isSinbadVoucherExist =
      stateVoucher.checkSinbadVoucher.data?.isVoucherExist || false;
    let voucherStatus: IVoucherStatus, voucherBadgeTitle, voucherBadgeSubtitle;

    if (isSinbadVoucherExist && isProductSelected && isVoucherSelected) {
      voucherStatus = 'green';
      voucherBadgeTitle = `Kamu Hemat ${toCurrency(
        stateVoucher.checkSinbadVoucher.data?.sinbadVoucherDiscountOrder,
        { withFraction: false },
      )}`;
      voucherBadgeSubtitle = '1 Voucher digunakan';
    } else if (
      isSinbadVoucherExist &&
      isProductSelected &&
      !isVoucherSelected
    ) {
      voucherStatus = 'yellow';
      voucherBadgeTitle = 'Gunakan voucher untuk dapat diskon';
    } else if (isSinbadVoucherExist && !isProductSelected) {
      voucherStatus = 'gray';
      voucherBadgeTitle = 'Pilih produk sebelum pakai voucher';
    } else {
      voucherStatus = 'hidden';
    }

    return { voucherStatus, voucherBadgeTitle, voucherBadgeSubtitle };
  };

  /** === VIEWS === */
  /** ==> content */
  const renderFooterContent = () => {
    const { voucherStatus, voucherBadgeTitle, voucherBadgeSubtitle } =
      manageVoucherCheckbox();
    return (
      <FooterButton.Cart
        testID={`footer.${testID}`}
        titleButton="Checkout Sekarang"
        loading={!footerData}
        loadingButton={isCheckoutBtnLoading}
        disabled={isCheckoutDisabled || isCheckoutBtnLoading}
        value={footerData?.totalOrderAfterSinbadVoucher || 0}
        description={
          countTotalProduct > 0
            ? `(${countTotalProduct}) barang dipilih`
            : undefined
        }
        buttonPress={handleOnPressCheckout}
        voucherStatus={voucherStatus}
        voucherTitle={voucherBadgeTitle}
        voucherDescription={voucherBadgeSubtitle}
        onPressVoucher={() => {
          // navigate to voucher list
        }}
        onCloseVoucher={
          voucherStatus === 'green'
            ? () => {
                resetSelectedVoucher();
              }
            : undefined
        }
      />
    );
  };

  /** ==> Main */
  return (
    <View style={{ justifyContent: 'flex-end' }}>{renderFooterContent()}</View>
  );
};
