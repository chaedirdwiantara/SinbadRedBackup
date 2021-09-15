/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => go to voucher detail */
const goToVoucherDetail = (voucherId: number) => {
  console.log(`navigate to voucher detail with voucherId ${voucherId}`);
};
/** => go to voucher cart list more */
const goToVoucherCartListMore = (voucherList) => {
  console.log('navigate to voucher cart list more');
};
/** => handle select supplier voucher */
const handleSelectSupplierVoucher = (voucherId: number) => {
  console.log(`handle select voucher with voucherId ${voucherId}`);
};
/** => handle select sinbad voucher */
const handleSelectSinbadVoucher = (voucherId: number) => {
  console.log(`handle select voucher with voucherId ${voucherId}`);
};
/** => handle reset voucher */
const handleResetVoucher = () => {
  console.log('handle reset voucher');
};
/** => handle search voucher */
const handleSearchVoucher = (keyword: string) => {
  console.log(`handle search voucher with keyword ${keyword}`);
};

export {
  goBack,
  goToVoucherDetail,
  goToVoucherCartListMore,
  handleResetVoucher,
  handleSelectSupplierVoucher,
  handleSelectSinbadVoucher,
  handleSearchVoucher,
};
