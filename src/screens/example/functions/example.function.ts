/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => go to example list */
const goToExampleList = () => {
  NavigationAction.navigate('ExampleListView');
};
/** => go to example detail */
const goToExampleDetail = () => {
  NavigationAction.navigate('ExampleDetailView');
};

export { goBack, goToExampleList, goToExampleDetail };
