import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE: models.IMerchantData = {
  urbanId: null,
  topSellingBrand: '',
  mostWantedBrand: '',
  vehicleAccessibilityId: null,
  name: '',
  address: '',
  noteAddress: '',
  longitude: null,
  latitude: null,
  largeArea: '',
  imageUrl: '',
  numberOfEmployee: '',
  vehicleAccessibilityAmount: null,
  user: {
    name: '',
    mobilePhone: '',
    email: '',
    idNo: '',
    taxNo: '',
    taxImageUrl: '',
    idImageUrl: '',
    selfieImageUrl: '',
  },
};

export const merchantData = simplifyReducer(INITIAL_STATE, {
  [types.SAVE_STORE_DATA](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.IMerchantData>,
  ) {
    return {
      ...state,
      user: {
        ...state.user,
      },
      ...action.payload,
    };
  },

  [types.SAVE_USER_DATA](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.User>,
  ) {
    return {
      ...state,
      user: {
        ...state.user,
        ...action.payload,
      },
    };
  },

  [types.RESET_MERCHANT_DATA]() {
    return INITIAL_STATE;
  },
});
