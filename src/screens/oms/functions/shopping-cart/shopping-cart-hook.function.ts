/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTIONS === */

export const useCartViewActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cartViewProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.cartViewReset);
    },
  };
};

export const useAddToCartActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (actions: any) => any,
      data: models.AddToCartPayload,
    ) => {
      dispatch(Actions.addToCartProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.addToCartReset);
    },
  };
};

export const useCartUpdateActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (actions: any) => any,
      data: models.CartUpdatePayload,
    ) => {
      dispatch(Actions.cartUpdateProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.cartUpdateReset);
    },
  };
};
