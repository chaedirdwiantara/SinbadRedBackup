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
  expiredAt: Date;
  remainingDay: number;
}
export interface SupplierVoucherProps {
  invoiceGroupId: number;
  invoiceGroupName: string;
  voucherList: VoucherListProps[];
}
export interface VoucherListProps {
  id: number;
  voucherId: number;
  voucherName: string;
  shortDescription: string;
  remainingDay: number;
  expiredAt: Date;
  invoiceGroupId: number;
  invoiceGroupName: string;
  benefitRebate: number;
}
