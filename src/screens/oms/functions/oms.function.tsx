/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => back to cart */
const backToCart = () => {
  NavigationAction.backToPage('OmsShoppingCartView');
  // NavigationAction.reset('OmsShoppingCartView');
};
/** => go to cart 2 */
const goToCart2 = () => {
  NavigationAction.navigate('OmsVerificationView');
  // NavigationAction.navigate('OmsShoppingCart2View', {
  //   id: '1',
  //   name: 'test from oms cart 2',
  // });
};
/** => go to cart 3 */
const goToCart3 = () => {
  NavigationAction.navigate('OmsShoppingCart3View');
};
/** => go to cart 4 */
const goToCart4 = () => {
  NavigationAction.navigate('OmsShoppingCart4View');
};
/** => go to checkout */
const goToCheckout = () => {
  NavigationAction.navigate('OmsCheckoutView');
};

export const OmsFunc = {
  goBack,
  backToCart,
  goToCart2,
  goToCart3,
  goToCart4,
  goToCheckout,
};
