/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  color,
  SnbContainer,
  SnbText,
  SnbBottomSheet,
  SnbButton,
} from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import GridLayoutView from './grid-layout.view';
import ListLayoutView from './list-layout.view';
import BottomActionView from './bottom-action.view';
import { Action } from '@core/components/Action';
/** === IMPORT FUNCTIONS === */
import { useBottomAction, useDataSort } from '@core/functions/product';
/** === IMPORT MODEL === */
import * as models from '@models';
/** === TYPE === */
interface ProductComponentProps {
  data: models.ListItemProps<models.ProductList[]>;
  onCardPress: (item: models.ProductList) => void;
  onOrderPress: (item: models.ProductList) => void;
}
/** === DUMMIES === */
const dummyTags: Array<string> = [
  'Fresh',
  'Cream',
  'Honey',
  'Anak',
  'Almond',
  'Perfect',
  'Liquid',
  'Remover',
];
const dummyProducts = {
  data: [
    {
      id: '1',
      name: 'LAKME CC CREAM ALMOND',
      image:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
      currentPrice: 77891,
      isBundle: false,
      isPromo: true,
      isExclusive: true,
      segmentationPrice: 77891,
      retailBuyingPrice: 77891,
    },
    {
      id: '2',
      name: 'LAKME BLUR PERFECT CREAMER',
      image:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
      currentPrice: 150000,
      isBundle: false,
      isPromo: false,
      isExclusive: false,
      segmentationPrice: 150000,
      retailBuyingPrice: 150000,
    },
    {
      id: '3',
      name: 'LAKME ABSOLUTE LIQUID CONCEALER IVORY FAIR',
      image:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67145109.png',
      currentPrice: 98782,
      isBundle: true,
      isPromo: true,
      isExclusive: true,
      segmentationPrice: 98782,
      retailBuyingPrice: 98782,
    },
    {
      id: '4',
      name: 'LAKME BIPHASED MAKEUP REMOVER',
      image:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/21158106.png',
      currentPrice: 72000,
      isBundle: false,
      isPromo: true,
      isExclusive: false,
      segmentationPrice: 72000,
      retailBuyingPrice: 72000,
    },
    {
      id: '5',
      name: 'LAKME CC CREAM HONEY',
      image:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400582.png',
      currentPrice: 77891,
      isBundle: false,
      isPromo: false,
      isExclusive: true,
      segmentationPrice: 77891,
      retailBuyingPrice: 77891,
    },
  ],
  loading: false,
  loadMore: false,
  refresh: false,
  error: null,
  total: 5,
  skip: 0,
};
/** === COMPONENT === */
const ProductListView: FC<ProductComponentProps> = ({
  data,
  onCardPress,
  onOrderPress,
}) => {
  /** === HOOK === */
  const {
    layoutDisplay,
    handleActionClick,
    sortActive,
    filterActive,
    filterModalVisible,
    sortModalVisible,
    filterParams,
    sortDataIndex,
    registerSupplierModalVisible,
  } = useBottomAction();

  const { sortData } = useDataSort();
  /** === VIEW === */
  /** => List */
  const renderList = () =>
    layoutDisplay === 'grid' ? (
      <GridLayoutView
        data={data}
        tags={dummyTags}
        onTagPress={(tags) => console.log(`Active tags: ${tags}`)}
        onCardPress={onCardPress}
        onOrderPress={onOrderPress}
      />
    ) : (
      <ListLayoutView
        data={dummyProducts}
        tags={dummyTags}
        onTagPress={(tags) => console.log(`Active tags: ${tags}`)}
        onCardPress={onCardPress}
        onOrderPress={onOrderPress}
      />
    );
  /** => Content */
  const renderContent = () => {
    return <View style={{ flex: 1 }}>{renderList()}</View>;
  };

  /** === RENDER MODAL SORT === */
  const renderModalSort = () => {
    return (
      <SnbBottomSheet
        open={sortModalVisible}
        title={'Urutkan'}
        action
        actionIcon="close"
        content={
          <Action.SortMenuType1
            sortDataIndex={sortDataIndex}
            sortData={sortData}
            onChange={() => {}}
          />
        }
        closeAction={() => handleActionClick({ type: 'sort' })}
      />
    );
  };

  /** === RENDER MODAL FILTER === */
  const renderModalFilter = () => {
    return (
      <SnbBottomSheet
        open={filterModalVisible}
        title={'Filter'}
        action
        actionIcon="close"
        content={
          <Action.FilterMenuType1
            priceGteMasking={filterParams.priceGteMasking}
            priceLteMasking={filterParams.priceLteMasking}
            priceGte={filterParams.priceGte}
            priceLte={filterParams.priceLte}
            onChange={() => {}}
          />
        }
        closeAction={() => handleActionClick({ type: 'filter' })}
      />
    );
  };

  /** === RENDER MODAL REGISTER SUPPLIER === */
  const renderModalRegisterSupplier = () => {
    return (
      <SnbBottomSheet
        open={registerSupplierModalVisible}
        title={' '}
        action={true}
        actionIcon="close"
        content={
          <View
            style={{
              backgroundColor: color.white,
            }}>
            <View style={{ alignItems: 'center', paddingHorizontal: 16 }}>
              <Image
                source={require('../../../../src/assets/images/no_gps.png')}
                style={{ width: 200, marginBottom: 16 }}
              />
              <SnbText.B2 color={color.black100}>
                Supplier butuh datamu nih
              </SnbText.B2>
              <View style={{ marginTop: 8 }}>
                <SnbText.C1 color={color.black100} align={'center'}>
                  Kirim data Anda ke supplier untuk dapat berbelanja produk
                  supplier terkait sekarang yuk !
                </SnbText.C1>
              </View>
            </View>
            <View style={{ marginTop: 32, height: 72 }}>
              <SnbButton.Single
                type="primary"
                title="Kirim data ke Supplier"
                onPress={() => console.log('Kirim data ke Supplier')}
                disabled={false}
              />
            </View>
          </View>
        }
        closeAction={() =>
          handleActionClick({ type: 'registerSupplierVisible' })
        }
      />
    );
  };

  /** => Main */
  return (
    <SnbContainer color="white">
      {renderContent()}
      <TouchableOpacity
        style={{
          padding: 16,
          backgroundColor: color.yellow40,
          alignItems: 'center',
        }}
        onPress={() =>
          handleActionClick({
            type: 'applySort',
            value: { sortBy: 'price', sort: 'asc' },
          })
        }>
        <SnbText.B4>Apply Sort</SnbText.B4>
      </TouchableOpacity>
      <BottomActionView
        sort={true}
        filter={true}
        layout={true}
        category={true}
        sortActive={sortActive}
        filterActive={filterActive}
        layoutDisplay={layoutDisplay}
        onActionPress={handleActionClick}
      />
      {renderModalSort()}
      {renderModalFilter()}
      {renderModalRegisterSupplier()}
    </SnbContainer>
  );
};

export default ProductListView;
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
