/** === IMPORT PACKAGES ===  */
import React, { FC, memo, useEffect } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
import { RouteProp, useRoute } from '@react-navigation/native';
/** === IMPORT COMPONENT === */
import {
  ProductListView,
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
import { Header } from '../components';
/** === IMPORT FUNCTIONS === */
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { useProductListActions } from '@screen/product/functions';
/** === TYPES === */
type SearchProductRouteParams = {
  SearchProduct: {
    keyword: string;
  };
};

type SearchProductRouteProps = RouteProp<
  SearchProductRouteParams,
  'SearchProduct'
>;
/** == CONSTANT */
const testID = 'search-product';
/** === COMPONENT === */
const SearchProductView: FC = () => {
  /** === HOOKS === */
  const {
    params: { keyword },
  } = useRoute<SearchProductRouteProps>();
  const { setSearch } = useProductListContext();
  const { fetch, clearContents } = useProductListActions();
  const { dispatchProduct } = useProductContext();
  // initial fetch
  useEffect(() => {
    fetch(dispatchProduct, { keyword });
    setSearch(keyword);
    return () => {
      clearContents(dispatchProduct);
    };
  }, []);
  /** === VIEW pdp list search === */
  return (
    <SnbContainer color="white">
      <View style={{ flex: 1 }}>
        <Header
          testID={testID}
          onFetch={(params) => fetch(dispatchProduct, params)}
        />
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

// wrap context state global for product list
export default memo(() => (
  <ProductListProvider>
    <SearchProductView />
  </ProductListProvider>
));
