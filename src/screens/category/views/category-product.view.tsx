/** === IMPORT PACKAGES ===  */
import React, { FC, memo, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
/** === IMPORT COMPONENT === */
import { Header } from '../components';
import {
  ProductListView,
  CategoryTabListView,
  CountProductList,
  ModalAddToCartView,
  ModalNeedLoginView,
  ModalFilterView,
  ModalNotInUrbanView,
  ModalErrorStockView,
  ModalErrorProductDetailView,
  ProductListProvider,
  useProductListContext,
} from '@core/components/product/product-list';
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
/** === CONSTANT */
const testID = 'category-product';
/** === COMPONENT === */
const CategoryProductView: FC = () => {
  /** === HOOKS === */
  const { setQuery, setCategory } = useProductListContext();
  const {
    params: { category, categoryFirstLevelIndex },
  } = useRoute<CategoryProductRouteProps>();
  const { fetch, clearContents } = useProductListActions();
  const { dispatchProduct } = useProductContext();

  useFocusEffect(
    useCallback(() => {
      fetch(dispatchProduct, { categoryId: category.id });
      setQuery({ categoryId: category.id });
      return () => clearContents(dispatchProduct);
    }, []),
  );
  // initial set header
  useEffect(() => {
    setCategory(category);
  }, []);
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <View style={{ flex: 1 }}>
        <Header />
        {categoryFirstLevelIndex !== undefined ? (
          <CategoryTabListView
            testID={testID}
            onFetch={(params) => fetch(dispatchProduct, params)}
          />
        ) : (
          <View />
        )}
        <CountProductList testID={testID} />
        <ProductListView testID={testID} />
        <ModalFilterView
          testID={testID}
          onFetch={(params) => fetch(dispatchProduct, params)}
        />
        <ModalAddToCartView testID={testID} />
        <ModalNeedLoginView testID={testID} />
        <ModalNotInUrbanView testID={testID} />
        <ModalErrorStockView testID={testID} />
        <ModalErrorProductDetailView testID={testID} />
      </View>
    </SnbContainer>
  );
};

// export default CategoryProductView;
export default memo(() => (
  <ProductListProvider>
    <CategoryProductView />
  </ProductListProvider>
));
