/** === IMPORT PACKAGES ===  */
import React, { FC, useState } from 'react';
import { View, Image } from 'react-native';
import {
  SnbContainer,
  SnbBottomSheet,
  SnbButton,
  SnbText,
  color,
} from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import Action from '@core/components/modal-actions';
import NavigationHeader from './NavigationHeader';
import CategoryTabList from './CategoryTabList';
import GridLayout from './grid-layout/GridLayout';
import ListLayout from './ListLayout';
import BottomAction from './BottomAction';
/** === IMPORT FUNCTIONS === */
import { useBottomAction, priceSortOptions } from '@core/functions/product';
/** === IMPORT TYPES === */
import * as models from '@models';
import {
  ProductHeaderType,
  CategoryTabsConfig,
  CategoryType,
} from './product-list-core.type';
/** === TYPE === */
interface ProductListProps {
  products: Array<models.ProductList>;
  onOrderPress: (item: models.ProductList) => void;
  headerType?: ProductHeaderType;
  headerTitle?: string;
  onHeaderSearch?: (queryOptions: models.ProductListQueryOptions) => void;
  categoryTabs?: boolean;
  categoryTabsConfig?: CategoryTabsConfig;
  isRefreshing: boolean;
  onRefresh: (queryOptions: models.ProductListQueryOptions) => void;
  onLoadMore: (queryOptions: models.ProductListQueryOptions) => void;
  activeKeyword?: string;
  activeCategory?: CategoryType;
}
/** === DUMMY === */
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
/** === COMPONENT === */
const ProductList: FC<ProductListProps> = ({
  products,
  onOrderPress,
  categoryTabs = false,
  categoryTabsConfig,
  headerType = 'default',
  headerTitle,
  onHeaderSearch,
  isRefreshing,
  onRefresh,
  onLoadMore,
  activeKeyword = '',
  activeCategory,
}) => {
  /** === HOOKS === */
  const [searchKeyword, setSearchKeyword] = useState(activeKeyword);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | undefined
  >(activeCategory);
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
    registerSupplierModalVisible,
  } = useBottomAction(onRefresh, {
    keyword: searchKeyword,
    categoryId: selectedCategory?.id,
  });
  /** === DERIVED VALUE === */
  const derivedQueryOptions: models.ProductListQueryOptions = {
    keyword: searchKeyword,
    categoryId: selectedCategory?.id,
    sort: sortQuery?.sort,
    sortBy: sortQuery?.sortBy,
    minPrice: filterQuery?.minPrice,
    maxPrice: filterQuery?.maxPrice,
  };
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <NavigationHeader
        title={selectedCategory ? selectedCategory.name : headerTitle}
        type={headerType}
        setSearchKeyword={setSearchKeyword}
        onSearch={() => {
          const queryOptions = {
            ...derivedQueryOptions,
            keyword: searchKeyword,
          };

          if (onHeaderSearch) {
            onHeaderSearch(queryOptions);
          }
        }}
      />
      {categoryTabs && (
        <CategoryTabList
          level={categoryTabsConfig?.level!}
          selectedFirstLevelIndex={categoryTabsConfig?.firstLevelIndex!}
          selectedSecondLevelIndex={categoryTabsConfig?.secondLevelIndex!}
          selectedThirdLevelIndex={categoryTabsConfig?.thirdLevelIndex}
          onTabChange={(category) => {
            const queryOptions = {
              ...derivedQueryOptions,
              categoryId: category.id,
            };
            setSelectedCategory(category);
            onRefresh(queryOptions);
          }}
        />
      )}
      <View style={{ flex: 1 }}>
        {layoutDisplay === 'grid' ? (
          <GridLayout
            products={products}
            tags={dummyTags}
            onTagPress={(tags) => console.log(`Active tags: ${tags}`)}
            onOrderPress={onOrderPress}
            isRefreshing={isRefreshing}
            onRefresh={() => onRefresh(derivedQueryOptions)}
            onLoadMore={() => onLoadMore(derivedQueryOptions)}
          />
        ) : (
          <ListLayout
            products={products}
            tags={dummyTags}
            onTagPress={(tags) => console.log(`Active tags: ${tags}`)}
            onOrderPress={onOrderPress}
            isRefreshing={isRefreshing}
            onRefresh={() => onRefresh(derivedQueryOptions)}
            onLoadMore={() => onLoadMore(derivedQueryOptions)}
          />
        )}
      </View>
      <BottomAction
        sort={true}
        filter={true}
        layout={true}
        category={true}
        sortActive={sortActive}
        filterActive={filterActive}
        layoutDisplay={layoutDisplay}
        onActionPress={handleActionClick}
      />
      {/* Sort Modal */}
      <SnbBottomSheet
        open={sortModalVisible}
        title="Urutkan"
        action={true}
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
      {/* Filter Modal */}
      <SnbBottomSheet
        open={filterModalVisible}
        title="Filter"
        action={true}
        actionIcon="close"
        content={<Action.Filter onButtonPress={handleActionClick} />}
        closeAction={() => handleActionClick({ type: 'filter' })}
      />
      {/** === RENDER MODAL REGISTER SUPPLIER === */}
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
                onPress={() => handleActionClick({ type: 'sendDataSupplier' })}
                disabled={false}
              />
            </View>
          </View>
        }
        closeAction={() =>
          handleActionClick({ type: 'registerSupplierVisible' })
        }
      />
    </SnbContainer>
  );
};

export default ProductList;
