/** === IMPORT PACKAGES ===  */
import React, { FC, useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { SnbContainer, SnbBottomSheet } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import Action from '@core/components/modal-actions';
import NavigationHeader from './NavigationHeader';
import CategoryTabList from './CategoryTabList';
import GridLayout from './grid-layout/GridLayout';
import ListLayout from './ListLayout';
import BottomAction from './BottomAction';
import RegisterSupplierModal from './RegisterSupplierModal';
/** === IMPORT FUNCTIONS === */
import {
  useBottomAction,
  priceSortOptions,
  useRegisterSupplierModal,
} from '@core/functions/product';
import { useTagListActions } from '@screen/product/functions';
import { useProductContext, useTagContext } from 'src/data/contexts/product';
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
  headerType?: ProductHeaderType;
  headerTitle?: string;
  categoryTabs?: boolean;
  categoryTabsConfig?: CategoryTabsConfig;
  isRefreshing: boolean;
  onRefresh: (queryOptions: models.ProductListQueryOptions) => void;
  onFetch: (queryOptions: models.ProductListQueryOptions) => void;
  onLoadMore: (queryOptions: models.ProductListQueryOptions) => void;
  activeKeyword?: string;
  activeCategory?: CategoryType;
}
/** === COMPONENT === */
const ProductList: FC<ProductListProps> = ({
  products,
  categoryTabs = false,
  categoryTabsConfig,
  headerType = 'default',
  headerTitle,
  isRefreshing,
  onRefresh,
  onFetch,
  onLoadMore,
  activeKeyword = '',
  activeCategory,
}) => {
  /** === HOOKS === */
  const [searchKeyword, setSearchKeyword] = useState(activeKeyword);
  const [keywordSearched, setKeywordSearched] = useState(false);
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
  } = useBottomAction(onFetch, {
    keyword: searchKeyword,
    categoryId: selectedCategory?.id,
  });
  const registerSupplierModal = useRegisterSupplierModal();
  const tagActions = useTagListActions();
  const {
    stateProduct: {
      list: { loading: productLoading },
    },
  } = useProductContext();
  const {
    stateTag: {
      list: { data: tagList },
    },
    dispatchTag,
  } = useTagContext();
  const tagNames = useMemo(() => tagList.map((tag) => tag.tags), [tagList]);

  useEffect(() => {
    if (!productLoading) {
      setKeywordSearched(false);
    }
  }, [productLoading]);

  useEffect(() => {
    tagActions.fetch(dispatchTag, { categoryId: selectedCategory?.id });
  }, [selectedCategory, keywordSearched]);
  /** === DERIVED === */
  const derivedQueryOptions: models.ProductListQueryOptions = {
    keyword: searchKeyword,
    categoryId: selectedCategory?.id,
    sort: sortQuery?.sort,
    sortBy: sortQuery?.sortBy,
    minPrice: filterQuery?.minPrice,
    maxPrice: filterQuery?.maxPrice,
  };

  const handleTagPress = (tags: Array<string>) => {
    const queryOptions = {
      ...derivedQueryOptions,
      tags,
    };
    onFetch(queryOptions);
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
          setKeywordSearched(true);
          onFetch(queryOptions);
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
            onFetch(queryOptions);
          }}
        />
      )}
      <View style={{ flex: 1 }}>
        {layoutDisplay === 'grid' ? (
          <GridLayout
            products={products}
            tags={tagNames}
            onTagPress={handleTagPress}
            tagListComponentKey={selectedCategory?.id}
            onOrderPress={() => registerSupplierModal.setVisible(true)}
            isRefreshing={isRefreshing}
            onRefresh={() => onRefresh(derivedQueryOptions)}
            onLoadMore={() => onLoadMore(derivedQueryOptions)}
          />
        ) : (
          <ListLayout
            products={products}
            tags={tagNames}
            onTagPress={handleTagPress}
            tagListComponentKey={selectedCategory?.id}
            onOrderPress={() => registerSupplierModal.setVisible(true)}
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
      {/* Register Supplier Modal */}
      <RegisterSupplierModal
        visible={registerSupplierModal.visible}
        onSubmit={registerSupplierModal.sendSupplierData}
        onClose={() => registerSupplierModal.setVisible(false)}
      />
    </SnbContainer>
  );
};

export default ProductList;
