import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
};

export const buyerCategories = simplifyReducer(INITIAL_STATE, {
  [types.BUYER_CATEGORY_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.BUYER_CATEGORY_SUCCESS](
    state = INITIAL_STATE,
    action: models.IAction<models.IBuyerCategoryData>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  },

  [types.BUYER_CATEGORY_FAILED](
    state = INITIAL_STATE,
    action: models.IAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.BUYER_CATEGORY_RESET]() {
    return INITIAL_STATE;
  },
});
