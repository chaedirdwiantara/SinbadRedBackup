/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type SupplierSegmentationDetailInitialProps =
  models.DetailItemProps<models.SupplierSegmentation>;
/** === INITIAL STATE === */
export const supplierSegmentationDetailInitialState: SupplierSegmentationDetailInitialProps =
  {
    data: null,
    error: null,
    loading: false,
    refresh: false,
  };
/** === REDUCER === */
export const supplierSegmentationDetailReducer = simplifyReducer(
  supplierSegmentationDetailInitialState,
  {
    /** => Process */
    [types.SUPPLIER_SEGMENTATION2_PROCESS]() {
      return {
        ...supplierSegmentationDetailInitialState,
        loading: true,
      };
    },
    /** => Success */
    [types.SUPPLIER_SEGMENTATION2_SUCCESS](
      state = supplierSegmentationDetailInitialState,
      { payload }: models.DetailSuccessAction<models.SupplierSegmentation>,
    ) {
      return {
        ...state,
        data: payload,
        loading: false,
        error: null,
      };
    },
    /** Failed */
    [types.SUPPLIER_SEGMENTATION2_FAILED](
      state = supplierSegmentationDetailInitialState,
      { payload }: models.DetailFailedAction,
    ) {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    },
    /** Refresh */
    [types.SUPPLIER_SEGMENTATION2_REFRESH]() {
      return {
        ...supplierSegmentationDetailInitialState,
        loading: true,
      };
    },
    /** => Reset */
    [types.SUPPLIER_SEGMENTATION2_RESET]() {
      return supplierSegmentationDetailInitialState;
    },
  },
);
