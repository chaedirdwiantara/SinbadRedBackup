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
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import { FooterButton } from 'react-native-sinbad-ui';
/** === IMPORT OTHER HERE === */
import { contexts } from '@contexts';
import * as models from '@models';
import { goToCheckout } from '@core/functions/product';
import { useIsFocused } from '@react-navigation/native';
import { toCurrency } from '@core/functions/global/currency-format';
import { NavigationAction } from '@core/functions/navigation';

/** === INTERFACE === */
interface FooterProps {
  cartData: models.CartMaster;
  localCartMasterDebounce: models.CartMaster;
  countTotalProduct: number;
  countTotalPrice: number;
  isCheckoutDisabled: boolean;
  handleOpenErrorBusinessModal: () => void;
  handleErrorGlobalModalData: ErrorGlobalModalDataProps;
  handleParentToast: (message: string, height: number) => void;
  handleOpenErrorCheckVoucher: () => void;
  keyboardFocus: boolean;
  isAnyActiveProduct: boolean;
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
  localCartMasterDebounce,
  countTotalProduct,
  countTotalPrice,
  isCheckoutDisabled,
  handleOpenErrorBusinessModal,
  handleErrorGlobalModalData,
  handleParentToast,
  handleOpenErrorCheckVoucher,
  keyboardFocus,
  isAnyActiveProduct,
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
  const refFooterHeight = useRef(0);
  const [isDeleteVoucher, setDeleteVoucher] = useState(false);
  const [isInitialDebounce, setInitialDebounce] = useState(false);

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

  const handleResetSelectedVoucher = () => {
    resetSelectedVoucher();
  };

  /** ==> Check product, seller, and stock after checkout button was clicked and update API requested */
  const checkProductSellerStock = () => {
    if (stateCart.update.data !== null && isCheckoutPressed) {
      /** Input product(s) that's been selected and available as payload */
      checkSinbadVoucherAction.reset(dispatchVoucher);
      postCheckProductAction.fetch(dispatchCart, cartData);
      postCheckSellerAction.fetch(dispatchCart, cartData);
      postCheckStockAction.fetch(dispatchCart, cartData);
      if (selectedVoucher !== null) {
        const carts = reformatCarts();
        checkSinbadVoucherAction.fetch(
          dispatchVoucher,
          true,
          selectedVoucher?.voucherId || null,
          carts,
        );
      }
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
      checkSinbadVoucherAction.reset(dispatchVoucher);
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
      stateCart.postCheckStock.data !== null &&
      !stateVoucher.checkSinbadVoucher.loading
    ) {
      /** Check whether cart and several check responses match */
      const isValidationPass = matchCartWithCheckData({
        checkProductData: stateCart.postCheckProduct.data ?? [],
        checkSellerData: stateCart.postCheckSeller.data ?? [],
        checkStockData: stateCart.postCheckStock.data ?? [],
        cartData,
      });

      const isErrorVoucherValidation =
        selectedVoucher !== null &&
        stateVoucher.checkSinbadVoucher.error !== null &&
        stateVoucher.checkSinbadVoucher.error.code === 50170000017;

      /** Show business error if and only if the data from those responses doesn't match with Cart Master  */
      if (!isValidationPass || isErrorVoucherValidation) {
        if (!isValidationPass) {
          handleOpenErrorBusinessModal();
        } else {
          handleOpenErrorCheckVoucher();
        }
      } else {
        setMatchValid(isValidationPass && !isErrorVoucherValidation);
      }
    }
  }, [
    stateCart.postCheckProduct.data,
    stateCart.postCheckSeller.data,
    stateCart.postCheckStock.data,
    stateVoucher.checkSinbadVoucher,
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

  /** => listen check voucher fetch success */
  useEffect(() => {
    if (stateVoucher.checkSinbadVoucher.data !== null) {
      setFooterData(stateVoucher.checkSinbadVoucher.data);
    }
  }, [stateVoucher.checkSinbadVoucher.data]);

  /** => listen check voucher fetch error */
  useEffect(() => {
    if (stateVoucher.checkSinbadVoucher.error !== null) {
      resetSelectedVoucher();
      setFooterData({
        isVoucherExist: false,
        sinbadVoucherId: null,
        totalOrder: countTotalPrice,
        sinbadVoucherDiscountOrder: 0,
        totalOrderAfterSinbadVoucher: countTotalPrice,
        carts: [],
      });
    }
  }, [stateVoucher.checkSinbadVoucher.error]);

  /** => listen when something change in products */
  useEffect(() => {
    if (localCartMasterDebounce && !keyboardFocus && isInitialDebounce) {
      const carts = reformatCarts();
      /** fetch check sinbad voucher */
      checkSinbadVoucherAction.fetch(
        dispatchVoucher,
        false,
        selectedVoucher?.voucherId || null,
        carts,
      );
    } else {
      setInitialDebounce(true);
    }
  }, [localCartMasterDebounce]);

  /** => listen relate count total selected product */
  useEffect(() => {
    if (
      stateVoucher.checkSinbadVoucher.data &&
      stateVoucher.checkSinbadVoucher.data.isVoucherExist &&
      countTotalProduct === 0
    ) {
      handleResetSelectedVoucher();
      setTimeout(() => {
        handleParentToast(
          'Pilih produk sebelum pakai voucher',
          refFooterHeight.current,
        );
      }, 300);
    }
  }, [countTotalProduct]);

  /** listen relate  */
  useEffect(() => {
    if (footerData) {
      if (
        footerData.sinbadVoucherId !== selectedVoucher?.voucherId &&
        selectedVoucher !== null
      ) {
        handleResetSelectedVoucher();
        setTimeout(() => {
          handleParentToast(
            'Maaf, total belanja kamu dibawah syarat pemakaian voucher',
            refFooterHeight.current,
          );
        }, 300);
      } else if (
        footerData.totalOrder < 100000 &&
        countTotalProduct > 0 &&
        !isDeleteVoucher
      ) {
        setTimeout(() => {
          handleParentToast(
            'Min. belanja 100rb untuk checkout',
            refFooterHeight.current,
          );
        }, 300);
      }
    }
  }, [footerData]);

  const reformatCarts = () => {
    // format payload from redux master
    const carts: models.CheckSinbadVoucherPayloadCarts[] = [];
    cartData.sellers.map((sellerItem) => {
      const products: models.CheckSinbadVoucherPayloadProducts[] = [];
      sellerItem.products.map((productItem) => {
        if (productItem.selected) {
          let price = 0;
          // check if price rules
          if (productItem.priceRules.length > 0) {
            const priceRulesFirstItem = productItem.priceRules[0];
            if (productItem.qty < priceRulesFirstItem.minQty) {
              price = productItem.priceAfterTax;
            } else {
              for (let x = 0; x < productItem.priceRules.length; x++) {
                const isLast = x === productItem.priceRules.length - 1;
                if (!isLast) {
                  if (
                    productItem.qty >= productItem.priceRules[x].minQty &&
                    productItem.qty < productItem.priceRules[x + 1].minQty
                  ) {
                    price = productItem.priceRules[x].priceAfterTax;
                    break;
                  }
                } else {
                  price = productItem.priceRules[x].priceAfterTax;
                }
              }
            }
          } else {
            price = productItem.priceAfterTax;
          }
          products.push({
            productId: productItem.productId,
            qty: productItem.qty,
            priceAfterTax: price,
          });
        }
      });
      carts.push({ sellerId: sellerItem.sellerId, products });
    });

    return carts;
  };

  const manageVoucherCheckbox = () => {
    const isVoucherSelected =
      selectedVoucher && selectedVoucher.voucherId !== null;
    const isProductSelected = countTotalProduct > 0;
    const isSinbadVoucherExist =
      (footerData && footerData.isVoucherExist) || false;
    let voucherStatus: IVoucherStatus, voucherBadgeTitle, voucherBadgeSubtitle;

    if (isSinbadVoucherExist && isProductSelected && isVoucherSelected) {
      voucherStatus = 'green';
      voucherBadgeTitle = `Kamu Hemat ${toCurrency(
        (footerData && footerData.sinbadVoucherDiscountOrder) || 0,
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
    } else if (
      isSinbadVoucherExist &&
      !isProductSelected &&
      isAnyActiveProduct
    ) {
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
    const totalDisplayPrice =
      (footerData && footerData.totalOrderAfterSinbadVoucher) || 0;
    return (
      <FooterButton.Cart
        testID={`footer.${testID}`}
        titleButton="Checkout Sekarang"
        loading={!footerData}
        loadingButton={isCheckoutBtnLoading}
        disabled={
          totalDisplayPrice < 100000 ||
          isCheckoutBtnLoading ||
          isCheckoutDisabled ||
          stateVoucher.checkSinbadVoucher.loading
        }
        value={totalDisplayPrice || 0}
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
          if (voucherStatus !== 'gray') {
            // navigate to voucher list
            NavigationAction.navigate('VoucherCartListView');
          } else if (voucherStatus === 'gray') {
            setTimeout(() => {
              handleParentToast(
                'Pilih produk sebelum pakai voucher',
                refFooterHeight.current,
              );
            }, 300);
          }
        }}
        onCloseVoucher={
          voucherStatus === 'green'
            ? () => {
                setDeleteVoucher(true);
                handleResetSelectedVoucher();
                const carts = reformatCarts();
                checkSinbadVoucherAction.fetch(
                  dispatchVoucher,
                  true,
                  null,
                  carts,
                );
                setTimeout(() => {
                  handleParentToast(
                    'Voucher Berhasil Dihapus',
                    refFooterHeight.current,
                  );
                  setDeleteVoucher(false);
                }, 300);
              }
            : undefined
        }
      />
    );
  };

  /** ==> Main */
  return (
    <View
      style={{ justifyContent: 'flex-end' }}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        refFooterHeight.current = height;
      }}>
      {renderFooterContent()}
    </View>
  );
};
