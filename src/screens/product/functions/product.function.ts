/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === FUNCTION === */
/** => Go Back */
const goBack = () => {
  NavigationAction.back();
};
/** => Go to Shopping Cart */
const goToShoppingCart = () => {
  NavigationAction.navigate('OmsShoppingCartView');
};

export { goBack, goToShoppingCart };
