/** === IMPORT INTERNAL === */
import * as models from '@models';
import {
  supplierSegmentationInitialState,
  SupplierSegmentationInitialProps,
  supplierSegmentationReducer,
} from './supplier-segmentation.reducer';
/** === TYPES === */
export type SupplierInitialProps = models.SupplierSegmentationProps;

interface SupplierState {
  segmentation: SupplierSegmentationInitialProps;
}
/** === INITIAL STATE */
export const supplierInitialState = {
  segmentation: supplierSegmentationInitialState,
};
/** === REDUCER === */
export const supplierReducer = (
  { segmentation }: SupplierState,
  action: any,
) => ({
  segmentation: supplierSegmentationReducer(segmentation, action),
});
