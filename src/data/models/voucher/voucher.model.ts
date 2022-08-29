/** === VOUCHER DETAIL === */
export interface VoucherCartDetailProps {
  id: string;
  sinbadVoucherId: number;
  name: string;
  imageUrl: string;
  descriptions: string;
  termAndConditions: string[];
  howToUse: string[];
}
export interface VoucherDataProps {
  dataVoucher: EligibleVoucherProps | null;
}

/** === VOUCHER CART LIST === */
export interface VoucherCartListProps {
  eligible: EligibleVoucherProps[];
  notEligible: NotEligibleVoucherProps[];
}
export interface EligibleVoucherProps {
  id: string;
  sinbadVoucherId: number;
  name: string;
  endDate: string;
  sinbadVoucherValue: number;
  remainingDay: number;
}
export interface NotEligibleVoucherProps {
  id: string;
  sinbadVoucherId: number;
  name: string;
  endDate: string;
  minOrderTransaction: number;
  remainingDay: number;
  sinbadVoucherValue: number;
}

export interface SaveSelectedVoucher {
  voucherId: number;
  voucherValue: number;
}
