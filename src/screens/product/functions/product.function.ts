/** === IMPORT PACKAGES === */
import { NavigationAction } from '@navigation';
/** === FUNCTIONS === */
const goBack = () => {
  NavigationAction.back();
};

const goToShoppingCart = () => {
  NavigationAction.navigate('OmsShoppingCartView');
};

const goToSupplier = () => {
  NavigationAction.navigate('SupplierView');
};

const goToBundle = (id: string) => {
  NavigationAction.navigate('ProductBundleView', { id });
};

const goBackFromBundleToDetail = (id: string) => {
  NavigationAction.navigate('ProductDetailView', { id });
};

export {
  goBack,
  goToShoppingCart,
  goToSupplier,
  goToBundle,
  goBackFromBundleToDetail,
};
