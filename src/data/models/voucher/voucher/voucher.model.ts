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
