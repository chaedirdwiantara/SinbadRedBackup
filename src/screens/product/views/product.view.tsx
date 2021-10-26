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
import { NavigationAction } from '@core/functions/navigation';
import { useBottomAction } from '@core/functions/product';
import { useProductListAction, useModalVisibility } from '../functions';
/** === COMPONENT === */
const ProductView: FC = () => {
  /** === HOOKS === */
  const { list } = useProductListAction();
  const { stateProduct, dispatchProduct } = useContext(contexts.ProductContext);
  const { orderModalVisible, setOrderModalVisible } = useModalVisibility();
  const { handleActionClick } = useBottomAction();

  useEffect(() => {
    list(dispatchProduct);
  }, []);

  /** === VIEW === */
  /** => Add to Cart Modal */
  const renderAddToCartModal = () => (
    <AddToCartModal
      open={orderModalVisible}
      closeAction={() => setOrderModalVisible(false)}
      onAddToCartPress={() => console.log('Add to cart pressed')}
    />
  );
  /** => Content */
  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <ProductTabView />
        <ProductListView
          data={stateProduct.list}
          onCardPress={() => NavigationAction.navigate('ProductDetailView')}
          onOrderPress={() =>
            handleActionClick({ type: 'registerSupplierVisible' })
          }
        />
      </View>
    );
  };

  /** => Main */
  return (
    <SnbContainer color="white">
      <ProductHeaderView />
      {renderContent()}
      {renderAddToCartModal()}
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
 * updatedDate: 14-10-21
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
