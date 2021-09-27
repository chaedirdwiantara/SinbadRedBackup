/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => go to product list */
const goToProduct = () => {
  NavigationAction.navigate('ProductView');
};
/** => go to category list */
const goToCategory = () => {
  NavigationAction.navigate('VoucherCartListView');
};

export { goBack, goToProduct, goToCategory };
