/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => go to promo payment detail */
const goToPromoPaymentDetail = (promoPaymentId: number) => {
  NavigationAction.navigate('PromoPaymentDetailView', {
    voucherId: promoPaymentId,
  });
};

export { goBack, goToPromoPaymentDetail };
