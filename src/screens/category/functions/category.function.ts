/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === IMPORT MODEL HERE === */
import * as models from '@models';
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => go to product list */
const goToProduct = (
  category:
    | models.CategoryLevel
    | models.CategoryLevel2
    | models.CategoryLevel3,
  firstLevelIndex?: number,
  secondLevelIndex?: number,
  thirdLevelIndex?: number,
) => {
  NavigationAction.navigate('ProductView', {
    category,
    categoryFirstLevelIndex: firstLevelIndex,
    categorySecondLevelIndex: secondLevelIndex,
    categoryThirdLevelIndex: thirdLevelIndex,
  });
};
/** => go to category list */
const goToCategory = (id?: string) => {
  NavigationAction.navigate('CategoryView', { id });
};
/** => find index by category id */
const categoryIndexById = (id: string, data: models.CategoryLevel[]) => {
  if (data.length > 0) {
    if (id) {
      return data.findIndex((d) => d.id === id);
    } else {
      return data.findIndex((d) => d.hasChild);
    }
  }
  return 0;
};

export { goBack, goToProduct, goToCategory, categoryIndexById };
