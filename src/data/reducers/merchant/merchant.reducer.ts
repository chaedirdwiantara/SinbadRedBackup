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
import {
  changeEmailReducer,
  changeEmailInitialState,
} from './change-email.reducer';
import {
  verificationEmailReducer,
  verificationEmailInitialState,
} from './verification-email.reducer';
import {
  changeMobilePhoneReducer,
  changeMobilePhoneInitialState,
} from './change-mobile-phone.reducer';
import {
  verificationMobilePhoneReducer,
  verificationMobilePhoneInitialState,
} from './verification-mobile-phone.reducer';
import {
  changeBankAccountReducer,
  changeBankAccountInitialState,
} from './change-bank-account.reducer';
import {
  verificationBankAccountReducer,
  verificationBankAccountInitialState,
} from './verification-bank-account.reducer';

/** === TYPE HERE === */
// export type MerchantInitialProps = models.ListProps<models.SupplierList[]>;
// export type ProfileEditInitialProps = models.UpdateProps;
/** === INITIAL HERE === */
export const supplierInitialState = {
  list: supplierListInitialState,
  merchantEdit: merchantEditInitialState,
  profileEdit: profileEditInitialState,
  changeEmail: changeEmailInitialState,
  verificationEmail: verificationEmailInitialState,
  changeMobilePhone: changeMobilePhoneInitialState,
  verificationMobilePhone: verificationMobilePhoneInitialState,
  changeBankAccount: changeBankAccountInitialState,
  verificationBankAccount: verificationBankAccountInitialState,
};
/** === EXPORT ALL HERE === */
export const merchantReducer = (
  {
    list,
    merchantEdit,
    profileEdit,
    changeEmail,
    verificationEmail,
    changeMobilePhone,
    verificationMobilePhone,
    changeBankAccount,
    verificationBankAccount,
  }: any,
  action: any,
) => ({
  list: supplierListReducer(list, action),
  merchantEdit: merchantEditReducer(merchantEdit, action),
  profileEdit: profileEditReducer(profileEdit, action),
  changeEmail: changeEmailReducer(changeEmail, action),
  verificationEmail: verificationEmailReducer(verificationEmail, action),
  changeMobilePhone: changeMobilePhoneReducer(changeMobilePhone, action),
  verificationMobilePhone: verificationMobilePhoneReducer(
    verificationMobilePhone,
    action,
  ),
  changeBankAccount: changeBankAccountReducer(changeBankAccount, action),
  verificationBankAccount: verificationBankAccountReducer(
    verificationBankAccount,
    action,
  ),
});
