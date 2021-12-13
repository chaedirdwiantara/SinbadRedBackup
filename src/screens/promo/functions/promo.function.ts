/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => go to promo payment detail */
const goToPromoPaymentDetail = (id: number) => {
  NavigationAction.navigate('PromoPaymentDetailView', {
    id,
  });
};

export { goBack, goToPromoPaymentDetail };
