/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTION === */
/** => cart example action */
const useCartExampleAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cartExampleProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cartExampleReset(contextDispatch));
    },
  };
};
/** => get cart action */
const useGetCartAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.getCartProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.getCartReset(contextDispatch));
    },
  };
};

const useGetTotalCartAction = () => {
  const dispatch = useDispatch();

  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.getTotalCartProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.getTotalCartReset(contextDispatch));
    },
  };
};
/** => add to cart action */
const useAddToCartAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.AddToCartPayload,
    ) => {
      dispatch(Actions.addToCartProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.addToCartReset(contextDispatch));
    },
  };
};
/** => update cart action */
const useUpdateCartAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.UpdateCartPayload,
    ) => {
      dispatch(Actions.updateCartProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.updateCartReset(contextDispatch));
    },
  };
};
/** => checkout action */
const useCheckoutAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.CheckoutPayload,
    ) => {
      dispatch(Actions.checkoutProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.checkoutReset(contextDispatch));
    },
  };
};
/** === EXPORT === */
export {
  useCartExampleAction,
  useGetCartAction,
  useGetTotalCartAction,
  useAddToCartAction,
  useUpdateCartAction,
  useCheckoutAction,
};
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ryan (team)
 * createDate: 15092021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
