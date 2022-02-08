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
  voucherHeader: string;
  uniqueCode: string;
}
export interface VoucherDataProps {
  dataVouchers: selectedVoucherDataProps | null;
}
/** === SELECTED VOUCHER DATA === */
export interface selectedVoucherDataProps {
  sinbadVoucher: models.SinbadVoucherProps | null;
  sellerVouchers: models.SellerVoucherListProps[];
}
/** === VOUCHER CART LIST === */
export interface VoucherCartListProps {
  sinbadVouchers: SinbadVoucherProps[];
  sellerVouchers: SellerVoucherProps[];
}
export interface SinbadVoucherProps {
  voucherId: number;
  voucherName: string;
  shortDescription: string;
  benefitRebate: number;
  expiredAt: string;
  remainingDay: number;
}
export interface SellerVoucherProps {
  invoiceGroupId: number;
  invoiceGroupName: string;
  voucherList: SellerVoucherListProps[];
}
export interface SellerVoucherListProps {
  id: number;
  voucherId: number;
  voucherName: string;
  uniqueCode: string;
  externalId: string;
  shortDescription: string;
  remainingDay: number;
  expiredAt: string;
  invoiceGroupId: number;
  invoiceGroupName: string;
  benefitRebate: number;
  benefitDiscout: number;
  benefitType: 'amount' | 'percent';
}
export interface CountAllVoucherProps {
  total: number;
}
