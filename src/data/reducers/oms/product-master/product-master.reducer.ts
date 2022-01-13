/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.IProductMaster = {
  data: [],
};

/** === FUNCTION === */
export const productMasterCart = simplifyReducer(initialState, {
  /** => FOR SAVE DATA PRODUCT MASTER CART */
  [types.UPDATE_PRODUCT_MASTER_CART](
    state = initialState,
    action: models.UpdateDataProductMasterCart,
  ): models.IProductMaster {
    return {
      ...state,
      data: action.payload,
    };
  },
  /** => FOR SAVE DATA PRODUCT MASTER CART */
  [types.UPDATE_ITEM_PRODUCT_MASTER_CART](
    state = initialState,
    { payload }: models.UpdateItemProductMasterCart,
  ): models.IProductMaster {
    let result: Array<models.IProductItemUpdateCart> = [];
    const _data = [...state.data];
    const index = _data.findIndex(
      (item) => item.productId === payload.productId,
    );

    if (index >= 0) {
      _data[index] = payload;
      result = _data;
    } else {
      result = state.data;
    }

    return {
      ...state,
      data: result,
    };
  },
  /** =>  DELETE CART PRODUCT FLAG */
  [types.DELETE_CART_PRODUCT](
    state = initialState,
    { payload }: models.DeleteItemProductMasterCart,
  ): models.IProductMaster {
    const newProducts = state.data.filter(
      (product) => product.productId !== payload.productId,
    );

    return { ...state, data: newProducts };
  },
  /** => FOR SAVE ITEM SELECTED PRODUCT MASTER CART */
  [types.UPDATE_SELECTED_ITEM_PRODUCT](
    state = initialState,
    { payload }: models.UpdateItemSelectedProductMasterCart,
  ): models.IProductMaster {
    let result: Array<models.IProductItemUpdateCart> = [];
    const _data = [...state.data];
    const index = _data.findIndex(
      (item) => item.productId === payload.productId,
    );

    if (index >= 0) {
      _data[index] = { ..._data[index], selected: payload.selected };
      result = _data;
    } else {
      result = state.data;
    }

    return {
      ...state,
      data: result,
    };
  },
  /** => Reset cart master */
  [types.RESET_CART_MASTER_DATA]() {
    return initialState;
  },
});
