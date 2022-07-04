import React, { memo, useEffect, useMemo } from 'react';
import BottomSheetError from '@core/components/BottomSheetError';
import {
  useProductListContext,
  useProductListFunction,
} from './function/product-list.function';

const Main = () => {
  // hooks
  const { state, trigerModal } = useProductListContext();
  const { errorStock, onReset } = useProductListFunction();
  // variable
  const visibleModal = useMemo(
    () => state.modal.errorStock,
    [state.modal.errorStock],
  );
  const errorCode = useMemo(() => errorStock?.code, [errorStock?.code]);

  // show error stock when have error
  // the error is after open add to cart, need close add to cart frist
  useEffect(() => {
    if (errorCode) {
      trigerModal('addToCart', false);
      setTimeout(() => trigerModal('errorStock', true), 500);
    }
  }, [errorCode]);

  return (
    <BottomSheetError
      open={visibleModal}
      error={errorStock}
      closeAction={() => {
        trigerModal('errorStock', false);
        onReset();
      }}
      retryAction={() => {
        trigerModal('errorStock', false);
        onReset();
        // handleCloseModal(true);
        // setModalErrorStock(false);
      }}
    />
  );
};

export const ModalErrorStockView = memo(Main);
