import React, { FC, memo, useEffect, useMemo, useContext } from 'react';
import BottomSheetError from '@core/components/BottomSheetError';
import { useProductListFunction } from './function/product-list.function';
import { useProductListContext } from './function/product-list.util';
import { useIsFocused } from '@react-navigation/native';
import { useAddToCartAction } from '@screen/oms/functions';
import { contexts } from '@contexts';

type Props = {
  testID: string;
};

const Main: FC<Props> = ({ testID }) => {
  // hooks
  const { state, trigerModal } = useProductListContext();
  const { stateCart, onReset } = useProductListFunction();
  const addToCartActions = useAddToCartAction();
  const isFocused = useIsFocused();
  const { dispatchCart } = useContext(contexts.CartContext);
  // variable
  const visibleModal = useMemo(
    () => state.modal.errorAddToCart,
    [state.modal.errorAddToCart],
  );
  const errorCode = useMemo(
    () => stateCart.create.error?.code,
    [stateCart.create.error?.code],
  );

  // show error stock when have error
  // the error is after open add to cart, need close add to cart frist
  useEffect(() => {
    if (errorCode && isFocused) {
      trigerModal('addToCart', false);
      setTimeout(() => trigerModal('errorAddToCart', true), 500);
    }
  }, [errorCode]);

  return (
    <BottomSheetError
      testID={'modal-error-add-to-cart.' + testID}
      open={visibleModal}
      // @ts-ignore
      error={stateCart.create.error}
      closeAction={() => {
        trigerModal('errorAddToCart', false);
        addToCartActions.reset(dispatchCart);
        onReset();
      }}
      retryAction={() => {
        trigerModal('errorAddToCart', false);
        addToCartActions.reset(dispatchCart);
        onReset();
      }}
    />
  );
};

const ModalErrorStockView = memo(Main);

export default ModalErrorStockView;
