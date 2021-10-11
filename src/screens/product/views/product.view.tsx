/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import ProductHeaderView from './product-header.view';
import ProductTabView from './product-tab.view';
import ProductListView from '@core/components/product/list';
import { contexts } from '@contexts';
import { goBack, useTabCategory, useProductListAction } from '../functions';
/** === COMPONENT === */
const ProductView: FC = () => {
  /** === HOOK === */
  const { list } = useProductListAction();
  const { stateProduct, dispatchProduct } = React.useContext(
    contexts.ProductContext,
  );
  /** === EFFECT === */
  React.useEffect(() => {
    list(dispatchProduct);
  }, []);
  /** === VIEW === */
  /** => header */
  const header = () => {
    return <ProductHeaderView />;
  };
  /** => tab */
  const tab = () => {
    return <ProductTabView />;
  };
  /** => product list */
  const productList = () => {
    return <ProductListView data={stateProduct.list} />;
  };
  /** => content */
  const content = () => {
    return (
      <View style={{ flex: 1 }}>
        {tab()}
        {productList()}
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default ProductView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
