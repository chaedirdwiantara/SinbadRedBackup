/** === IMPORT INTERNAL === */
import { NavigationAction } from '@navigation';
import * as models from '@models';
/** === FUNCTIONS === */
const goBack = () => {
  NavigationAction.back();
};

const goToProduct = (brand: models.BrandListSuccessProps) => {
  NavigationAction.navigate('BrandProductView', { brand });
};

export { goBack, goToProduct };
