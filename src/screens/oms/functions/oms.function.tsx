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
/** => go to verification order */
const goToVerificationOrder = () => {
  NavigationAction.navigate('OmsVerificationOrderView');
};
/** => go to verification order */
const goToVoucherCartList = () => {
  NavigationAction.navigate('VoucherCartListView');
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
/** => go to checkout success */
const goToCheckoutSuccess = () => {
  NavigationAction.navigate('OmsCheckoutSuccessView');
};
/** => go to home */
const goToHome = () => {
  NavigationAction.navigate('HomeView');
};
/** => go to history detail */
const goToHistoryDetail = (section: 'order' | 'payment') => {
  NavigationAction.navigate('OmsHistoryDetailView', { section });
};
/** => go to voucher detail */
const goToPaymentPromoList = (invoiceGroupId: string) => {
  NavigationAction.navigate('PromoPaymentListView', { invoiceGroupId });
};
/** => go to category product */
const goToCategory = () => {
  NavigationAction.navigate('CategoryView');
};
/** => Go to History List */
const goToHistoryList = () => {
  NavigationAction.navigate('HistoryListView');
};
/** => Go to Thank You Page */
const goToThankYouPage = () => {
  NavigationAction.navigate('OmsThankYouPageView');
};

export {
  goBack,
  backToCart,
  goToVerificationOrder,
  goToCart3,
  goToCart4,
  goToCheckout,
  goToCheckoutSuccess,
  goToHome,
  goToHistoryDetail,
  goToPaymentPromoList,
  goToVoucherCartList,
  goToCategory,
  goToHistoryList,
  goToThankYouPage
};
