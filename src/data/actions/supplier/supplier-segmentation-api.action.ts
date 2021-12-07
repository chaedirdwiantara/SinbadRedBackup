/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** Process */
export const supplierSegmentationProcess = (
  contextDispatch: (action: any) => any,
  payload: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types.SUPPLIER_SEGMENTATION_PROCESS, payload });

  return {
    type: types.SUPPLIER_SEGMENTATION_PROCESS,
    payload,
    contextDispatch,
  };
};
/** Succeeded */
export const supplierSegmentationSuccess = (
  payload: models.DetailSuccessProps<models.SupplierSegmentation>,
): models.DetailSuccessAction<models.SupplierSegmentation> => {
  return { type: types.SUPPLIER_SEGMENTATION_SUCCESS, payload };
};
/** => Failed */
export const supplierSegmentationFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.SUPPLIER_SEGMENTATION_FAILED, payload };
};
/** => Refresh */
export const supplierSegmentationRefresh = () => {
  return { type: types.SUPPLIER_SEGMENTATION_REFRESH };
};
/** => Reset */
export const supplierSegmentationReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.SUPPLIER_SEGMENTATION_RESET });
  return { type: types.SUPPLIER_SEGMENTATION_RESET };
};
