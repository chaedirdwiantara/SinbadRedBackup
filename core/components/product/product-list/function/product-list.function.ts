import { useCallback, useContext } from 'react';
import {
  useProductDetailCartAction,
  useStockValidationAction,
} from '@screen/product/functions';
import { useAddToCartAction } from '@screen/oms/functions';
import { useGetTotalCartAction } from '@screen/oms/functions';
import { useProductListContext } from './product-list.util';

import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
import { useProductContext } from 'src/data/contexts/product';
import { contexts } from '@contexts';

import type * as models from '@models';
import useAddToCart from '@core/components/modal/add-to-cart/add-to-cart.function';

const useProductListFunction = () => {
  const { trigerModal, setSelectProduct, orderQty } = useProductListContext();
  const totalCartActions = useGetTotalCartAction();
  const productDetailActions = useProductDetailCartAction();
  const addToCartActions = useAddToCartAction();
  const stockValidationActions = useStockValidationAction();

  const {
    stateStock: {
      validation: { data: dataStock, error: errorStock },
    },
    dispatchStock,
  } = useStockContext();

  const {
    stateProduct: {
      list: {
        loading: productLoading,
        error: productError,
        loadMore: productLoadMore,
      },
      cart: { data: productDetailState, error: productDetailError },
    },
    dispatchProduct,
  } = useProductContext();

  const { isPriceGrosir, bulkPriceAterTax } = useAddToCart(orderQty, false);

  const { stateCart, dispatchCart } = useContext(contexts.CartContext);
  // reset state redux
  const onReset = useCallback(() => {
    setSelectProduct('');
    stockValidationActions.reset(dispatchStock);
    productDetailActions.reset(dispatchProduct);
  }, []);

  const onGetProductDetail = useCallback((id: string) => {
    productDetailActions.fetch(dispatchProduct, id);
  }, []);

  /** => action submit add to cart  */
  const onSubmitAddToCart = useCallback(() => {
    if (productDetailState === null || dataStock === null) {
      /** => DO SOMETHING */
      /** => SHOW MODAL ERROR SOMETHING WRONG OR RETRY  */
      return;
    }
    /** function to determine bulk price calculation */
    let lastUsedPrice = 0,
      isLastPriceUsedRules = false;
    if (isPriceGrosir) {
      isLastPriceUsedRules = true;
      lastUsedPrice = bulkPriceAterTax;
    } else {
      isLastPriceUsedRules = false;
      lastUsedPrice = productDetailState.priceAfterTax;
    }

    const priceRules = productDetailState.bulkPrices.map((item) => {
      return {
        minQty: item.qty,
        priceAfterTax: item.priceAfterTax,
        priceBeforeTax: item.priceBeforeTax,
        taxPrice: item.taxPrice,
      };
    });

    const params: models.AddToCartPayload = {
      productId: productDetailState.id,
      productName: productDetailState.name,
      categoryId: productDetailState.categoryId,
      productImageUrl: productDetailState?.images[0]?.url ?? '',
      minQty: productDetailState.minQty,
      qty: orderQty,
      multipleQty: productDetailState.multipleQty,
      qtyPerBox: productDetailState.packagedQty,
      uomLabel: productDetailState.unit,
      warehouseId: Number(productDetailState.warehouseOriginId),
      sellerId: Number(productDetailState.sellerId),
      sellerName: productDetailState.productSeller.name,
      taxPercentage: productDetailState.productTax.amount,
      lastUsedPrice,
      isLastPriceUsedRules,
      priceAfterTax: productDetailState.priceAfterTax,
      priceBeforeTax: productDetailState.priceBeforeTax,
      taxPrice: productDetailState.taxPrice,
      priceRules,
      selected: true,
    };
    addToCartActions.fetch(dispatchCart, params);
  }, [productDetailState, dataStock, bulkPriceAterTax, orderQty]);
  // function success add to cart
  const onSuccessAddToCart = useCallback(() => {
    trigerModal('addToCart', false);
    totalCartActions.fetch(dispatchCart);
  }, [dispatchCart, totalCartActions]);

  return {
    productDetailState,
    dataStock,
    stateCart,
    errorStock,
    productError,
    productLoading,
    productLoadMore,
    productDetailError,
    onReset,
    onGetProductDetail,
    onSubmitAddToCart,
    onSuccessAddToCart,
  };
};

export { useProductListFunction };
