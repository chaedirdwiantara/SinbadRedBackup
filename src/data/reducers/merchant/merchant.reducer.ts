/** === IMPORT HERE === */
import * as models from '@models';
import {
  supplierListReducer,
  supplierListInitialState,
} from './merchant-list.reducer';
/** === TYPE HERE === */
export type MerchantInitialProps = models.ListProps<models.SupplierList[]>;
/** === INITIAL HERE === */
export const supplierInitialState = {
  list: supplierListInitialState,
};
/** === EXPORT ALL HERE === */
export const merchantReducer = ({ list }: any, action: any) => ({
  list: supplierListReducer(list, action),
});
