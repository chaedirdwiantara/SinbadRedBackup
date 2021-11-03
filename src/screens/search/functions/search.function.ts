/** === IMPORT FUNCTION === */
import { NavigationAction } from '@navigation';
/** === FUNCTIONS === */
const goBack = () => {
  NavigationAction.back();
};

const goToProduct = (keyword: string) => {
  NavigationAction.navigate('SearchProductView', { keyword });
};

export { goBack, goToProduct };
