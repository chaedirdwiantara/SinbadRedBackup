/** === IMPORT PACKAGES ===  */
import React, { FC, useState, useEffect, useReducer } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import {
  SnbContainer,
  SnbTabs,
  SnbBottomSheet,
  color,
} from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import Action from '@core/components/modal-actions';
import BottomAction from '@core/components/product/list/BottomAction';
import { SupplierHeader } from './SupplierHeader';
import { SupplierInfo } from './SupplierInfo';
import { SupplierProfile } from './SupplierProfile';
import { SupplierProduct } from './SupplierProduct';
import { SupplierBrandList } from './SupplierBrandList';
/** === IMPORT FUNCTIONS ===  */
import { scrollHasReachedEnd } from '@core/functions/global/scroll-position';
import {
  useBottomAction,
  priceSortOptions,
  useProductTags,
} from '@core/functions/product';
import { useBrandListAction } from '@screen/brand/functions';
import {
  useProductListActions,
  useTagListActions,
} from '@screen/product/functions';
import { useBrandContext } from 'src/data/contexts/brand/useBrandContext';
import { useProductContext, useTagContext } from 'src/data/contexts/product';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === IMPORT DUMMY === */
import { supplierDummy } from './supplier.dummy';
/** === COMPONENT === */
const SupplierView: FC = () => {
  /** === HOOKS === */
  const {
    stateBrand: { list: brandListState },
    dispatchBrand,
  } = useBrandContext();
  const { dispatchTag } = useTagContext();
  const {
    stateProduct: { list: productListState },
    dispatchProduct,
  } = useProductContext();
  const { fetch: fetchBrands } = useBrandListAction();
  const { fetch: fetchTags } = useTagListActions();
  const { fetch, loadMore } = useProductListActions();

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const fetchProductFnWithTags = (currentTags: Array<string>) => {
    fetch(dispatchProduct, {
      ...productQueryOptions,
      tags: currentTags,
    });
  };
  const { tags, selectedTags, handleTagPress } = useProductTags(
    fetchProductFnWithTags,
  );
  // Only for the sake of running fetching functions again if refresh is triggered
  const [refreshCount, triggerRefresh] = useReducer((state) => state + 1, 0);

  const {
    sortModalVisible,
    sortActive,
    sortIndex,
    sortQuery,
    filterModalVisible,
    filterActive,
    filterQuery,
    layoutDisplay,
    handleActionClick,
  } = useBottomAction((queryOptions) => fetch(dispatchProduct, queryOptions), {
    tags: selectedTags,
    // sellerId query is not implemented yet at the back
    // sellerId: supplierDummy.id,
  });

  useEffect(() => {
    fetchBrands(dispatchBrand, {
      // sellerId query is not implemented yet at the back
      // sellerId: supplierDummy.id
    });
  }, [refreshCount]);

  useEffect(() => {
    fetchTags(dispatchTag, {
      // sellerId query is not implemented yet at the back
      // sellerId: supplierDummy.id
    });
  }, [refreshCount]);

  useEffect(() => {
    fetch(dispatchProduct, {
      // sellerId query is not implemented yet at the back
      // sellerId: supplierDummy.id
    });
  }, [refreshCount]);
  /** === DERIVED === */
  const productQueryOptions: models.ProductListQueryOptions = {
    sort: sortQuery?.sort,
    sortBy: sortQuery?.sortBy,
    minPrice: filterQuery?.minPrice,
    maxPrice: filterQuery?.maxPrice,
    tags: selectedTags,
    // sellerId query is not implemented yet at the back
    // sellerId: supplierDummy.id,
  };
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <SupplierHeader
        keyword={searchKeyword}
        onKeywordClear={() => setSearchKeyword('')}
        onKeywordChange={(value: string) => setSearchKeyword(value)}
        cartBadge={10}
      />
      <ScrollView
        stickyHeaderIndices={[1]}
        refreshControl={
          <RefreshControl
            refreshing={productListState.refresh}
            onRefresh={triggerRefresh}
          />
        }
        onScroll={({ nativeEvent }) => {
          if (scrollHasReachedEnd(nativeEvent)) {
            if (!productListState.loading) {
              loadMore(
                dispatchProduct,
                {
                  skip: productListState.skip,
                  canLoadMore: productListState.canLoadMore,
                },
                productQueryOptions,
              );
            }
          }
        }}
        scrollEventThrottle={10}>
        <SupplierInfo
          name={supplierDummy.name}
          urbanCity={supplierDummy.urbanCity}
          transactionTotal={supplierDummy.transactionTotal}
          registeredMerchantTotal={supplierDummy.registeredMerchantTotal}
        />
        <View style={{ backgroundColor: color.white }}>
          <SnbTabs.Fixed
            tabs={['Produk', 'Profile']}
            activeTabs={activeTabIndex}
            onChangeActiveTabs={(index: number) => setActiveTabIndex(index)}
          />
        </View>
        {activeTabIndex === 0 ? (
          <>
            <SupplierBrandList
              brands={brandListState.data}
              loading={brandListState.loading}
            />
            <SupplierProduct
              tags={tags}
              products={productListState.data}
              layoutDisplay={layoutDisplay}
              onTagPress={handleTagPress}
              onOrderPress={(product) => {
                // Will be moved to it's own function later
                console.log(`${product.name} is added to Cart`);
              }}
              loading={productListState.loading}
              error={productListState.error}
            />
          </>
        ) : (
          <SupplierProfile
            description={supplierDummy.description}
            businessType={supplierDummy.businessType}
            legalEntity={supplierDummy.legalEntity}
            foundedYear={supplierDummy.foundedYear}
            employeesTotal={supplierDummy.employeesTotal}
            joinedYear={supplierDummy.joinedYear}
            taxIdentificationVerified={supplierDummy.taxIdentificationVerified}
            address={supplierDummy.address}
          />
        )}
      </ScrollView>
      <BottomAction
        sort={true}
        filter={true}
        layout={true}
        sortActive={sortActive}
        filterActive={filterActive}
        layoutDisplay={layoutDisplay}
        onActionPress={handleActionClick}
      />
      {sortModalVisible && (
        <SnbBottomSheet
          open={sortModalVisible}
          title="Urutkan"
          actionIcon="close"
          content={
            <Action.Sort
              appliedOptionIndex={sortIndex}
              options={priceSortOptions}
              onButtonPress={handleActionClick}
            />
          }
          closeAction={() => handleActionClick({ type: 'sort' })}
        />
      )}
      {filterModalVisible && (
        <SnbBottomSheet
          open={filterModalVisible}
          title="Filter"
          actionIcon="close"
          content={
            <Action.Filter
              appliedFilterQuery={filterQuery}
              onButtonPress={handleActionClick}
            />
          }
          closeAction={() => handleActionClick({ type: 'filter' })}
        />
      )}
    </SnbContainer>
  );
};

export default SupplierView;
