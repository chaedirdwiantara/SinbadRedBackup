/** === IMPORT INTERNAL === */
import * as models from '@models';
import {
  supplierSegmentationInitialState,
  SupplierSegmentationInitialProps,
  supplierSegmentationReducer,
} from './supplier-segmentation.reducer';
import {
  sendDataToSupplierInitialState,
  SendDataToSupplierInitialProps,
  sendDataToSupplierReducer,
} from './send-data-to-supplier.reducer';
/** === TYPES === */
export type SupplierInitialProps = models.SupplierSegmentationProps &
  models.CreateProps;

export interface SupplierState {
  segmentation: SupplierSegmentationInitialProps;
  create: SendDataToSupplierInitialProps;
}
/** === INITIAL STATE */
export const supplierInitialState = {
  segmentation: supplierSegmentationInitialState,
  create: sendDataToSupplierInitialState,
};
/** === REDUCER === */
export const supplierReducer = (
  { segmentation, create }: SupplierState,
  action: any,
) => ({
  segmentation: supplierSegmentationReducer(segmentation, action),
  create: sendDataToSupplierReducer(create, action),
});
