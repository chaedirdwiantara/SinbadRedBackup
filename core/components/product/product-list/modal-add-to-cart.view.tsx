import React, { memo, useCallback, useMemo, useEffect } from 'react';
import { View, Text } from 'react-native';
import { AddToCartModal } from '@core/components/modal';

// function
import {
  useOrderQuantity,
  useStockValidationAction,
} from '@screen/product/functions';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
import useAddToCart from '@core/components/modal/add-to-cart/add-to-cart.function';
import { useProductListContext, useProductListFunction } from './';

const App = () => {
  const { state, trigerModal } = useProductListContext();
  const {
    // function
    onReset,
    onSubmitAddToCart,
    // variable
    dataStock,
    productDetailState: productDetail,
  } = useProductListFunction();
  const { loadingProduct } = useAddToCart(1, false);

  const stockValidationActions = useStockValidationAction();
  const { dispatchStock } = useStockContext();

  const { orderQty, onChangeQty } = useOrderQuantity({
    minQty: productDetail?.minQty ?? 1,
  });

  // Var
  const modalVisible = useMemo(
    () => state.modal.addToCart,
    [state.modal.addToCart],
  );
  /** => action on change qty */
  const onHandleChangeQty = useCallback(
    (value: number) => {
      if (!dataStock || !productDetail) {
        return;
      }
      onChangeQty(value);
    },
    [dataStock, productDetail, onChangeQty],
  );
  // close modal with reset context redux
  const onCloseModal = useCallback(() => {
    trigerModal('addToCart', false);
    onReset();
  }, []);
  // submit add to cart
  const onAddToCartPress = useCallback(() => {
    onSubmitAddToCart();
  }, [onSubmitAddToCart]);
  // state effetct
  // trigger when success get product detail
  useEffect(() => {
    if (productDetail) {
      onChangeQty(productDetail.minQty);
      stockValidationActions.fetch(dispatchStock, {
        warehouseId: Number(productDetail.warehouseOriginId) ?? null,
        productId: productDetail.id,
      });
    }
  }, [productDetail]);

  return (
    <AddToCartModal
      orderQty={orderQty}
      onChangeQty={onHandleChangeQty}
      open={modalVisible}
      onBlur={onCloseModal}
      closeAction={onCloseModal}
      onAddToCartPress={onAddToCartPress}
      loading={loadingProduct}
      disabled={
        productDetail === null ||
        dataStock === null ||
        orderQty > dataStock.stock ||
        orderQty < productDetail?.minQty ||
        productDetail.minQty > dataStock.stock
      }
    />
  );
};

export const ModalAddToCartView = memo(App);
