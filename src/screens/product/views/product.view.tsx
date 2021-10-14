/** === IMPORT PACKAGES ===  */
import React, { FC, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import ProductHeaderView from './product-header.view';
import ProductTabView from './product-tab.view';
import ProductListView from '@core/components/product/list';
/** === IMPORT FUNCTIONS === */
import { contexts } from '@contexts';
import { useProductListAction } from '../functions';
/** === COMPONENT === */
const ProductView: FC = () => {
  /** === HOOKS === */
  const { list } = useProductListAction();
  const { stateProduct, dispatchProduct } = useContext(contexts.ProductContext);

  /** === STATE */
  const [openModalSort, setOpenModalSort] = useState(false)
  const [openModalFilter, setOpenModalFilter] = useState(false)


  useEffect(() => {
    list(dispatchProduct);
  }, []);
  /** === VIEW === */
  /** => Content */
  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <ProductTabView />
        <ProductListView data={stateProduct.list} />
      </View>
    );
  };

    /**
   * =====================
   * MODAL
   * =====================
   */
  /** === RENDER MODAL SORT === */
  const renderModalSort = () => {
    return <View/>
  }

  /** === RENDER MODAL FILTER === */
  const renderModalFilter = () => {
    return <View/>
  }


  /** => Main */
  return (
    <SnbContainer color="white">
      <ProductHeaderView />
      {renderContent()}
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
 * updatedBy: aliisetia
 * updatedDate: 12-10-21
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
