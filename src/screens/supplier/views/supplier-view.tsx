/** === IMPORT PACKAGES ===  */
import React, { FC, useState } from 'react';
import { ScrollView, View } from 'react-native';
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
/** === IMPORT FUNCTIONS ===  */
import { useBottomAction, priceSortOptions } from '@core/functions/product';
import { useProductListActions } from '@screen/product/functions';
import { useProductContext } from 'src/data/contexts/product';
/** === IMPORT DUMMY === */
import { supplierDummy } from './supplier.dummy';
/** === COMPONENT === */
const SupplierView: FC = () => {
  /** === HOOKS === */
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  const {
    stateProduct: { list: productListState },
    dispatchProduct,
  } = useProductContext();
  const { fetch, refresh, loadMore } = useProductListActions();

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
    sellerId: supplierDummy.id,
    tags: selectedTags,
  });
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <SupplierHeader
        keyword={searchKeyword}
        onKeywordClear={() => setSearchKeyword('')}
        onKeywordChange={(value: string) => setSearchKeyword(value)}
        cartBadge={10}
      />
      <ScrollView style={{ flex: 1 }} stickyHeaderIndices={[1]}>
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
          <SupplierProduct
            brands={supplierDummy.brands}
            tags={supplierDummy.tags}
            products={supplierDummy.products}
            isRefreshing={false}
            onRefresh={(queryOptions) => refresh(dispatchProduct, queryOptions)}
            onFetch={(queryOptions) => fetch(dispatchProduct, queryOptions)}
            onLoadMore={(queryOptions) =>
              loadMore(
                dispatchProduct,
                {
                  skip: productListState.skip,
                  canLoadMore: productListState.canLoadMore,
                },
                queryOptions,
              )
            }
            sellerId={supplierDummy.id}
            layoutDisplay={layoutDisplay}
            sortQuery={sortQuery}
            filterQuery={filterQuery}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
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
