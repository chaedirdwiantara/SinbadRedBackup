/** === IMPORT PACKAGES ===  */
import React, { FC, memo, useEffect } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
import { RouteProp, useRoute } from '@react-navigation/native';
/** === IMPORT COMPONENT === */
// import ProductList from '@core/components/product/list';
import {
  ProductListView,
  // taglist deprecated deleted asap
  // TagListView,
  CountProductList,
  ModalSortView,
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
  // const [localKeyword, setLocalKeyword] = useState(keyword);
  // const [isSearched, setIsSearched] = useState(0);
  const { fetch, clearContents } = useProductListActions();
  const { dispatchProduct } = useProductContext();

  // useFocusEffect(
  //   useCallback(() => {
  //     fetch(dispatchProduct, { keyword: keyword });

  //     return () => clearContents(dispatchProduct);
  //   }, []),
  // );

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
        <ModalSortView
          testID={testID}
          onFetch={(params) => fetch(dispatchProduct, params)}
        />
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
