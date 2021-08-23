/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => go to example list */
const goToExample2List = () => {
  NavigationAction.navigate('Example2ListView');
};
/** => go to example detail */
const goToExample2Detail = () => {
  NavigationAction.navigate('Example2DetailView');
};

export { goBack, goToExample2List, goToExample2Detail };
