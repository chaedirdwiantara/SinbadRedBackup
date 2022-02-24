/** === IMPORT PACKAGE HERE ===  */
import {
  matchCartWithCheckData,
  useCancelStockAction,
  useCartMasterAction,
  usePostCheckProductAction,
  usePostCheckSellerAction,
  usePostCheckStockAction,
  useUpdateCartAction,
} from '@screen/oms/functions';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SnbText, SnbButton, color } from 'react-native-sinbad-ui';
import ShoppingCartValidation from './shopping-cart-validation.view';
/** === IMPORT OTHER HERE === */
import { contexts } from '@contexts';
import BottomSheetError from '@core/components/BottomSheetError';
import { ShoppingCartStyles } from '@screen/oms/styles';

/** === INTERFACE === */
interface FooterProps {
  onPressCheckout: () => void;
}
/** === COMPONENT ===  */
const ShoppingCartFooterMemo: FC<FooterProps> = ({ onPressCheckout }) => {
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const [isErrorShown, setErrorShown] = useState(false);
  const [isRetryShown, setRetryShown] = useState(false);
  const [retryCounter, setRetryCounter] = useState(0);

  const updateCartAction = useUpdateCartAction();
  const cancelCartAction = useCancelStockAction();
  const cartMasterAction = useCartMasterAction();
  const postCheckProductAction = usePostCheckProductAction();
  const postCheckSellerAction = usePostCheckSellerAction();
  const postCheckStockAction = usePostCheckStockAction();

  const handleOnPressCheckout = () => {
    onPressCheckout();
    updateCartAction.fetch(dispatchCart, {
      id: cartMasterAction.cartMaster.id,
      carts: cartMasterAction.cartMaster.sellers,
    });
  };

  const checkProductSellerStock = useCallback(() => {
    if (stateCart.update.data !== null) {
      /** Get available product(s) from .sellers, then filter it based on the selected one */
      const carts =
        cartMasterAction.cartMaster.sellers.flatMap((seller) =>
          seller.products
            .filter((product) => !!product.selected)
            .map((product) => ({
              productId: product.productId,
              warehouseId: product.warehouseId,
            })),
        ) ?? [];

      /** Form an array of sellerId(s) */
      const sellerIds =
        cartMasterAction.cartMaster.sellers.map((seller) => seller.sellerId) ??
        [];

      /** Input product(s) that's been selected and available as payload */
      postCheckProductAction.fetch(dispatchCart, {
        carts,
      });
      postCheckSellerAction.fetch(dispatchCart, {
        sellerIds,
      });
      postCheckStockAction.fetch(dispatchCart, {
        cartId: cartMasterAction.cartMaster.id,
        reserved: true,
        carts,
      });
    }
    return () => {
      postCheckProductAction.reset(dispatchCart);
      postCheckSellerAction.reset(dispatchCart);
      postCheckStockAction.reset(dispatchCart);
    };
  }, [stateCart.update.data]);

  useEffect(() => {
    checkProductSellerStock();
  }, [checkProductSellerStock]);

  useEffect(() => {
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
  }, [
    stateCart.postCheckProduct.data,
    stateCart.postCheckSeller.data,
    stateCart.postCheckStock.data,
  ]);

  useEffect(() => {
    /** Show (Global) error, if and only if one or more of these endpoints got an error response */
    if (
      stateCart.postCheckProduct.error ||
      stateCart.postCheckSeller.error ||
      stateCart.postCheckStock.error
    ) {
      setRetryShown(true);
    }
  }, [
    stateCart.postCheckProduct.error,
    stateCart.postCheckSeller.error,
    stateCart.postCheckStock.error,
  ]);

  useEffect(() => {
    if (stateCart.cancelStock.data) {
      cartMasterAction.mergeCheckProduct(stateCart.postCheckProduct.data ?? []);
      cartMasterAction.mergeCheckSeller(stateCart.postCheckSeller.data ?? []);
      cartMasterAction.mergeCheckStock(stateCart.postCheckStock.data ?? []);
    }
    return () => {
      cartMasterAction.reset();
    };
  }, [stateCart.cancelStock.data]);

  const handleRetry = () => {
    if (retryCounter < 3) {
      checkProductSellerStock();
      setRetryCounter((prev) => prev + 1);
    } else {
      setRetryShown(false);
    }
  };

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
          <SnbText.H4 color={color.red50}>Rp0</SnbText.H4>
        </View>
        <SnbText.B4 color={color.black60}>0 barang dipilih</SnbText.B4>
      </View>
      <View>
        <SnbButton.Dynamic
          title="Checkout"
          type="primary"
          onPress={handleOnPressCheckout}
          size={'large'}
        />
      </View>
    </View>
  );

  const renderBusinessErrorModal = () => (
    <ShoppingCartValidation open={isErrorShown} closeAction={handleClose} />
  );

  const renderGlobalErrorModal = () => (
    <BottomSheetError
      open={isRetryShown}
      error={{
        message: "There's an issue in our service",
        errorMessage: 'Error',
        type: '',
        code: retryCounter < 3 ? 12340378910 : 12340078910,
      }}
      retryAction={handleRetry}
    />
  );

  return (
    <View style={ShoppingCartStyles.footerContainer}>
      {renderFooterContent()}
      {renderBusinessErrorModal()}
      {renderGlobalErrorModal()}
    </View>
  );
};

export const ShoppingCartFooter = React.memo(ShoppingCartFooterMemo);
