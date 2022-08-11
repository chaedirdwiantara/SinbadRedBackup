import React, { FC, memo, useEffect, useMemo } from 'react';
import BottomSheetError from '@core/components/BottomSheetError';
import { useProductListFunction } from './function/product-list.function';
import { useProductListContext } from './function/product-list.util';

type Props = {
  testID: string;
};

const Main: FC<Props> = ({ testID }) => {
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
      testID={'modal-error-stock.' + testID}
      open={visibleModal}
      // @ts-ignore
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

const ModalErrorStockView = memo(Main);

export default ModalErrorStockView;
