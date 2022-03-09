/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect, useState } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { SnbContainer, SnbToast } from 'react-native-sinbad-ui';
import { cloneDeep } from 'lodash';
/** === IMPORT INTERNAL COMPONENT HERE === */
import { ShoppingCartHeader } from './shopping-cart-header.view';
import { ShoppingCartAddress } from './shopping-cart-address.view';
import { ShoppingCartFooter } from './shopping-cart-footer.view';
import { ShoppingCartProducts } from './shopping-cart-products.view';
import { ModalRemoveProduct } from './modal-remove-product.view';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import BottomSheetError from '@core/components/BottomSheetError';
import LoadingPage from '@core/components/LoadingPage';
/** === IMPORT INTERNAL FUNCTION HERE === */
import {
  goBack,
  useGetCartAction,
  useCartMasterAction,
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
  } = useCartLocalData();
  const [pageLoading, setPageLoading] = useState(true);
  const [modalRemoveProduct, setModalRemoveProduct] = useState(false);
  const [selectRemoveProduct, setSelectRemoveProduct] =
    useState<models.HandleRemoveProduct | null>(null);

  // state error modal
  const errorModal = useOmsGeneralFailedState();

  const { countTotalPrice, countTotalProduct } = calculateProductTotalPrice();

  /** => ACTION */
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const getCartAction = useGetCartAction();
  const cartMasterAction = useCartMasterAction();
  const checkProductAction = useCheckProductAction();
  const checkSellerAction = useCheckSellerAction();
  const checkStockAction = useCheckStockAction();
  const removeCartProductAction = useRemoveCartProductAction();
  const totalCartActions = useGetTotalCartAction();
  const cartBuyerAddressAction = useCartBuyerAddressAction();
  const cancelCartAction = useCancelStockAction();
  const updateCartAction = useUpdateCartAction();

  /** === FUNCTIONS === */
  /** => handle remove product modal */
  const handleRemoveProductModal = (selected: models.HandleRemoveProduct) => {
    setSelectRemoveProduct(selected);
    setModalRemoveProduct(true);
  };

  /** => handle ok action remove product */
  const handleOkActionRemoveProduct = () => {
    if (selectRemoveProduct) {
      removeCartProductAction.fetch(dispatchCart, {
        cartId: cartMasterAction.cartMaster.id,
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
    cartMasterAction.reset();
    cartBuyerAddressAction.reset(dispatchCart);
    updateCartAction.reset(dispatchCart);
    cancelCartAction.reset(dispatchCart);
  };

  /** => handle cart cycle */
  const handleCartCyle = () => {
    handleResetContexts();
    setPageLoading(true);
    errorModal.setRetryCount(3);
    cancelCartAction.fetch(dispatchCart);
    cartBuyerAddressAction.fetch(dispatchCart);
  };

  const handleGoBack = () => {
    goBack();
    if (localCartMaster) {
      updateCartAction.fetch(dispatchCart, localCartMaster);
    }
  };

  /** === HOOKS === */
  /** => did mount & will unmount */
  useEffect(() => {
    /** did mount */
    const unsubscribe = navigation.addListener('focus', () => {
      handleCartCyle();
    });

    /** will unmount */
    return unsubscribe;
  }, [navigation]);

  /** => hardware back handler */
  NavigationAction.useCustomBackHardware(() => {
    handleGoBack();
  });

  /** => if cancel stock or buyer address failed */
  useEffect(() => {
    if (!stateCart.cancelStock.loading && !stateCart.buyerAddress.loading) {
      // check which endpoint fetch was fail
      const isErrorCancelStock = stateCart.cancelStock.error !== null;
      const isErrorBuyerAddress = stateCart.buyerAddress.error !== null;
      // determine retry action
      const action = () => {
        if (errorModal.retryCount > 0) {
          if (isErrorCancelStock) {
            cancelCartAction.fetch(dispatchCart);
          }
          if (isErrorBuyerAddress) {
            cartBuyerAddressAction.fetch(dispatchCart);
          }
          // decrease the retry count
          errorModal.setRetryCount(errorModal.retryCount - 1);
        } else {
          handleGoBack();
        }
      };
      // determine the error data
      let errorData = null;
      if (isErrorCancelStock) {
        errorData = stateCart.cancelStock.error;
      } else {
        errorData = stateCart.buyerAddress.error;
      }
      if (isErrorCancelStock || isErrorBuyerAddress) {
        errorModal.setRetryAction(() => action);
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
      errorModal.setRetryCount(3);
      getCartAction.fetch(dispatchCart);
    }
  }, [stateCart.cancelStock.data, stateCart.buyerAddress.data]);

  /** => after success fetch getCart, save data to redux */
  useEffect(() => {
    if (
      stateCart.get.data !== null &&
      stateCart.get.data.sellers.length > 0 &&
      stateCart.buyerAddress.data !== null
    ) {
      cartMasterAction.setCartMaster(stateCart.get.data);
      errorModal.setRetryCount(3);
      checkProductAction.fetch(dispatchCart);
      checkSellerAction.fetch(dispatchCart);
      checkStockAction.fetch(dispatchCart, false);
    } else if (
      stateCart.get.data !== null &&
      stateCart.get.data.sellers.length === 0
    ) {
      setLocalCartMaster(cloneDeep(cartMasterAction.cartMaster));
      setPageLoading(false);
    }
  }, [stateCart.get.data, stateCart.buyerAddress.data]);

  /** => if get cart failed */
  useEffect(() => {
    if (stateCart.get.error !== null) {
      const action = () => {
        if (errorModal.retryCount > 0) {
          getCartAction.fetch(dispatchCart);
          errorModal.setRetryCount(errorModal.retryCount - 1);
        } else {
          handleGoBack();
        }
      };
      errorModal.setRetryAction(() => action);
      errorModal.setCloseAction(() => handleGoBack);
      errorModal.setErrorData(stateCart.get.error);
      errorModal.setOpen(true);
    }
  }, [stateCart.get.error]);

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
      // determine the retry action
      const action = () => {
        if (errorModal.retryCount > 0) {
          if (isErrorCheckProduct) {
            checkProductAction.fetch(dispatchCart);
          }
          if (isErrorCheckSeller) {
            checkSellerAction.fetch(dispatchCart);
          }
          if (isErrorCheckStock) {
            checkStockAction.fetch(dispatchCart, false);
          }
          // decrease the retry count
          errorModal.setRetryCount(errorModal.retryCount - 1);
        } else {
          handleGoBack();
        }
      };
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
        errorModal.setRetryAction(() => action);
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
      cartMasterAction.cartMaster.id !== '' &&
      cartMasterAction.cartMaster.isCheckProductMerged === false
    ) {
      cartMasterAction.mergeCheckProduct(stateCart.checkProduct.data);
      cartMasterAction.mergeCheckSeller(stateCart.checkSeller.data);
      cartMasterAction.mergeCheckStock(stateCart.checkStock.data);
    }
  }, [
    cartMasterAction.cartMaster.id,
    stateCart.checkProduct.data,
    stateCart.checkSeller.data,
    stateCart.checkStock.data,
  ]);

  /** => after success merge all check data to redux, save redux to local state */
  useEffect(() => {
    if (
      cartMasterAction.cartMaster.isCheckProductMerged &&
      cartMasterAction.cartMaster.isCheckSellerMerged &&
      cartMasterAction.cartMaster.isCheckStockMerged
    ) {
      setLocalCartMaster(cloneDeep(cartMasterAction.cartMaster));
      setPageLoading(false);
    }
  }, [cartMasterAction.cartMaster]);

  /** => listen remove product fetch */
  useEffect(() => {
    /** success */
    if (stateCart.remove.data !== null && selectRemoveProduct !== null) {
      removeProduct(selectRemoveProduct);
      cartMasterAction.removeProduct(selectRemoveProduct);
      totalCartActions.fetch(dispatchCart);
      SnbToast.show('Produk berhasil dihapus dari keranjang', 2000, {
        position: 'top',
        positionValue: StatusBar.currentHeight,
      });
      setModalRemoveProduct(false);
    }
    /** error */
    if (stateCart.remove.error !== null) {
      SnbToast.show('Produk gagal dihapus dari keranjang', 2000, {
        position: 'top',
        positionValue: StatusBar.currentHeight,
      });
      setModalRemoveProduct(false);
    }
  }, [stateCart.remove]);

  console.log(cartMasterAction.cartMaster, localCartMaster);

  /** === VIEW === */
  /** => CONTENT */
  const renderContent = () => {
    if (localCartMaster) {
      const isCartEmpty =
        (!isAnyActiveProduct() && localCartMaster.unavailable.length === 0) ||
        stateCart.get.error?.code === 40010000009;
      if (!isCartEmpty) {
        return (
          <React.Fragment>
            <ScrollView>
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
                />
              </View>
            </ScrollView>
            <ShoppingCartFooter
              cartData={localCartMaster}
              countTotalProduct={countTotalProduct}
              countTotalPrice={countTotalPrice}
              isCheckoutDisabled={
                !isAnyActiveProduct() || countTotalPrice < 100000
              }
              handleCartCycle={handleCartCyle}
            />
          </React.Fragment>
        );
      } else {
        return <ShoppingCartEmpty navigationParent={navigation} />;
      }
    }
  };
  /** => MAIN */
  return (
    <SnbContainer color="grey">
      <ShoppingCartHeader goBack={handleGoBack} />
      {!pageLoading ? renderContent() : <LoadingPage />}
      {/* Dialog Remove Product */}
      <ModalRemoveProduct
        isOpen={modalRemoveProduct}
        okAction={() => handleOkActionRemoveProduct()}
        cancelAction={() => setModalRemoveProduct(false)}
      />
      {/* Error Modal Check Product, Seller & Stock */}
      <BottomSheetError
        open={errorModal.isOpen}
        error={errorModal.errorData}
        retryAction={() => {
          errorModal.retryAction();
          errorModal.setOpen(false);
        }}
        closeAction={() => {
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
