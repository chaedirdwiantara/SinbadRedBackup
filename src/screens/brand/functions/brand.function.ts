/** === IMPORT INTERNAL === */
import { NavigationAction } from '@navigation';
import * as models from '@models';
/** === FUNCTIONS === */
const goBack = () => {
  NavigationAction.back();
};

const goToProduct = (brand: models.BrandListItem) => {
  NavigationAction.navigate('BrandProductView', { brand });
};

const goToBrandList = () => {
  NavigationAction.navigate('BrandView');
};

export { goBack, goToProduct, goToBrandList };
