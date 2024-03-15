/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
import * as models from '@models';
/** === IMPORT EXTERNAL FUNCTION HERE === */

/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => go to voucher detail */
const goToVoucherDetail = (id: number) => {
  NavigationAction.navigate('VoucherDetailView', {
    id,
  });
};

const reorderVoucherList = (
  eligibleVouchers: models.EligibleVoucherProps[],
  selectedVoucher: models.SaveSelectedVoucher,
) => {
  const selectedVoucherData = eligibleVouchers.find(
    (voucher) => voucher?.sinbadVoucherId === selectedVoucher?.voucherId,
  );

  const eligibleVoucherFiltered = eligibleVouchers.filter(
    (voucher) => voucher?.sinbadVoucherId !== selectedVoucher?.voucherId!,
  );

  if (selectedVoucherData) {
    eligibleVoucherFiltered.unshift(selectedVoucherData!);
  }

  return eligibleVoucherFiltered;
};

export { goBack, goToVoucherDetail, reorderVoucherList };
