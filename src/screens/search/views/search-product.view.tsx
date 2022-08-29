/** === IMPORT PACKAGES ===  */
import React, { FC, memo, useEffect } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
import { RouteProp, useRoute } from '@react-navigation/native';
/** === IMPORT COMPONENT === */
import { Header } from '../components';
import ProductListView from '@core/components/product/product-list/product-list.view';
import CountProductList from '@core/components/product/product-list/count-product-list.view';
import ModalAddToCartView from '@core/components/product/product-list/modal-add-to-cart.view';
import ModalNeedLoginView from '@core/components/product/product-list/modal-need-login.view';
import ModalFilterView from '@core/components/product/product-list/modal-filter.view';
import ModalNotInUrbanView from '@core/components/product/product-list/modal-not-in-urban.view';
import ModalErrorStockView from '@core/components/product/product-list/modal-error-stock.view';
import ModalErrorProductDetailView from '@core/components/product/product-list/modal-error-product-detail.view';
import { ProductListProvider } from '@core/components/product/product-list/product-list.context';

/** === IMPORT FUNCTIONS === */
import { useProductListContext } from '@core/components/product/product-list/function/product-list.util';
import { useSearchResultEventPageMoengage } from '../functions/search-result-moengage.function';
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
  // listener search result page moengage
  useSearchResultEventPageMoengage();
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
      setSearch(undefined);
    };
  }, []);
  /** === VIEW pdp list search === */
  return (
    <SnbContainer color="white">
      <View style={{ flex: 1 }}>
        <Header onFetch={(params) => fetch(dispatchProduct, params)} />
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
