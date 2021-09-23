/** === VOUCHER CART LIST === */
export interface VoucherCartList {
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
