/** === IMPORT PACKAGES ===  */
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { SnbContainer, SnbBottomSheet } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import { Action } from '@core/components/Action';
import NavigationHeader from './NavigationHeader';
import CategoryTabList from './CategoryTabList';
import GridLayout from './GridLayout';
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
  /** => Navigation Header */
  const renderNavigationHeader = () => (
    <NavigationHeader
      title={selectedCategory ? selectedCategory.name : headerTitle}
      type={headerType}
      setSearchKeyword={setSearchKeyword}
      onSearch={() => {
        const queryOptions = { ...derivedQueryOptions, keyword: searchKeyword };

        if (onHeaderSearch) {
          onHeaderSearch(queryOptions);
        }
      }}
    />
  );
  /** => Category Tabs */
  const renderCategoryTabList = () => {
    return (
      categoryTabs && (
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
      )
    );
  };
  /** => List */
  const renderList = () =>
    layoutDisplay === 'grid' ? (
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
    );
  /** => Content */
  const renderContent = () => <View style={{ flex: 1 }}>{renderList()}</View>;
  /** => Bottom Action */
  const renderBottomAction = () => (
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
  );
  /** => Filter Modal */
  const renderSortModal = () => (
    <SnbBottomSheet
      open={sortModalVisible}
      title="Urutkan"
      action={true}
      actionIcon="close"
      content={
        <Action.SortMenuType1
          appliedOptionIndex={sortIndex}
          options={priceSortOptions}
          onButtonPress={handleActionClick}
        />
      }
      closeAction={() => handleActionClick({ type: 'sort' })}
    />
  );
  /** => Filter Modal */
  const renderFilterModal = () => (
    <SnbBottomSheet
      open={filterModalVisible}
      title="Filter"
      action={true}
      actionIcon="close"
      content={<Action.FilterMenuType1 onButtonPress={handleActionClick} />}
      closeAction={() => handleActionClick({ type: 'filter' })}
    />
  );
  /** => Main */
  return (
    <SnbContainer color="white">
      {renderNavigationHeader()}
      {renderCategoryTabList()}
      {renderContent()}
      {renderBottomAction()}
      {renderSortModal()}
      {renderFilterModal()}
    </SnbContainer>
  );
};

export default ProductList;
