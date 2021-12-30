/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
import * as models from '@models';
import {
  useDataCartSelected,
  useDataCartMaster,
  useDataTotalProductCart,
  useDataProductMasterCart,
} from '@core/redux/Data';
/** === FUNCTIONS === */

export const useCartViewActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cartViewProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cartViewReset(contextDispatch));
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
      dispatch(Actions.cartUpdateReset(contextDispatch));
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
      dispatch(Actions.deleteItemProductMasterCart(data));
    },
    updateRouteName: (data: models.IUpdateRouteNamePayload) => {
      dispatch(Actions.updatePreviouseRouteCart(data));
    },
    reset: () => {
      dispatch(Actions.resetCartMasterData());
    },
  };
};

export const useCartCheckedoutActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (actions: any) => any) => {
      dispatch(Actions.cartCheckedoutProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cartCheckedoutReset(contextDispatch));
    },
  };
};

export const useInitialCartUpdateActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (actions: any) => any,
      data: models.CartUpdatePayload,
    ) => {
      dispatch(Actions.initialCartUpdateProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.initialCartUpdateReset(contextDispatch));
    },
  };
};

export const useProductMasterCartActions = () => {
  const dataCart: models.IProductMaster = useDataProductMasterCart();
  const dispatch = useDispatch();
  return {
    dataProductMasterCart: dataCart.data,
    setDataProductMasterCart: (data: Array<models.IProductItemUpdateCart>) => {
      dispatch(Actions.updateDataProductMasterCart(data));
    },
    setItemProductMasterCart: (data: models.IProductItemUpdateCart) => {
      dispatch(Actions.updateItemProductMasterCart(data));
    },
    setItemSelectedProductMasterCart: (
      data: models.IUpdateSelectedProductPayload,
    ) => {
      dispatch(Actions.updateItemSelectedProductMasterCart(data));
    },
  };
};
