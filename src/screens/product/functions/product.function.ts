/** === IMPORT PACKAGES === */
import { NavigationAction } from '@navigation';
/** === FUNCTIONS === */
const goBack = () => {
  NavigationAction.back();
};

const goToShoppingCart = () => {
  NavigationAction.navigate('OmsShoppingCartView');
};

const goToProductDetail = () => {
  NavigationAction.navigate('ProductDetailView');
};

export { goBack, goToShoppingCart, goToProductDetail };
