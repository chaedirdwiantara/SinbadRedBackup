import React, { FC, memo, useCallback, useEffect, useMemo } from 'react';
import BottomSheetError from '@core/components/BottomSheetError';
import {
  useProductListContext,
  useProductListFunction,
} from './function/product-list.function';

type Props = {
  testID: string;
};

const Main: FC<Props> = ({ testID }) => {
  // hooks
  const { state, trigerModal } = useProductListContext();
  const { productDetailError, onReset, onGetProductDetail } =
    useProductListFunction();
  // variable
  const visibleModal = useMemo(
    () => state.modal.errorProduct,
    [state.modal.errorProduct],
  );
  const errorCode = useMemo(
    () => productDetailError?.code,
    [productDetailError?.code],
  );
  const productSelected = useMemo(
    () => state.productSelected,
    [state.productSelected],
  );

  // function
  const onRetry = useCallback(() => {
    if (productSelected) {
      trigerModal('addToCart', false);
      setTimeout(() => onGetProductDetail(productSelected), 500);
    } else {
      trigerModal('addToCart', false);
    }
  }, [productSelected]);

  // state effect
  useEffect(() => {
    if (errorCode) {
      trigerModal('addToCart', false);
      setTimeout(() => trigerModal('errorProduct', true), 500);
    }
  }, [errorCode]);

  return (
    <BottomSheetError
      testID={'modal-error-product-detail.' + testID}
      open={visibleModal}
      error={productDetailError}
      closeAction={() => {
        onReset();
        trigerModal('errorProduct', false);
      }}
      retryAction={onRetry}
    />
  );
};

export const ModalErrorProductDetailView = memo(Main);
