import * as models from '@models';
export interface GlobalProps {
  dataCart: number | null;
  dataVouchers: models.selectedVoucherDataProps | null;
  isFCM: boolean;
}
/** === SELECTED VOUCHER DATA === */
export interface selectedVoucherDataProps {
  sinbadVoucher: models.SinbadVoucherProps | null;
  supplierVouchers: models.SupplierVoucherListProps[];
}
