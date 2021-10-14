/** === IMPORT HERE === */
// import * as models from '@models';
import {
  supplierListReducer,
  supplierListInitialState,
} from './merchant-list.reducer';
import {
  merchantEditReducer,
  merchantEditInitialState,
} from './merchant-edit.reducer';
import {
  profileEditReducer,
  profileEditInitialState,
} from './profile-edit.reducer';
/** === TYPE HERE === */
// export type MerchantInitialProps = models.ListProps<models.SupplierList[]>;
// export type ProfileEditInitialProps = models.UpdateProps;
/** === INITIAL HERE === */
export const supplierInitialState = {
  list: supplierListInitialState,
  merchantEdit: merchantEditInitialState,
  profileEdit: profileEditInitialState,
};
/** === EXPORT ALL HERE === */
export const merchantReducer = (
  { list, merchantEdit, profileEdit }: any,
  action: any,
) => ({
  list: supplierListReducer(list, action),
  merchantEdit: merchantEditReducer(merchantEdit, action),
  profileEdit: profileEditReducer(profileEdit, action),
});
