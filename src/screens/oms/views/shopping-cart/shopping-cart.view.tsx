/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
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
} from '../../functions';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT OTHER HERE === */
import { contexts } from '@contexts';
import * as models from '@models';
/** === DUMMIES === */
/** === COMPONENT === */
const OmsShoppingCartView: FC = () => {
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

  /** === HOOKS === */
  /** => did mount & will unmount */
  useEffect(() => {
    if (stateCart.get.data === null) {
      /** did mount */
      getCartAction.fetch(dispatchCart);
      errorModal.setRetryCount(3);
      checkProductAction.fetch(dispatchCart);
      checkSellerAction.fetch(dispatchCart);
      checkStockAction.fetch(dispatchCart, false);
    }
    /** will unmount */
    return () => {
      checkProductAction.reset(dispatchCart);
      checkSellerAction.reset(dispatchCart);
      checkStockAction.reset(dispatchCart);
      getCartAction.reset(dispatchCart);
      cartMasterAction.reset();
    };
  }, [stateCart.cancelStock.data]);

  /** => after success fetch getCart, save data to redux */
  useEffect(() => {
    if (stateCart.get.data !== null) {
      cartMasterAction.setCartMaster(stateCart.get.data);
    }
  }, [stateCart.get.data]);
  /** => if one of the check endpoint fail, show error retry */
  useEffect(() => {
    // wait all fetch done first
    if (
      !stateCart.checkProduct.loading &&
      !stateCart.checkSeller.loading &&
      !stateCart.checkStock.loading
    ) {
      // check which check endpoint fetch was fail
      const isErrorCheckProduct: boolean =
        stateCart.checkProduct.error !== null;
      const isErrorCheckSeller: boolean = stateCart.checkSeller.error !== null;
      const isErrorCheckStock: boolean = stateCart.checkStock.error !== null;
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
          goBack();
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
        errorModal.setErrorAction(() => action);
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
  /** => listen remove product fetch */
  useEffect(() => {
    /** success */
    if (stateCart.remove.data !== null && selectRemoveProduct !== null) {
      removeProduct(selectRemoveProduct);
      cartMasterAction.removeProduct(selectRemoveProduct);
      setModalRemoveProduct(false);
    }
    /** error */
    if (stateCart.remove.error !== null) {
      // error handle here
    }
  }, [stateCart.remove]);
  console.log(cartMasterAction.cartMaster, localCartMaster);
  /** === VIEW === */
  /** => CONTENT */
  const renderContent = () => {
    if (localCartMaster && localCartMaster.id !== '') {
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
            onPressCheckout={() => {}}
            countTotalProduct={countTotalProduct}
            countTotalPrice={countTotalPrice}
          />
        </React.Fragment>
      );
    }
  };
  /** => MAIN */
  return (
    <SnbContainer color="grey">
      <ShoppingCartHeader goBack={goBack} />
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
          errorModal.errorAction();
          errorModal.setOpen(false);
        }}
        closeAction={() => {
          // goBack();
          errorModal.errorAction();
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
