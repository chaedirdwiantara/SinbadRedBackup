/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => go to voucher detail */
const goToVoucherDetail = (voucherId: number) => {
  NavigationAction.navigate('VoucherDetailView', { voucherId });
};

export { goBack, goToVoucherDetail };
