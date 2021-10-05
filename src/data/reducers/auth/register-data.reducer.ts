import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE: models.IRegisterMerchantProcess = {
  urbanId: 0,
  topSellingBrand: '',
  mostWantedBrand: '',
  vehicleAccessibilityId: null,
  name: '',
  address: '',
  noteAddress: '',
  taxNo: '',
  longitude: null,
  latitude: null,
  largeArea: '',
  phoneNo: '',
  imageUrl: '',
  taxImageUrl: '',
  numberOfEmployee: '',
  vehicleAccessibilityAmount: null,
  user: {
    name: '',
    mobilePhone: '',
    email: '',
    username: '',
    idNo: '',
    taxNo: '',
    imageUrl: '',
    taxImageUrl: '',
    idImageUrl: '',
    selfieImageUrl: '',
  },
};

export const registerData = simplifyReducer(INITIAL_STATE, {
  [types.SAVE_REGISTER_STORE_DATA](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.IRegisterMerchantProcess>,
  ) {
    return {
      ...state,
      user: {
        ...state.user,
      },
      ...action.payload,
    };
  },

  [types.SAVE_REGISTER_USER_DATA](
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

  [types.RESET_REGISTER_DATA]() {
    return INITIAL_STATE;
  },
});
