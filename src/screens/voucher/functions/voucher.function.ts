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
const goToVoucherDetail = (voucherId: number) => {
  NavigationAction.navigate('VoucherDetailView', { voucherId });
};
/** => go to voucher cart list more */
const goToVoucherCartListMore = ({
  voucherList,
  voucherGroupName,
  voucherGroupType,
  selectedSinbadVoucher,
  selectedSupplierVoucher,
}: {
  voucherList: models.SinbadVoucherProps[] | models.SupplierVoucherListProps[];
  voucherGroupName: string;
  voucherGroupType: 'sinbad_voucher' | 'supplier_voucher';
  selectedSinbadVoucher: models.SinbadVoucherProps | null;
  selectedSupplierVoucher: models.SupplierVoucherListProps[];
}) => {
  NavigationAction.navigate('VoucherCartListMoreView', {
    voucherList,
    voucherGroupName,
    voucherGroupType,
    selectedSinbadVoucher,
    selectedSupplierVoucher,
  });
};
/** => count potential discount */
const countPotentialDiscount = (
  sinbadVoucher: models.SinbadVoucherProps | null,
  supplierVouchers: models.SupplierVoucherListProps[],
) => {
  let totalDiscount = 0;
  let totalSelectedVoucher = 0;
  if (sinbadVoucher !== null) {
    totalDiscount += sinbadVoucher.benefitRebate;
    totalSelectedVoucher += 1;
  }
  supplierVouchers.map((item) => {
    totalDiscount += item.benefitRebate;
    totalSelectedVoucher += 1;
  });
  return { totalDiscount, totalSelectedVoucher };
};

export {
  goBack,
  goToVoucherDetail,
  goToVoucherCartListMore,
  countPotentialDiscount,
};
