/** === IMPORT PACKAGES ===  */
import React, { FC, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import ProductHeaderView from './product-header.view';
import ProductTabView from './product-tab.view';
import { AddToCartModal } from './AddToCartModal';
import ProductListView from '@core/components/product/list';
import { ModalBottom } from '@core/components/BottomModal';
import { Action } from '@core/components/Action';
/** === IMPORT FUNCTIONS === */
import { contexts } from '@contexts';
import { NavigationAction } from '@core/functions/navigation';
import { useProductListAction, useModalVisibility } from '../functions';
/** === COMPONENT === */
const ProductView: FC = () => {
  /** === HOOKS === */
  const { list } = useProductListAction();
  const { stateProduct, dispatchProduct } = useContext(contexts.ProductContext);
  const { orderModalVisible, setOrderModalVisible } = useModalVisibility();

  /** === STATE */
  const [openModalSort, setOpenModalSort] = useState(false);
  const [openModalFilter, setOpenModalFilter] = useState(false);

  /** sort */
  const [sortData, setSortData] = useState([
    {
      name: 'Harga Tinggi ke Rendah',
      sortBy: 'retail_buying_price',
      sort: 'desc',
    },
    {
      name: 'Harga Rendah ke Tinggi',
      sortBy: 'retail_buying_price',
      sort: 'asc',
    },
  ]);
  const [sortDataIndex, setSortDataIndex] = useState(null);

  /** filter price */
  const [priceGteMasking, setPriceGteMasking] = useState<string | number>('');
  const [priceLteMasking, setPriceLteMasking] = useState<string | number>('');
  const [priceGte, setPriceGte] = useState<number>(0);
  const [priceLte, setPriceLte] = useState<number>(0);

  useEffect(() => {
    list(dispatchProduct);
  }, []);

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** CALLED FROM CHILD */
  const parentFunction = (data: any) => {
    switch (data.type) {
      /** => for open modal short */
      case 'sort':
        setOpenModalSort(true);
        break;
      /** => after selected sort */
      case 'sortSelected':
        setOpenModalSort(false);
        break;
      /** => for open modal filter */
      case 'filter':
        setOpenModalFilter(true);
        break;
      /** => filter selected */
      case 'filterSelected':
        setOpenModalFilter(false);
        break;
      default:
        break;
    }
  };

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
          onOrderPress={() => setOrderModalVisible(true)}
        />
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
    return openModalSort ? (
      <ModalBottom.Type1
        isOpen={openModalSort}
        title={'Urutkan'}
        typeClose={'cancel'}
        content={
          <Action.SortMenuType1
            sortDataIndex={sortDataIndex}
            sortData={sortData}
            parentFunction={() => {}}
          />
        }
        close={() => setOpenModalSort(false)}
      />
    ) : (
      <View />
    );
  };

  /** === RENDER MODAL FILTER === */
  const renderModalFilter = () => {
    return openModalFilter ? (
      <ModalBottom.Type2
        isOpen={openModalFilter}
        title={'Filter'}
        typeClose={'cancel'}
        content={
          <Action.FilterMenuType1
            priceGteMasking={priceGteMasking}
            priceLteMasking={priceLteMasking}
            priceGte={priceGte}
            priceLte={priceLte}
            parentFunction={() => {}}
          />
        }
        close={() => setOpenModalFilter(false)}
      />
    ) : (
      <View />
    );
  };

  /** => Main */
  return (
    <SnbContainer color="white">
      <ProductHeaderView />
      {renderContent()}
      {/* filter */}
      {renderModalSort()}
      {renderModalFilter()}
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
