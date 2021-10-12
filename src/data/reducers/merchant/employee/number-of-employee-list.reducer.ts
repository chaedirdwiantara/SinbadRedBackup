/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type NumberOfEmployeeListInitialProps = models.ListItemProps<
  models.NumberOfEmployeeList[]
>;
/** === INITIAL STATE HERE === */
export const numberOfEmployeeListInitialState: NumberOfEmployeeListInitialProps =
  {
    data: [],
    error: null,
    loading: false,
    loadMore: false,
    refresh: false,
    total: 0,
    skip: 0,
  };
/** === FUNCTION HERE === */
export const numberOfEmployeeListReducer = simplifyReducer(
  numberOfEmployeeListInitialState,
  {
    /** ===> LIST */
    /** => list process */
    [types.NUMBER_OF_EMPLOYEE_LIST_PROCESS](
      state = numberOfEmployeeListInitialState,
      action: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: action.payload.loading,
        error: null,
      };
    },
    /** => list success */
    [types.NUMBER_OF_EMPLOYEE_LIST_SUCCESS](
      state = numberOfEmployeeListInitialState,
      action: models.ListSuccessAction<models.SupplierList[]>,
    ) {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        loading: false,
      };
    },
    /** => list failed */
    [types.NUMBER_OF_EMPLOYEE_LIST_FAILED](
      state = numberOfEmployeeListInitialState,
      action: models.ListFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => list reset */
    [types.SUPPLIER_LIST_RESET]() {
      return numberOfEmployeeListInitialState;
    },
  },
);
