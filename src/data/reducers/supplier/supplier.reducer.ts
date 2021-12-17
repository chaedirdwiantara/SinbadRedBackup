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
import {
  supplierSegmentationDetailInitialState,
  supplierSegmentationDetailReducer,
  SupplierSegmentationDetailInitialProps,
} from './supplier-segmentation-detail.reducer';
import {
  registerSupplierInitialState,
  registerSupplierReducer,
  RegisterSupplierInitialProps,
} from './register-supplier.reducer';
export interface SupplierState {
  segmentation: SupplierSegmentationInitialProps;
  detail: SupplierSegmentationDetailInitialProps;
  create: SendDataToSupplierInitialProps;
  register: RegisterSupplierInitialProps;
}
/** === INITIAL STATE */
export const supplierInitialState = {
  segmentation: supplierSegmentationInitialState,
  create: sendDataToSupplierInitialState,
  detail: supplierSegmentationDetailInitialState,
  register: registerSupplierInitialState,
};
/** === REDUCER === */
export const supplierReducer = (
  { segmentation, create, detail, register }: SupplierState,
  action: any,
) => ({
  segmentation: supplierSegmentationReducer(segmentation, action),
  create: sendDataToSupplierReducer(create, action),
  detail: supplierSegmentationDetailReducer(detail, action),
  register: registerSupplierReducer(register, action),
});
