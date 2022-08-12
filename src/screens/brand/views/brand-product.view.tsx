/** === IMPORT PACKAGES ===  */
import React, { FC, useCallback, memo } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
/** === IMPORT COMPONENT === */
import { Header } from '../components';
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
/** === IMPORT FUNCTIONS === */
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { useProductListActions } from '@screen/product/functions';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === TYPES === */
type BrandProductRouteParams = {
  BrandProduct: {
    brand: models.BrandListItem;
  };
};

type BrandProductRouteProps = RouteProp<
  BrandProductRouteParams,
  'BrandProduct'
>;
/** === CONSTANT */
const testID = 'brand-product';
/** === COMPONENT === */
const BrandProductView: FC = () => {
  /** === HOOKS === */
  const {
    params: { brand },
  } = useRoute<BrandProductRouteProps>();
  const { setQuery } = useProductListContext();
  const { fetch, clearContents } = useProductListActions();
  const { dispatchProduct } = useProductContext();

  useFocusEffect(
    useCallback(() => {
      fetch(dispatchProduct, { brandId: brand.id });
      setQuery({ brandId: brand.id });
      return () => clearContents(dispatchProduct);
    }, []),
  );
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <View style={{ flex: 1 }}>
        <Header />
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
// wrap context state global for brand product list
export default memo(() => (
  <ProductListProvider>
    <BrandProductView />
  </ProductListProvider>
));
