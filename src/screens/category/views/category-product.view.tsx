/** === IMPORT PACKAGES ===  */
import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
/** === IMPORT COMPONENT === */
import ProductList from '@core/components/product/list';
/** === IMPORT FUNCTIONS === */
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { useProductListActions } from '@screen/product/functions';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === TYPES === */
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
const CategoryProductView: FC = () => {
  /** === HOOKS === */
  const {
    params: {
      category,
      categoryFirstLevelIndex,
      categorySecondLevelIndex,
      categoryThirdLevelIndex,
    },
  } = useRoute<CategoryProductRouteProps>();
  const { fetch, refresh, loadMore } = useProductListActions();
  const {
    stateProduct: { list: productListState },
    dispatchProduct,
  } = useProductContext();

  useFocusEffect(
    useCallback(() => {
      fetch(dispatchProduct, { categoryId: category.id });
    }, []),
  );
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <View style={{ flex: 1 }}>
        <ProductList
          products={productListState.data}
          activeCategory={category}
          categoryTabs={categoryFirstLevelIndex !== undefined}
          categoryTabsConfig={
            categoryFirstLevelIndex !== undefined
              ? {
                  level: categoryThirdLevelIndex === undefined ? '2' : '3',
                  firstLevelIndex: categoryFirstLevelIndex,
                  secondLevelIndex: categorySecondLevelIndex,
                  thirdLevelIndex: categoryThirdLevelIndex,
                }
              : undefined
          }
          isRefreshing={productListState.refresh}
          onFetch={(queryOptions) =>
            fetch(dispatchProduct, {
              categoryId: category.id,
              ...queryOptions,
            })
          }
          onRefresh={(queryOptions) =>
            refresh(dispatchProduct, {
              categoryId: category.id,
              ...queryOptions,
            })
          }
          onLoadMore={(queryOptions) =>
            loadMore(
              dispatchProduct,
              {
                skip: productListState.skip,
                canLoadMore: productListState.canLoadMore,
              },
              { categoryId: category.id, ...queryOptions },
            )
          }
        />
      </View>
    </SnbContainer>
  );
};

export default CategoryProductView;
