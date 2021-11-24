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

const goToBundle = () => {
  NavigationAction.navigate('ProductBundleView');
};

export { goBack, goToShoppingCart, goToSupplier, goToBundle };
