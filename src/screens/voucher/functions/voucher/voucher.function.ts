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
  // NavigationAction.navigate('VoucherDetailView', { voucherId: voucherId.toString() });
  NavigationAction.navigate('VoucherDetailView', { voucherId: 1 });
};

export { goBack, goToVoucherDetail };
