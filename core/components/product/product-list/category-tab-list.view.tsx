/** === IMPORT PACKAGES ===  */
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { View } from 'react-native';
import { SnbTabs2 } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTION ===  */
import { RouteProp, useRoute } from '@react-navigation/native';
import { useCategoryContext } from 'src/data/contexts/category/useCategoryContext';
import { useProductListContext } from './';
/** === IMPORT TYPES ===  */
import * as models from '@models';
/** === TYPES === */

interface ProductLayoutProps {
  products: Array<models.ProductList>;
  withTags?: boolean;
  tags: Array<ITag>;
  onTagPress: (index: number, tag: ITag) => void;
  onOrderPress: (item: models.ProductList) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  loading: boolean;
  error: models.ErrorProps | null;
  total: number;
  onChangeLayoutListPress?: (layout: 'list' | 'grid') => void;
  onSortPress?: () => void;
  onFilterPress: () => void;
}

// type ProductHeaderType = 'default' | 'search';

type CategoryTabLevel = '2' | '3';

//  interface CategoryTabsConfig {
//   level?: CategoryTabLevel;
//   firstLevelIndex?: number;
//   secondLevelIndex?: number;
//   thirdLevelIndex?: number;
// }

type CategoryType =
  | models.CategoryLevel
  | models.CategoryLevel2
  | models.CategoryLevel3;

interface ITag {
  value: string;
  selected: boolean;
}

export type ListDisplayState = 'loading' | 'error' | 'empty' | 'success';

type ProductCategoryTab = models.CategoryLevel2 | models.CategoryLevel3;

interface CategoryTabListProps {
  onFetch: (params: { categoryId: string }) => void;
}

type CategoryProductRouteParams = {
  CategoryProduct: {
    category:
      | models.CategoryLevel
      | models.CategoryLevel2
      | models.CategoryLevel3;
    categoryFirstLevelIndex?: number;
    categorySecondLevelIndex?: number;
    categoryThirdLevelIndex?: number;
  };
};

type CategoryProductRouteProps = RouteProp<
  CategoryProductRouteParams,
  'CategoryProduct'
>;
/** === COMPONENT === */
const App: FC<CategoryTabListProps> = ({ onFetch }) => {
  /** === HOOKS === */
  const {
    params: {
      category,
      categoryFirstLevelIndex,
      categorySecondLevelIndex,
      categoryThirdLevelIndex,
    },
  } = useRoute<CategoryProductRouteProps>();
  const { setCategory, state } = useProductListContext();
  const {
    stateCategory: {
      level: {
        list: { data: categoryList },
      },
    },
  } = useCategoryContext();

  /** === DERIVED VALUES === */
  const categoryTabsConfig = useMemo(
    () =>
      categoryFirstLevelIndex !== undefined
        ? {
            level: categoryThirdLevelIndex === undefined ? '2' : '3',
            firstLevelIndex: categoryFirstLevelIndex,
            secondLevelIndex: categorySecondLevelIndex,
            thirdLevelIndex: categoryThirdLevelIndex,
          }
        : undefined,
    [
      categoryThirdLevelIndex,
      categoryFirstLevelIndex,
      categorySecondLevelIndex,
    ],
  );
  // initial level & active index
  const level = useMemo(
    () => categoryTabsConfig?.level!,
    [categoryTabsConfig?.level],
  );
  const selectedFirstLevelIndex = useMemo(
    () => categoryTabsConfig?.firstLevelIndex!,
    [categoryTabsConfig?.firstLevelIndex],
  );
  const selectedSecondLevelIndex = useMemo(
    () => categoryTabsConfig?.secondLevelIndex!,
    [categoryTabsConfig?.secondLevelIndex],
  );
  const selectedThirdLevelIndex = useMemo(
    () => categoryTabsConfig?.thirdLevelIndex!,
    [categoryTabsConfig?.thirdLevelIndex],
  );
  const [activeIndex, setActiveIndex] = useState(
    level === '2'
      ? // There's no 'Semua' option for level 2 categories in CategoryView, but in this component we have it, so we need to increment the level 2 index by 1.
        selectedSecondLevelIndex + 1
      : (selectedThirdLevelIndex as number),
  );
  //
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

  // function
  const onChangeActiveTabs = useCallback(
    (index: number) => {
      // If 'Semua' is chosen, set categoryId as '', else decrement the current index by 1 because in categoryLevelList
      // we don't have 'Semua' option.
      const activeCategory =
        index === 0 ? parentCategory : categoryLevelList[index - 1];
      setActiveIndex(index);
      // set in context product list & re fetch category product list
      setCategory(activeCategory);
      const query = { ...state.query, categoryId: activeCategory.id };
      onFetch(query);
    },
    [state.query, parentCategory, categoryLevelList],
  );

  /** === VIEW === */
  return (
    <View>
      <SnbTabs2.Scrollable
        tabs={categoryNames}
        activeTabs={activeIndex}
        onChangeActiveTabs={onChangeActiveTabs}
      />
    </View>
  );
};

export const CategoryTabListView = memo(App);
