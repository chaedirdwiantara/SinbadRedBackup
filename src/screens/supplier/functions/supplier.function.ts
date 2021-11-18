/** === IMPORT FUNCTIONS === */
import { NavigationAction } from '@navigation';
/** === IMPORT TYPES === */
import * as models from '@models';
/** === FUNCTIONS === */
export const goBack = () => {
  NavigationAction.back();
};

export const goToHome = () => {
  NavigationAction.navigate('HomeView');
};

export const goToShoppingCart = () => {
  NavigationAction.navigate('OmsShoppingCartView');
};

export const goToSearchProduct = (keyword: string) => {
  NavigationAction.navigate('SearchProductView', { keyword });
};

export const goToBrandProduct = (brand: models.BrandListSuccessProps) => {
  NavigationAction.navigate('BrandProductView', { brand });
};

export const goToBrand = () => {
  NavigationAction.navigate('BrandView');
};
