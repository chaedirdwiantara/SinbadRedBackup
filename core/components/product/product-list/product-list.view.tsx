import React, { FC, memo, useMemo, useCallback } from 'react';
import { View } from 'react-native';
import { LoadingLoadMore } from '@core/components/Loading';
import GridLayout from '../list/grid-layout/GridLayout';
import ListLayout from '../list/list-layout/ListLayout';

import { useDataAuth } from '@core/redux/Data';
import { useProductDetailCartAction } from '@screen/product/functions';
import { useProductListActions } from '@screen/product/functions';
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { useProductListContext } from './';
// types
import type * as models from '@models';

/** => INTERFACE */
type Props = {
  testID: string;
};

const Main: FC<Props> = ({ testID }) => {
  const { state, trigerModal, setSelectProduct } = useProductListContext();
  const { me } = useDataAuth();
  const { fetch, loadMore } = useProductListActions();
  const productDetailActions = useProductDetailCartAction();
  const {
    stateProduct: { list: productListState },
    dispatchProduct,
  } = useProductContext();

  const ProductCard = useMemo(
    () => (state.layout === 'grid' ? GridLayout : ListLayout),
    [state.layout],
  );

  const handleOrderPress = useCallback(
    (product: models.ProductList) => {
      if (me.data === null) {
        // if user not login/anonim give me.data null
        trigerModal('needLogin', true);
      } else {
        const id = `${product.id}_${product.warehouseOriginId}`;
        setSelectProduct(id);
        productDetailActions.fetch(dispatchProduct, id);
      }
    },
    [me.data],
  );
  return (
    <View style={{ flex: 1 }}>
      <ProductCard
        testID={testID}
        total={productListState.total}
        products={productListState.data}
        onOrderPress={handleOrderPress}
        isRefreshing={productListState.refresh}
        onRefresh={() => fetch(dispatchProduct, state.query)}
        onLoadMore={() =>
          loadMore(dispatchProduct, productListState, state.query)
        }
        loading={productListState.loading}
        error={productListState.error}
        onChangeLayoutListPress={() => {}}
        onFilterPress={() => {}}
        onTagPress={() => {}}
        tags={[]}
      />
      {productListState.loadMore ? <LoadingLoadMore /> : <View />}
    </View>
  );
};

export const ProductListView = memo(Main);
