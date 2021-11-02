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
/** === IMPORT TYPE === */
import * as models from '@models';
/** === TYPES === */
type BrandProductRouteParams = {
  BrandProduct: {
    brand: models.BrandListSuccessProps;
  };
};

type BrandProductRouteProps = RouteProp<
  BrandProductRouteParams,
  'BrandProduct'
>;
/** === COMPONENT === */
const BrandProductView: FC = () => {
  /** === HOOKS === */
  const {
    params: { brand },
  } = useRoute<BrandProductRouteProps>();
  const { fetch, refresh, loadMore } = useProductListActions();
  const {
    stateProduct: { list: productListState },
    dispatchProduct,
  } = useProductContext();

  useFocusEffect(
    useCallback(() => {
      fetch(dispatchProduct, { brandId: brand.id });
    }, []),
  );
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <View style={{ flex: 1 }}>
        <ProductList
          products={productListState.data}
          headerTitle={brand.name}
          isRefreshing={productListState.refresh}
          onFetch={(queryOptions) =>
            fetch(dispatchProduct, {
              brandId: brand.id,
              ...queryOptions,
            })
          }
          onRefresh={(queryOptions) =>
            refresh(dispatchProduct, {
              brandId: brand.id,
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
              { brandId: brand.id, ...queryOptions },
            )
          }
        />
      </View>
    </SnbContainer>
  );
};

export default BrandProductView;
