/** === IMPORT PACKAGES ===  */
import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { SnbContainer, SnbToast2 } from 'react-native-sinbad-ui';
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
/** === IMPORT COMPONENT === */
import ProductList from '@core/components/product/list';
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
  useProductListFunction,
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
  const { stateCart, onSuccessAddToCart } = useProductListFunction();
  const {
    params: { keyword },
  } = useRoute<SearchProductRouteProps>();
  const { setSearch, state } = useProductListContext();
  // const [localKeyword, setLocalKeyword] = useState(keyword);
  // const [isSearched, setIsSearched] = useState(0);
  const { fetch, refresh, loadMore, clearContents } = useProductListActions();
  const {
    stateProduct: { list: productListState },
    dispatchProduct,
  } = useProductContext();

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
  // listener when success add to cart
  useEffect(() => {
    if (stateCart.create.data !== null) {
      onSuccessAddToCart();
      SnbToast2.show('Produk berhasil ditambahkan ke keranjang', 2000, {
        position: 'top',
        positionValue: StatusBar.currentHeight,
      });
    }
  }, [stateCart.create.data]);
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
        <SnbToast2 />
        {/* <ProductList
          products={productListState.data}
          total={productListState.total}
          headerType="search"
          activeKeyword={localKeyword}
          onActiveKeywordChange={(text: string) => setLocalKeyword(text)}
          isRefreshing={productListState.refresh}
          onFetch={(queryOptions) => {
            fetch(dispatchProduct, {
              keyword: localKeyword,
              ...queryOptions,
            });

            if (localKeyword === '') {
              setIsSearched(0);
            } else {
              setIsSearched((prev) => prev + 1);
            }
          }}
          onRefresh={(queryOptions) =>
            refresh(dispatchProduct, {
              keyword: localKeyword,
              ...queryOptions,
            })
          }
          onLoadMore={(queryOptions) =>
            loadMore(dispatchProduct, productListState, {
              keyword: localKeyword,
              ...queryOptions,
            })
          }
        /> */}
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
