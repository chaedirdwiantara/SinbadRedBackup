import { DetailProcessAction } from '..';

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
  dataVoucher: EligibleVoucherProps | null;
}

/** === VOUCHER CART LIST === */
export interface VoucherCartListProps {
  eligible: EligibleVoucherProps[];
  notEligible: NotEligibleVoucherProps[];
}
export interface EligibleVoucherProps {
  id: number;
  name: string;
  endDate: string;
  sinbadVoucherValue: number;
  remainingDay: number;
}
export interface NotEligibleVoucherProps {
  id: number;
  name: string;
  endDate: string;
  minOrderTransaction: number;
  remainingDay: number;
}

export interface VoucherListProcessProps {
  uniqueCode: string;
}

export interface VoucherListProcessAction
  extends Omit<DetailProcessAction, 'payload'> {
  payload: VoucherListProcessProps;
}
