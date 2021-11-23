/** === IMPORT HERE === */
// import * as models from '@models';
import {
    paymentTypesListReducer,
    paymentTypesListInitialState
} from './payment-types-list.reducer';
  
  /** === TYPE HERE === */
  // export type MerchantInitialProps = models.ListProps<models.SupplierList[]>;
  // export type ProfileEditInitialProps = models.UpdateProps;
  /** === INITIAL HERE === */
  export const paymentInitialState = {
    paymentTypesList: paymentTypesListInitialState,
  };
  /** === EXPORT ALL HERE === */
  export const paymentReducer = (
    {
      paymentTypesList,
    }: any,
    action: any,
  ) => ({
    paymentTypesList: paymentTypesListReducer(paymentTypesList, action),
  });
  