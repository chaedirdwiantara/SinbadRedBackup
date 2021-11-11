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
import AddToCartModal from './AddToCartModal';
import {
  RegisterSupplierModal,
  RejectApprovalModal,
  WaitingApprovalModal,
} from '@core/components/modal';
/** === IMPORT FUNCTIONS === */
import {
  useBottomAction,
  priceSortOptions,
  useOrderModalVisibility,
} from '@core/functions/product';
import {
  useTagListActions,
  useProductDetailAction,
} from '@screen/product/functions';
import { useProductContext, useTagContext } from 'src/data/contexts/product';
import { useSupplierSegmentationAction } from '@core/functions/supplier/supplier-hook.function';
import { useSupplierContext } from 'src/data/contexts/supplier/useSupplierContext';
import { useAuthCoreAction } from '@core/functions/auth';
import { useDataAuth } from '@core/redux/Data';
import {
  useCheckDataSupplier,
  useRegisterSupplierModal,
} from '@core/functions/supplier';
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
  activeBrandId?: string;
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
  activeBrandId,
}) => {
  /** === HOOKS === */
  const [searchKeyword, setSearchKeyword] = useState(activeKeyword);
  const [keywordSearched, setKeywordSearched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | undefined
  >(activeCategory);
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

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
    tags: selectedTags,
  });
  const registerSupplierModal = useRegisterSupplierModal();
  const { orderModalVisible, setOrderModalVisible } = useOrderModalVisibility();
  const tagActions = useTagListActions();
  const productDetailActions = useProductDetailAction();
  const supplierSegmentationAction = useSupplierSegmentationAction();
  const authCoreAction = useAuthCoreAction();
  const {
    stateProduct: {
      list: { loading: productLoading },
    },
    dispatchProduct,
  } = useProductContext();
  const {
    stateTag: {
      list: { data: tagList },
    },
    dispatchTag,
  } = useTagContext();
  const { me } = useDataAuth();
  const {
    stateSupplier: {
      segmentation: { data: dataSegmentation },
    },
    dispatchSupplier,
  } = useSupplierContext();
  const tagNames = useMemo(() => tagList.map((tag) => tag.tags), [tagList]);
  /** => check data supplier and sinbad status */
  const {
    checkUser,
    modalRejectApproval,
    modalWaitingApproval,
    onFunctionActions,
  } = useCheckDataSupplier();

  useEffect(() => {
    if (!productLoading) {
      setKeywordSearched(false);
    }
  }, [productLoading]);

  useEffect(() => {
    tagActions.fetch(dispatchTag, {
      categoryId: selectedCategory?.id,
      keyword: searchKeyword,
      brandId: activeBrandId,
    });
  }, [selectedCategory, keywordSearched]);

  useEffect(() => {
    console.log('[TEST]: ', me.data, dataSegmentation);
    if (me.data !== null && dataSegmentation !== null) {
      if (dataSegmentation.dataSuppliers !== null) {
        checkUser({
          sinbadStatus: me.data.approvalStatus,
          supplierStatus: dataSegmentation?.dataSuppliers?.approvalStatus,
        });
      } else {
        checkUser({
          sinbadStatus: me.data.approvalStatus,
          supplierStatus: null,
        });
      }
    }
  }, [me.data, dataSegmentation]);

  const handleOrderPress = (product: models.ProductList) => {
    authCoreAction.me();
    supplierSegmentationAction.fetch(dispatchSupplier, product.sellerId);
    productDetailActions.fetch(dispatchProduct, product.id);
  };
  /** === DERIVED === */
  const derivedQueryOptions: models.ProductListQueryOptions = {
    keyword: searchKeyword,
    categoryId: selectedCategory?.id,
    sort: sortQuery?.sort,
    sortBy: sortQuery?.sortBy,
    minPrice: filterQuery?.minPrice,
    maxPrice: filterQuery?.maxPrice,
    tags: selectedTags,
  };

  const handleTagPress = (tags: Array<string>) => {
    setSelectedTags(tags);
    onFetch({ ...derivedQueryOptions, tags });
  };
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <NavigationHeader
        title={selectedCategory ? selectedCategory.name : headerTitle}
        type={headerType}
        setSearchKeyword={setSearchKeyword}
        keyword={searchKeyword}
        onSearch={() => {
          setKeywordSearched(true);
          onFetch({ ...derivedQueryOptions, keyword: searchKeyword });
        }}
        onSearchClear={() => {
          setSearchKeyword('');
          setKeywordSearched(true);
          onFetch({ ...derivedQueryOptions, keyword: '' });
        }}
      />
      {categoryTabs && (
        <CategoryTabList
          level={categoryTabsConfig?.level!}
          selectedFirstLevelIndex={categoryTabsConfig?.firstLevelIndex!}
          selectedSecondLevelIndex={categoryTabsConfig?.secondLevelIndex!}
          selectedThirdLevelIndex={categoryTabsConfig?.thirdLevelIndex}
          onTabChange={(category) => {
            setSelectedCategory(category);
            onFetch({ ...derivedQueryOptions, categoryId: category.id });
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
            onOrderPress={(product) => handleOrderPress(product)}
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
            onOrderPress={(product) => handleOrderPress(product)}
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
        actionIcon="close"
        content={
          <Action.Filter
            appliedFilterQuery={filterQuery}
            onButtonPress={handleActionClick}
          />
        }
        closeAction={() => handleActionClick({ type: 'filter' })}
      />
      {/* Register Supplier Modal */}
      <RegisterSupplierModal
        visible={registerSupplierModal.visible}
        onSubmit={() =>
          registerSupplierModal.sendSupplierData(setOrderModalVisible)
        }
        onClose={() => registerSupplierModal.setVisible(false)}
      />
      {/* Waiting Approval Modal */}
      <WaitingApprovalModal
        visible={modalWaitingApproval}
        onSubmit={() => onFunctionActions({ type: 'close' })}
        onClose={() => onFunctionActions({ type: 'close' })}
      />
      {/* Reject Approval Modal */}
      <RejectApprovalModal
        visible={modalRejectApproval}
        onSubmit={() => onFunctionActions({ type: 'close' })}
        onClose={() => onFunctionActions({ type: 'close' })}
        isCallCS={true}
      />
      {/* Add to Cart Modal */}
      {orderModalVisible && (
        <AddToCartModal
          open={orderModalVisible}
          closeAction={() => setOrderModalVisible(false)}
          onAddToCartPress={() => console.log('Add to cart pressed')}
        />
      )}
    </SnbContainer>
  );
};

export default ProductList;
