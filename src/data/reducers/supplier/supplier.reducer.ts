/** === IMPORT INTERNAL === */
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
