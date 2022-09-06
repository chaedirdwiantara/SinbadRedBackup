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
import ModalErrorAddToCartView from '@core/components/product/product-list/modal-error-add-to-cart.view';
import { ProductListProvider } from '@core/components/product/product-list/product-list.context';
/** === IMPORT FUNCTIONS === */
import { useProductListContext } from '@core/components/product/product-list/function/product-list.util';
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
  const { setQuery, setSearch } = useProductListContext();
  const { fetch, clearContents } = useProductListActions();
  const { dispatchProduct } = useProductContext();

  // initial get
  useEffect(() => {
    fetch(dispatchProduct, { brandId: brand.id });
    setQuery({ brandId: brand.id });
    // clean keyword search
    setSearch(undefined);
    return () => clearContents(dispatchProduct);
  }, []);
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
        <ModalErrorAddToCartView testID={testID} />
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
