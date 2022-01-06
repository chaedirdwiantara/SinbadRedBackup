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
/** === COMPONENT === */
const SearchProductView: FC = () => {
  /** === HOOKS === */
  const {
    params: { keyword },
  } = useRoute<SearchProductRouteProps>();
  const { fetch, refresh, loadMore, clearContents } = useProductListActions();
  const {
    stateProduct: { list: productListState },
    dispatchProduct,
  } = useProductContext();

  useFocusEffect(
    useCallback(() => {
      fetch(dispatchProduct, { keyword });

      return () => clearContents(dispatchProduct);
    }, []),
  );
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <View style={{ flex: 1 }}>
        <ProductList
          products={productListState.data}
          headerType="search"
          activeKeyword={keyword}
          isRefreshing={productListState.refresh}
          onFetch={(queryOptions) => {
            fetch(dispatchProduct, {
              keyword,
              ...queryOptions,
            });
          }}
          onRefresh={(queryOptions) =>
            refresh(dispatchProduct, {
              keyword,
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
              { keyword, ...queryOptions },
            )
          }
        />
      </View>
    </SnbContainer>
  );
};

export default SearchProductView;
