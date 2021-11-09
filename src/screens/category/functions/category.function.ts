/** === IMPORT FUNCTION === */
import { NavigationAction } from '@navigation';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === FUNCTIONS === */
const goBack = () => {
  NavigationAction.back();
};

const goToProduct = (
  category:
    | models.CategoryHome
    | models.CategoryLevel
    | models.CategoryLevel2
    | models.CategoryLevel3,
  firstLevelIndex?: number,
  secondLevelIndex?: number,
  thirdLevelIndex?: number,
) => {
  NavigationAction.navigate('CategoryProductView', {
    category,
    categoryFirstLevelIndex: firstLevelIndex,
    categorySecondLevelIndex: secondLevelIndex,
    categoryThirdLevelIndex: thirdLevelIndex,
  });
};

const goToCategory = (categoryId?: string) => {
  NavigationAction.navigate('CategoryView', { categoryId });
};

const getCategory1stLevelIndex = (
  data: Array<models.CategoryLevel>,
  id?: string,
) => {
  if (data.length > 0) {
    if (id) {
      return data.findIndex((d) => d.id === id);
    } else {
      // Find first category in 1st level list that has descendants
      return data.findIndex((d) => d.hasChild);
    }
  }

  return 0;
};

export { goBack, goToProduct, goToCategory, getCategory1stLevelIndex };
