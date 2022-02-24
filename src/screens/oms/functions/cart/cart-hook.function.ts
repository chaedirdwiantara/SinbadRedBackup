/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { useDataCartMaster } from '@core/redux/Data';
import { HandleRemoveProduct } from '@models';
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
/** => remove cart product action */
const useRemoveCartProductAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.RemoveCartProductPayload,
    ) => {
      dispatch(Actions.removeCartProductProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.removeCartProductReset(contextDispatch));
    },
  };
};
/** => cart master action */
const useCartMasterAction = () => {
  const cartMaster: models.CartMaster = useDataCartMaster();
  const dispatch = useDispatch();
  return {
    cartMaster,
    setCartMaster: (data: models.SetCartMaster) => {
      dispatch(Actions.setCartMaster(data));
    },
    mergeCheckProduct: (data: models.CheckProductResponse[]) => {
      dispatch(Actions.mergeCheckProduct(data));
    },
    mergeCheckSeller: (data: models.CheckSellerResponse[]) => {
      dispatch(Actions.mergeCheckSeller(data));
    },
    mergeCheckStock: (data: models.CheckStockResponse[]) => {
      dispatch(Actions.mergeCheckStock(data));
    },
    removeProduct: (data: HandleRemoveProduct) => {
      dispatch(Actions.CartMasterRemoveProduct(data));
    },
    reset: () => {
      dispatch(Actions.resetCartMaster());
    },
  };
};
/** => check product action */
const useCheckProductAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.CheckProductPayload,
    ) => {
      dispatch(Actions.checkProductProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.checkProductReset(contextDispatch));
    },
  };
};
/** => post check product action */
const usePostCheckProductAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.CheckProductPayload,
    ) => {
      dispatch(Actions.postCheckProductProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.postCheckProductReset(contextDispatch));
    },
  };
};
/** => check seller action */
const useCheckSellerAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.CheckSellerPayload,
    ) => {
      dispatch(Actions.checkSellerProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.checkSellerReset(contextDispatch));
    },
  };
};
/** => post check seller action */
const usePostCheckSellerAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.CheckSellerPayload,
    ) => {
      dispatch(Actions.postCheckSellerProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.postCheckSellerReset(contextDispatch));
    },
  };
};
/** => check stock action */
const useCheckStockAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.CheckStockPayload,
    ) => {
      dispatch(Actions.checkStockProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.checkStockReset(contextDispatch));
    },
  };
};
/** => post check stock action */
const usePostCheckStockAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.CheckStockPayload,
    ) => {
      dispatch(Actions.postCheckStockProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.postCheckStockReset(contextDispatch));
    },
  };
};
/** => cancel stock action */
const useCancelStockAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cancelStockProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cancelStockReset(contextDispatch));
    },
  };
};
/** => cart buyer address action */
const useCartBuyerAddressAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cartBuyerAddressProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.cartBuyerAddressReset(contextDispatch));
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
  useRemoveCartProductAction,
  useCartMasterAction,
  useCheckProductAction,
  usePostCheckProductAction,
  useCheckSellerAction,
  usePostCheckSellerAction,
  useCheckStockAction,
  usePostCheckStockAction,
  useCancelStockAction,
  useCartBuyerAddressAction,
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
