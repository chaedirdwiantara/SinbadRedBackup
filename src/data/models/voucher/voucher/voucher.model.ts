import * as models from '@models';
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
export interface VoucherDataProps {
  dataVouchers: selectedVoucherDataProps | null;
}
/** === SELECTED VOUCHER DATA === */
export interface selectedVoucherDataProps {
  sinbadVoucher: models.SinbadVoucherProps | null;
  supplierVouchers: models.SupplierVoucherListProps[];
}