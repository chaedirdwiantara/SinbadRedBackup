import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
};

export const productCategories = simplifyReducer(INITIAL_STATE, {
  [types.PRODUCT_CATEGORY_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.PRODUCT_CATEGORY_SUCCESS](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.IProductCategoryData>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  },

  [types.PRODUCT_CATEGORY_FAILED](
    state = INITIAL_STATE,
    action: models.IRegisterAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.PRODUCT_CATEGORY_RESET]() {
    return INITIAL_STATE;
  },
});
