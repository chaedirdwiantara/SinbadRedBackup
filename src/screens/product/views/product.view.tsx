/** === IMPORT PACKAGES ===  */
import React, { FC, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import ProductHeaderView from './product-header.view';
import ProductTabView from './product-tab.view';
import { AddToCartModal } from './AddToCartModal';
import ProductListView from '@core/components/product/list';
/** === IMPORT FUNCTIONS === */
import { contexts } from '@contexts';
<<<<<<< HEAD
import { useProductListAction } from '../functions';
=======
import { useProductListAction, useModalVisibility } from '../functions';
>>>>>>> 1d0fabf6c7781738c513d0e502e16bb3874fa1c1
/** === COMPONENT === */
const ProductView: FC = () => {
  /** === HOOKS === */
  const { list } = useProductListAction();
  const { stateProduct, dispatchProduct } = useContext(contexts.ProductContext);
<<<<<<< HEAD
=======
  const { orderModalVisible, setOrderModalVisible } = useModalVisibility();
>>>>>>> 1d0fabf6c7781738c513d0e502e16bb3874fa1c1

  useEffect(() => {
    list(dispatchProduct);
  }, []);
  /** === VIEW === */
<<<<<<< HEAD
=======
  /** => Add to Cart Modal */
  const renderAddToCartModal = () => (
    <AddToCartModal
      open={orderModalVisible}
      closeAction={() => setOrderModalVisible(false)}
      onAddToCartPress={() => console.log('Add to cart pressed')}
    />
  );
>>>>>>> 1d0fabf6c7781738c513d0e502e16bb3874fa1c1
  /** => Content */
  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <ProductTabView />
<<<<<<< HEAD
        <ProductListView data={stateProduct.list} />
=======
        <ProductListView
          data={stateProduct.list}
          onCardPress={(item) => console.log(`${item.name} pressed`)}
          onOrderPress={() => setOrderModalVisible(true)}
        />
>>>>>>> 1d0fabf6c7781738c513d0e502e16bb3874fa1c1
      </View>
    );
  };
  /** => Main */
  return (
    <SnbContainer color="white">
      <ProductHeaderView />
      {renderContent()}
<<<<<<< HEAD
=======
      {renderAddToCartModal()}
>>>>>>> 1d0fabf6c7781738c513d0e502e16bb3874fa1c1
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
<<<<<<< HEAD
 * updatedDate: 12-10-21
=======
 * updatedDate: 14-10-21
>>>>>>> 1d0fabf6c7781738c513d0e502e16bb3874fa1c1
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
