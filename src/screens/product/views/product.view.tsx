/** === IMPORT PACKAGES ===  */
import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
import { RouteProp, useRoute } from '@react-navigation/core';
/** === IMPORT COMPONENTS === */
import ProductList from '@core/components/product/list';
import { AddToCartModal } from './AddToCartModal';
/** === IMPORT FUNCTIONS === */
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { useProductListActions, useOrderModalVisibility } from '../functions';
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
const ProductView: FC = () => {
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
  const { orderModalVisible, setOrderModalVisible } = useOrderModalVisibility();

  useEffect(() => {
    fetch(dispatchProduct, { categoryId: category.id });
  }, []);
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <View style={{ flex: 1 }}>
        <ProductList
          products={productListState.data}
          onOrderPress={() => setOrderModalVisible(true)}
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
      <AddToCartModal
        open={orderModalVisible}
        closeAction={() => setOrderModalVisible(false)}
        onAddToCartPress={() => console.log('Add to cart pressed')}
      />
    </SnbContainer>
  );
};

export default ProductView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: aliisetia
 * updatedDate: 28-10-21
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
