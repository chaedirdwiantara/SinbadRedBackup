/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as models from '@models';
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => go to voucher detail */
const goToVoucherDetail = (voucherId: number, type: string) => {
  NavigationAction.navigate('VoucherDetailView', { voucherId, type });
};
/** => go to voucher cart list more */
const goToVoucherCartListMore = ({
  voucherList,
  voucherGroupName,
  voucherGroupType,
  selectedSinbadVoucher,
  selectedSellerVoucher,
}: {
  voucherList: models.SinbadVoucherProps[] | models.SellerVoucherListProps[];
  voucherGroupName: string;
  voucherGroupType: 'sinbad_voucher' | 'seller_voucher';
  selectedSinbadVoucher: models.SinbadVoucherProps | null;
  selectedSellerVoucher: models.SellerVoucherListProps[];
}) => {
  NavigationAction.navigate('VoucherCartListMoreView', {
    voucherList,
    voucherGroupName,
    voucherGroupType,
    selectedSinbadVoucher,
    selectedSellerVoucher,
  });
};
/** => count potential discount */
const countPotentialDiscount = (
  sinbadVoucher: models.SinbadVoucherProps | null,
  sellerVouchers: models.SellerVoucherListProps[],
) => {
  let totalDiscount = 0;
  let totalSelectedVoucher = 0;
  if (sinbadVoucher !== null) {
    totalDiscount += sinbadVoucher.benefitRebate;
    totalSelectedVoucher += 1;
  }
  sellerVouchers.map((item) => {
    totalDiscount += item.benefitRebate;
    totalSelectedVoucher += 1;
  });
  return { totalDiscount, totalSelectedVoucher };
};
/** => get selected vouchers */
const getSelectedVouchers = (
  voucherState: models.selectedVoucherDataProps | null,
): models.VoucherId[] => {
  if (voucherState === null) {
    return [];
  }
  const voucherArr = [];
  /** => seller voucher */
  voucherState.sellerVouchers.map((item) => {
    voucherArr.push({
      type: 'seller_voucher',
      voucherId: item.voucherId,
    });
  });
  /** => sinbad voucher */
  if (voucherState.sinbadVoucher !== null) {
    voucherArr.push({
      type: 'sinbad_voucher',
      voucherId: voucherState.sinbadVoucher.voucherId,
    });
  }
  return voucherArr;
};

export {
  goBack,
  goToVoucherDetail,
  goToVoucherCartListMore,
  countPotentialDiscount,
  getSelectedVouchers,
};
