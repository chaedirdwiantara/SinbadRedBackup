/** === IMPORT PACKAGES ===  */
import React, { FC, useCallback, useState } from 'react';
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
  const [localKeyword, setLocalKeyword] = useState(keyword);
  const [isSearched, setIsSearched] = useState(0);
  const { fetch, refresh, loadMore, clearContents } = useProductListActions();
  const {
    stateProduct: { list: productListState },
    dispatchProduct,
  } = useProductContext();

  useFocusEffect(
    useCallback(() => {
      fetch(dispatchProduct, { keyword: localKeyword });

      return () => clearContents(dispatchProduct);
    }, []),
  );
  /** === VIEW pdp list search === */
  return (
    <SnbContainer color="white">
      <View style={{ flex: 1 }}>
        <ProductList
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
        />
      </View>
    </SnbContainer>
  );
};

export default SearchProductView;
