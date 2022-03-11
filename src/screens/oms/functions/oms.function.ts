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
/** => Go to Thank You Page */
const goToThankYouPage = () => {
  NavigationAction.navigate('OmsThankYouPageView');
};
/** => Go to Payment Method */
const goToPaymentMethod = () => {
  NavigationAction.navigate('OmsPaymentMethod');
};

export {
  goBack,
  goToCategory,
  goToCheckout,
  goToThankYouPage,
  goToPaymentMethod,
};
