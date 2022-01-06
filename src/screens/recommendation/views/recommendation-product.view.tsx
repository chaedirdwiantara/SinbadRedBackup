/** === IMPORT PACKAGES ===  */
import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
import { useFocusEffect } from '@react-navigation/native';
/** === IMPORT COMPONENT === */
import ProductList from '@core/components/product/list';
/** === IMPORT FUNCTIONS === */
import { useProductListActions } from '@screen/product/functions';
import { useProductContext } from 'src/data/contexts/product/useProductContext';
/** === COMPONENT === */
const RecommendationProductView: FC = () => {
  /** === HOOKS === */
  const { fetch, refresh, loadMore, clearContents } =
    useProductListActions('recommendations');
  const {
    stateProduct: { list: productListState },
    dispatchProduct,
  } = useProductContext();

  useFocusEffect(
    useCallback(() => {
      fetch(dispatchProduct);

      return () => clearContents(dispatchProduct);
    }, []),
  );
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <View style={{ flex: 1 }}>
        <ProductList
          products={productListState.data}
          withTags={false}
          withBottomAction={false}
          headerTitle="Rekomendasi"
          isRefreshing={productListState.refresh}
          onFetch={(queryOptions) => fetch(dispatchProduct, queryOptions)}
          onRefresh={(queryOptions) => refresh(dispatchProduct, queryOptions)}
          onLoadMore={(queryOptions) =>
            loadMore(
              dispatchProduct,
              {
                skip: productListState.skip,
                canLoadMore: productListState.canLoadMore,
              },
              queryOptions,
            )
          }
        />
      </View>
    </SnbContainer>
  );
};

export default RecommendationProductView;
