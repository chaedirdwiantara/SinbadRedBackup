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

export { goBack, goToCategory };
