/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
import * as models from '@models';
import {
  useDataCartSelected,
  useDataCartMaster,
  useDataTotalProductCart,
} from '@core/redux/Data';
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

export const useCartSelected = () => {
  const dataCart = useDataCartSelected();
  const dispatch = useDispatch();
  return {
    getCartSelected: dataCart,
    setCartSelected: (data: models.CartSelected) => {
      dispatch(Actions.updateCartSelected(data));
    },
  };
};

export const useCartTotalProductActions = () => {
  const dataTotalProductCart: models.CartTotalProductSuccess =
    useDataTotalProductCart().data;
  const dispatch = useDispatch();
  return {
    dataTotalProductCart: dataTotalProductCart,
    fetch: () => {
      dispatch(Actions.cartTotalProductProcess());
    },
    reset: () => {
      dispatch(Actions.cartTotalProductReset());
    },
  };
};

export const useCartMasterActions = () => {
  const dataCart: models.ICartMaster = useDataCartMaster();
  const dispatch = useDispatch();
  return {
    cartMaster: dataCart,
    setCartMaster: (data: models.ICartMaster) => {
      dispatch(Actions.updateCartMaster(data));
    },
    setCartMasterData: (data: models.CartInvoiceGroup[]) => {
      dispatch(Actions.updateCartMasterData(data));
    },
    deleteProduct: (data: models.ICartDeleteProductPayload) => {
      dispatch(Actions.deleteCartProduct(data));
    },
  };
};
