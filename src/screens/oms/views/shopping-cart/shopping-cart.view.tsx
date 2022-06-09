/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import {
  SnbContainer,
  SnbToast,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
// import { cloneDeep, isEqual } from 'lodash';
/** === IMPORT INTERNAL COMPONENT HERE === */
import { ShoppingCartHeader } from './shopping-cart-header.view';
import { ShoppingCartAddress } from './shopping-cart-address.view';
import { ShoppingCartFooter } from './shopping-cart-footer.view';
import { ShoppingCartProducts } from './shopping-cart-products.view';
import { ModalRemoveProduct } from './modal-remove-product.view';
import { ModalCartProfileCompletion } from './modal-cart-profile-completion.view';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import BottomSheetError from '@core/components/BottomSheetError';
import LoadingPage from '@core/components/LoadingPage';
/** === IMPORT INTERNAL FUNCTION HERE === */
import {
  goBack,
  useGetCartAction,
  useCheckProductAction,
  useCheckSellerAction,
  useCheckStockAction,
  useRemoveCartProductAction,
  useCartLocalData,
  useOmsGeneralFailedState,
  useGetTotalCartAction,
  useCartBuyerAddressAction,
  useCancelStockAction,
  useUpdateCartAction,
  useKeyboardFocus,
  goToProfile,
} from '../../functions';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT OTHER HERE === */
import { contexts } from '@contexts';
import * as models from '@models';
import { ShoppingCartEmpty } from './shopping-cart-empty.view';
import { NavigationAction } from '@core/functions/navigation';
/** === DUMMIES === */
/** === COMPONENT === */
const OmsShoppingCartView: FC = ({ navigation }: any) => {
  /** => STATE */
  const {
    localCartMaster,
    setLocalCartMaster,
    updateQty,
    updateSelected,
    isAnyActiveProduct,
    manageCheckboxStatus,
    manageCheckboxOnPress,
    removeProduct,
    calculateProductTotalPrice,
    mergeCheckProduct,
    mergeCheckSeller,
    mergeCheckStock,
    setInitialLocalData,
  } = useCartLocalData();
  const [pageLoading, setPageLoading] = useState(false);
  const keyboardFocus = useKeyboardFocus();
  const [selectRemoveProduct, setSelectRemoveProduct] =
    useState<models.HandleRemoveProduct | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  // state error modal
  const errorModal = useOmsGeneralFailedState();

  const { countTotalPrice, countTotalProduct } = calculateProductTotalPrice();

  /** => ACTION */
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const getCartAction = useGetCartAction();
  const checkProductAction = useCheckProductAction();
  const checkSellerAction = useCheckSellerAction();
  const checkStockAction = useCheckStockAction();
  const removeCartProductAction = useRemoveCartProductAction();
  const totalCartActions = useGetTotalCartAction();
  const cartBuyerAddressAction = useCartBuyerAddressAction();
  const cancelCartAction = useCancelStockAction();
  const updateCartAction = useUpdateCartAction();

  /** => MODAL REF */
  const refRemoveProductModal = React.useRef<SnbBottomSheet2Ref>(null);
  const refCartValidationModal = React.useRef<SnbBottomSheet2Ref>(null);

  /** === FUNCTIONS === */
  /** => handle remove product modal */
  const handleRemoveProductModal = (selected: models.HandleRemoveProduct) => {
    setSelectRemoveProduct(selected);
    refRemoveProductModal.current?.open();
  };

  /** => handle ok action remove product */
  const handleOkActionRemoveProduct = () => {
    if (selectRemoveProduct && localCartMaster) {
      removeCartProductAction.fetch(dispatchCart, {
        cartId: localCartMaster.id,
        removedProducts: selectRemoveProduct.removedProducts,
      });
    }
  };

  /** => handle reset contexts */
  const handleResetContexts = () => {
    checkProductAction.reset(dispatchCart);
    checkSellerAction.reset(dispatchCart);
    checkStockAction.reset(dispatchCart);
    getCartAction.reset(dispatchCart);
    removeCartProductAction.reset(dispatchCart);
    cartBuyerAddressAction.reset(dispatchCart);
    updateCartAction.reset(dispatchCart);
    cancelCartAction.reset(dispatchCart);
  };

  /** => handle cart cycle */
  const handleCartCyle = () => {
    handleResetContexts();
    setPageLoading(true);
    cancelCartAction.fetch(dispatchCart);
    cartBuyerAddressAction.fetch(dispatchCart);
  };

  /** => handle update cart */
  const handleUpdateCart = () => {
    if (localCartMaster) {
      updateCartAction.fetch(dispatchCart, localCartMaster);
    }
  };

  /** => handle merge check data */
  const handleMergeCheckData = async ({
    checkProductData,
    checkSellerData,
    checkStockData,
  }: models.MergeCheckData) => {
    const resultMergeCheckProduct = mergeCheckProduct(checkProductData);
    const resultMergeCheckSeller = mergeCheckSeller(
      checkSellerData,
      resultMergeCheckProduct,
    );
    const resultMergeCheckStock = mergeCheckStock(
      checkStockData,
      resultMergeCheckSeller,
    );
    if (resultMergeCheckStock) {
      setInitialLocalData(resultMergeCheckStock);
    }
  };

  /** => handle go back */
  const handleGoBack = () => {
    goBack();
    handleUpdateCart();
  };

  /** => scroll to bottom (for accordion) */
  const scrollToBottom = () => {
    scrollRef.current?.scrollToEnd();
  };

  /** => hardware back handler */
  NavigationAction.useCustomBackHardware(() => {
    handleGoBack();
  });

  /** === HOOKS === */
  /** => will unmount */
  useEffect(() => {
    return () => {
      handleResetContexts();
    };
  }, []);

  /** => define blur function */
  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      handleUpdateCart();
    });

    return unsubscribeBlur;
  }, [localCartMaster]);

  /** => define focus function */
  useEffect(() => {
    /** did mount */
    const unsubscribeFocus = navigation.addListener('focus', () => {
      handleCartCyle();
    });

    return unsubscribeFocus;
  }, [navigation]);

  /** => if cancel stock or buyer address failed */
  useEffect(() => {
    if (!stateCart.cancelStock.loading && !stateCart.buyerAddress.loading) {
      // check which endpoint fetch was fail
      const isErrorCancelStock = stateCart.cancelStock.error !== null;
      const isErrorBuyerAddress = stateCart.buyerAddress.error !== null;
      // determine the error data
      let errorData = null;
      if (isErrorCancelStock) {
        errorData = stateCart.cancelStock.error;
      } else {
        errorData = stateCart.buyerAddress.error;
      }
      if (isErrorCancelStock || isErrorBuyerAddress) {
        errorModal.setCloseAction(() => handleGoBack);
        errorModal.setErrorData(errorData);
        errorModal.setOpen(true);
      }
    }
  }, [stateCart.cancelStock, stateCart.buyerAddress]);

  /** => after success fetch cancelStock & buyerAddress, fetch getCart */
  useEffect(() => {
    if (
      stateCart.cancelStock.data !== null &&
      stateCart.buyerAddress.data !== null
    ) {
      getCartAction.fetch(dispatchCart);
    }
  }, [stateCart.cancelStock.data, stateCart.buyerAddress.data]);

  /** => if get cart failed */
  useEffect(() => {
    if (stateCart.get.error !== null) {
      setPageLoading(false);
      if (stateCart.get.error.code !== 20130000008) {
        errorModal.setCloseAction(() => handleGoBack);
        errorModal.setErrorData(stateCart.get.error);
        errorModal.setOpen(true);
      }
    }
  }, [stateCart.get.error]);

  /** => after success fetch getCart, save data to redux */
  useEffect(() => {
    if (
      stateCart.get.data !== null &&
      stateCart.get.data.sellers.length > 0 &&
      stateCart.buyerAddress.data !== null
    ) {
      setLocalCartMaster({
        id: stateCart.get.data.id,
        userId: stateCart.get.data.userId,
        buyerId: stateCart.get.data.buyerId,
        totalProducts: stateCart.get.data.totalProducts,
        sellers: stateCart.get.data.sellers,
        unavailable: [],
      });
      checkProductAction.fetch(dispatchCart);
      checkSellerAction.fetch(dispatchCart);
      checkStockAction.fetch(dispatchCart, false);
    } else if (
      stateCart.get.data !== null &&
      stateCart.get.data.sellers.length === 0
    ) {
      setPageLoading(false);
    }
  }, [stateCart.get.data, stateCart.buyerAddress.data]);

  /** => if one of the check endpoint fail, show error retry */
  useEffect(() => {
    // wait all fetch done first
    if (
      !stateCart.checkProduct.loading &&
      !stateCart.checkSeller.loading &&
      !stateCart.checkStock.loading &&
      !stateCart.get.loading
    ) {
      // check which endpoint fetch was fail
      const isErrorCheckProduct = stateCart.checkProduct.error !== null;
      const isErrorCheckSeller = stateCart.checkSeller.error !== null;
      const isErrorCheckStock = stateCart.checkStock.error !== null;
      // determine the error data
      let errorData = null;
      if (isErrorCheckProduct) {
        errorData = stateCart.checkProduct.error;
      } else if (isErrorCheckSeller) {
        errorData = stateCart.checkSeller.error;
      } else {
        errorData = stateCart.checkStock.error;
      }
      // show the modal and the data
      if (isErrorCheckProduct || isErrorCheckSeller || isErrorCheckStock) {
        errorModal.setCloseAction(() => handleGoBack);
        errorModal.setErrorData(errorData);
        errorModal.setOpen(true);
      }
    }
  }, [stateCart.checkProduct, stateCart.checkSeller, stateCart.checkStock]);

  /** => after success fetch checkProduct, checkSeller & checkStock then merge data to redux */
  useEffect(() => {
    if (
      stateCart.checkProduct.data !== null &&
      stateCart.checkSeller.data !== null &&
      stateCart.checkStock.data !== null &&
      localCartMaster &&
      localCartMaster.id !== ''
    ) {
      handleMergeCheckData({
        checkProductData: stateCart.checkProduct.data,
        checkSellerData: stateCart.checkSeller.data,
        checkStockData: stateCart.checkStock.data,
      });
      setPageLoading(false);
    }
  }, [
    localCartMaster?.id,
    stateCart.checkProduct.data,
    stateCart.checkSeller.data,
    stateCart.checkStock.data,
  ]);

  /** => listen remove product fetch */
  useEffect(() => {
    /** success */
    if (stateCart.remove.data !== null && selectRemoveProduct !== null) {
      removeProduct(selectRemoveProduct);
      totalCartActions.fetch(dispatchCart);
      SnbToast.show('Produk berhasil dihapus dari keranjang', 2000, {
        position: 'top',
        positionValue: StatusBar.currentHeight,
      });
      refRemoveProductModal.current?.close();
    }
    /** error */
    if (stateCart.remove.error !== null) {
      SnbToast.show('Produk gagal dihapus dari keranjang', 2000, {
        position: 'top',
        positionValue: StatusBar.currentHeight,
      });
      refRemoveProductModal.current?.close();
    }
  }, [stateCart.remove]);

  /** => listen something to be executed after page loaded */
  useEffect(() => {
    if (!pageLoading) {
      if (stateCart.buyerAddress.data) {
        if (
          !stateCart.buyerAddress.data.buyerName ||
          !stateCart.buyerAddress.data.address ||
          !stateCart.buyerAddress.data.isImageIdOcrValidation
        ) {
          refCartValidationModal.current?.open();
        }
      }
    }
  }, [pageLoading]);

  /** === VIEW === */
  /** => CONTENT */
  const renderContent = () => {
    const isCartEmpty =
      (!isAnyActiveProduct() && localCartMaster?.unavailable.length === 0) ||
      stateCart.get.data?.totalProducts === 0 ||
      stateCart.get.error?.code === 20130000008;
    if (!isCartEmpty && localCartMaster) {
      return (
        <React.Fragment>
          <ScrollView ref={scrollRef}>
            <View style={{ flex: 1 }}>
              <ShoppingCartAddress />
              <ShoppingCartProducts
                handleRemoveProductModal={handleRemoveProductModal}
                unavailableProducts={localCartMaster.unavailable}
                availableProducts={localCartMaster.sellers}
                handleUpdateQty={updateQty}
                handleUpdateSelected={updateSelected}
                isAnyActiveProduct={isAnyActiveProduct}
                manageCheckboxStatus={manageCheckboxStatus}
                manageCheckboxOnPress={manageCheckboxOnPress}
                keyboardFocus={keyboardFocus}
                handleScrollToBottom={scrollToBottom}
              />
            </View>
          </ScrollView>
          <ShoppingCartFooter
            cartData={localCartMaster}
            countTotalProduct={countTotalProduct}
            countTotalPrice={countTotalPrice}
            isCheckoutDisabled={
              !isAnyActiveProduct() ||
              countTotalPrice < 100000 ||
              keyboardFocus.isFocus
            }
            handleCartCycle={handleCartCyle}
          />
        </React.Fragment>
      );
    } else {
      return <ShoppingCartEmpty navigationParent={navigation} />;
    }
  };
  /** => MAIN */
  return (
    <SnbContainer color="grey">
      <ShoppingCartHeader goBack={handleGoBack} />
      {!pageLoading ? renderContent() : <LoadingPage />}
      {/* Dialog Remove Product */}
      <ModalRemoveProduct
        parentRef={refRemoveProductModal}
        okAction={() => handleOkActionRemoveProduct()}
        cancelAction={() => refRemoveProductModal.current?.close()}
      />
      {/* Profile Completion Modal */}
      <ModalCartProfileCompletion
        parentRef={refCartValidationModal}
        handleNavigateToProfile={() => {
          refCartValidationModal.current?.close();
          goToProfile();
        }}
      />
      {/* Error Modal Check Product, Seller & Stock */}
      <BottomSheetError
        open={errorModal.isOpen}
        error={errorModal.errorData}
        closeAction={() => {
          errorModal.closeAction();
          errorModal.setOpen(false);
        }}
        retryAction={() => {
          errorModal.closeAction();
          errorModal.setOpen(false);
        }}
      />
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
