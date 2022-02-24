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
  } = useCartLocalData();
  const [pageLoading, setPageLoading] = useState(true);
  const [modalRemoveProduct, setModalRemoveProduct] = useState(false);
  const [selectRemoveProduct, setSelectRemoveProduct] =
    useState<models.HandleRemoveProduct | null>(null);
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
    /** did mount */
    getCartAction.fetch(dispatchCart);
    checkProductAction.fetch(dispatchCart, {
      carts: [
        {
          productId: '53c9b0000000000000000000',
          warehouseId: 1,
        },
        {
          productId: '53c9b0000000000000000002',
          warehouseId: 2,
        },
      ],
    });
    checkSellerAction.fetch(dispatchCart, {
      sellerIds: [1, 2],
    });
    checkStockAction.fetch(dispatchCart, {
      cartId: 'qweqweqw',
      reserved: false,
      carts: [
        {
          productId: '53c9b0000000000000000000',
          warehouseId: 1,
        },
        {
          productId: '53c9b0000000000000000002',
          warehouseId: 1,
        },
      ],
    });
    /** will umount */
    return () => {
      checkProductAction.reset(dispatchCart);
      checkSellerAction.reset(dispatchCart);
      checkStockAction.reset(dispatchCart);
      getCartAction.reset(dispatchCart);
      cartMasterAction.reset();
    };
  }, []);
  /** => after success fetch getCart, save data to redux */
  useEffect(() => {
    if (stateCart.get.data !== null) {
      cartMasterAction.setCartMaster(stateCart.get.data);
    }
  }, [stateCart.get.data]);
  /** => after success fetch checkProduct, merge data to redux */
  useEffect(() => {
    if (
      stateCart.checkProduct.data !== null &&
      stateCart.checkSeller.data !== null &&
      stateCart.checkStock.data !== null &&
      cartMasterAction.cartMaster.id !== '' &&
      cartMasterAction.cartMaster.isCheckProductMerged === false
    ) {
      cartMasterAction.mergeCheckProduct(stateCart.checkProduct.data);
    }
  }, [
    cartMasterAction.cartMaster.id,
    stateCart.checkProduct.data,
    stateCart.checkSeller.data,
    stateCart.checkStock.data,
  ]);
  /** => after success fetch checkSeller, merge data to redux */
  useEffect(() => {
    if (
      stateCart.checkSeller.data !== null &&
      cartMasterAction.cartMaster.isCheckProductMerged
    ) {
      cartMasterAction.mergeCheckSeller(stateCart.checkSeller.data);
    }
  }, [
    cartMasterAction.cartMaster.isCheckProductMerged,
    stateCart.checkSeller.data,
  ]);
  /** => after success fetch checkStock, merge data to redux */
  useEffect(() => {
    if (
      stateCart.checkStock.data !== null &&
      cartMasterAction.cartMaster.isCheckSellerMerged
    ) {
      cartMasterAction.mergeCheckStock(stateCart.checkStock.data);
    }
  }, [
    cartMasterAction.cartMaster.isCheckSellerMerged,
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
            onPressCheckout={() => cartMasterAction.reset()}
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
      {/* MODAL */}
      <ModalRemoveProduct
        isOpen={modalRemoveProduct}
        okAction={() => handleOkActionRemoveProduct()}
        cancelAction={() => setModalRemoveProduct(false)}
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
