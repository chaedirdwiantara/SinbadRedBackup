/** === IMPORT PACKAGES ===  */
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { SnbTabs } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTION ===  */
import { useCategoryContext } from 'src/data/contexts/category/useCategoryContext';
/** === IMPORT TYPES ===  */
import * as models from '@models';
import { CategoryTabLevel, CategoryType } from './product-list-core.type';
/** === TYPES === */
type ProductCategoryTab = models.CategoryLevel2 | models.CategoryLevel3;

interface CategoryTabListProps {
  level: CategoryTabLevel;
  selectedFirstLevelIndex: number;
  selectedSecondLevelIndex: number;
  selectedThirdLevelIndex?: number;
  onTabChange: (category: CategoryType) => void;
}
/** === COMPONENT === */
const CategoryTabList: FC<CategoryTabListProps> = ({
  level,
  selectedFirstLevelIndex,
  selectedSecondLevelIndex,
  selectedThirdLevelIndex,
  onTabChange,
}) => {
  /** === HOOKS === */
  const [activeIndex, setActiveIndex] = useState(
    level === '2'
      ? // There's no 'Semua' option for level 2 categories in CategoryView, but in this component we have it, so we need to increment the level 2 index by 1.
        selectedSecondLevelIndex + 1
      : (selectedThirdLevelIndex as number),
  );
  const {
    stateCategory: {
      level: {
        list: { data: categoryList },
      },
    },
  } = useCategoryContext();
  /** === DERIVED VALUES === */
  const categoryLevelList: Array<ProductCategoryTab> =
    level === '2'
      ? categoryList[selectedFirstLevelIndex].children
      : categoryList[selectedFirstLevelIndex].children[selectedSecondLevelIndex]
          .children;
  const parentCategory =
    level === '2'
      ? categoryList[selectedFirstLevelIndex]
      : categoryList[selectedFirstLevelIndex].children[
          selectedSecondLevelIndex
        ];
  const categoryNames = [
    'Semua',
    ...categoryLevelList.map((category) => category.name),
  ];
  /** === VIEW === */
  return (
    <View>
      <SnbTabs.Scrollable
        tabs={categoryNames}
        activeTabs={activeIndex}
        onChangeActiveTabs={(index) => {
          // If 'Semua' is chosen, set categoryId as '', else decrement the current index by 1 because in categoryLevelList
          // we don't have 'Semua' option.
          const activeCategory =
            index === 0 ? parentCategory : categoryLevelList[index - 1];
          setActiveIndex(index);
          onTabChange(activeCategory);
        }}
      />
    </View>
  );
};

export default CategoryTabList;
