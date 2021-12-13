/** === IMPORT FUNCTION === */
import { NavigationAction } from '@navigation';
/** === FUNCTIONS === */
const goToProduct = () => {
  NavigationAction.navigate('RecommendationProductView');
};

const goToProductDetail = (id: string) => {
  NavigationAction.navigate('ProductDetailView', { id });
};

export { goToProduct, goToProductDetail };
