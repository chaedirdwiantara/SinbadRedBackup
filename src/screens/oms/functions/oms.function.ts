/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => go to category */
const goToCategory = () => {
  NavigationAction.navigate('CategoryView');
};
/** => go to checkout */
const goToCheckout = () => {
  NavigationAction.navigate('OmsCheckoutView');
};
/** => go to profile */
const goToProfile = () => {
  NavigationAction.navigate('UserView', { isProfileCompletionCart: true });
};
/** => Go to Thank You Page */
const goToThankYouPage = (
  section: string,
  orderId: number
) => {
  NavigationAction.navigate('OmsThankYouPageView',{section, orderId});
};
/** => Go to Payment Method */
const goToPaymentMethod = (data: any) => {
  NavigationAction.navigate('OmsPaymentMethod', { data });
};

export {
  goBack,
  goToCategory,
  goToCheckout,
  goToThankYouPage,
  goToPaymentMethod,
  goToProfile
};
