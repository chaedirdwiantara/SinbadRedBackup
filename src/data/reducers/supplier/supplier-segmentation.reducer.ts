/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type SupplierSegmentationInitialProps =
  models.DetailItemProps<models.SupplierSegmentation>;
/** === INITIAL STATE === */
export const supplierSegmentationInitialState: SupplierSegmentationInitialProps =
  {
    data: null,
    error: null,
    loading: false,
    refresh: false,
  };
/** === REDUCER === */
export const supplierSegmentationReducer = simplifyReducer(
  supplierSegmentationInitialState,
  {
    /** => Process */
    [types.SUPPLIER_SEGMENTATION_PROCESS]() {
      return {
        ...supplierSegmentationInitialState,
        loading: true,
      };
    },
    /** => Success */
    [types.SUPPLIER_SEGMENTATION_SUCCESS](
      state = supplierSegmentationInitialState,
      action: models.DetailSuccessAction<models.SupplierSegmentation>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** Failed */
    [types.SUPPLIER_SEGMENTATION_FAILED](
      state = supplierSegmentationInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },
    /** Refresh */
    [types.SUPPLIER_SEGMENTATION_REFRESH]() {
      return {
        ...supplierSegmentationInitialState,
        loading: true,
      };
    },
    /** => Reset */
    [types.SUPPLIER_SEGMENTATION_RESET]() {
      return supplierSegmentationInitialState;
    },
  },
);
