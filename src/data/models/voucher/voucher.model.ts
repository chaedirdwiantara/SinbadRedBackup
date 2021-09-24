import * as models from '@models';
/** === VOUCHER CART LIST === */
export interface VoucherCartList<T> {
  list: models.DetailItemProps<T>;
}
export interface VoucherCartListProps {
  sinbadVouchers: SinbadVoucherProps[];
  supplierVouchers: SupplierVoucherProps[];
}
export interface SinbadVoucherProps {
  voucherId: number;
  voucherName: string;
  shortDescription: string;
  benefitRebate: number;
  expiredAt: string;
  remainingDay: number;
}
export interface SupplierVoucherProps {
  invoiceGroupId: number;
  invoiceGroupName: string;
  voucherList: SupplierVoucherListProps[];
}
export interface SupplierVoucherListProps {
  id: number;
  voucherId: number;
  voucherName: string;
  shortDescription: string;
  remainingDay: number;
  expiredAt: string;
  invoiceGroupId: number;
  invoiceGroupName: string;
  benefitRebate: number;
}
/** === VOUCHER DETAIL === */
export interface VoucherDetailProps {
  id: number;
  imageUrl: string;
  expiredAt: string;
  voucherDescription: string;
  termsAndCondition: string[];
  instructions: string[];
  voucherName: string;
  voucherHeaeder: string;
  voucherCode: string;
}
