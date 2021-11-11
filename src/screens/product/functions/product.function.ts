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

export { goBack, goToShoppingCart, goToSupplier };
