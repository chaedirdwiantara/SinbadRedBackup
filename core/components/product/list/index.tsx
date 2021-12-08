/** === IMPORT PACKAGES ===  */
import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import { SnbContainer, SnbBottomSheet } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import Action from '@core/components/modal-actions';
import NavigationHeader from './NavigationHeader';
import CategoryTabList from './CategoryTabList';
import GridLayout from './grid-layout/GridLayout';
import ListLayout from './list-layout/ListLayout';
import BottomAction from './BottomAction';
import {
  RegisterSupplierModal,
  RejectApprovalModal,
  WaitingApprovalModal,
  ProductNotCoverageModal,
  AddToCartModal,
} from '@core/components/modal';
/** === IMPORT FUNCTIONS === */
import { useOrderQuantity } from '@screen/product/functions';
import { useCartTotalProductActions } from '@screen/oms/functions';
import {
  useBottomAction,
  priceSortOptions,
  useOrderModalVisibility,
  useProductTags,
} from '@core/functions/product';
import {
  useCheckDataSupplier,
  useSupplierSegmentationAction,
  useSendDataToSupplierActions,
} from '@core/functions/supplier';
import { useDataAuth } from '@core/redux/Data';
import {
  useTagListActions,
  useProductDetailAction,
  useAddToCart,
  useStockValidationAction,
} from '@screen/product/functions';
import { useShopingCartContext } from 'src/data/contexts/oms/shoping-cart/useShopingCartContext';
import { useProductContext, useTagContext } from 'src/data/contexts/product';
import { useSupplierContext } from 'src/data/contexts/supplier/useSupplierContext';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
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
  withCategoryTabs?: boolean;
  categoryTabsConfig?: CategoryTabsConfig;
  isRefreshing: boolean;
  onRefresh: (queryOptions: models.ProductListQueryOptions) => void;
  onFetch: (queryOptions: models.ProductListQueryOptions) => void;
  onLoadMore: (queryOptions: models.ProductListQueryOptions) => void;
  activeKeyword?: string;
  activeCategory?: CategoryType;
  activeBrandId?: string;
  withBottomAction?: boolean;
  withTags?: boolean;
}
/** === COMPONENT === */
const ProductList: FC<ProductListProps> = ({
  products,
  withCategoryTabs = false,
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
  withBottomAction = true,
  withTags = true,
}) => {
  /** === HOOKS === */
  const [searchKeyword, setSearchKeyword] = useState(activeKeyword);
  const [keywordSearched, setKeywordSearched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | undefined
  >(activeCategory);
  const fetchProductFnWithTags = (currentTags: Array<string>) => {
    onFetch({ ...derivedQueryOptions, tags: currentTags });
  };
  const { tags, selectedTags, handleTagPress } = useProductTags(
    fetchProductFnWithTags,
  );
  const [productSelected, setProductSelected] =
    useState<models.ProductList | null>(null);
  const [modalNotCoverage, setModalNotCoverage] = useState(false);

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
  const { orderModalVisible, setOrderModalVisible } = useOrderModalVisibility();
  const cartTotalProductActions = useCartTotalProductActions();
  const tagActions = useTagListActions();
  const productDetailActions = useProductDetailAction();
  const addToCartActions = useAddToCart();
  const supplierSegmentationAction = useSupplierSegmentationAction();
  const sendDataToSupplierActions = useSendDataToSupplierActions();
  const stockValidationActions = useStockValidationAction();
  const {
    stateProduct: {
      list: { loading: productLoading, error: productError },
      detail: { data: productDetailState },
    },
    dispatchProduct,
  } = useProductContext();
  const { orderQty, increaseOrderQty, decreaseOrderQty } = useOrderQuantity({
    minQty: productDetailState?.minQty,
  });
  const {
    stateShopingCart: {
      create: { data: addToCartData },
    },
    dispatchShopingCart,
  } = useShopingCartContext();
  const { dispatchTag } = useTagContext();
  const {
    stateStock: {
      validation: { data: dataStock, error: errorStock },
    },
    dispatchStock,
  } = useStockContext();
  const { me } = useDataAuth();
  const {
    stateSupplier: {
      segmentation: { data: dataSegmentation },
      create: { data: sendToSupplierData },
    },
    dispatchSupplier,
  } = useSupplierContext();
  /** => check data supplier and sinbad status */
  const {
    checkUser,
    modalRejectApproval,
    modalWaitingApproval,
    modalRegisterSupplier,
    onFunctionActions,
  } = useCheckDataSupplier();
  /** === FUNCTIONS === */
  /** => action send data to supplier */
  const onSendDataSupplier = () => {
    if (productSelected !== null) {
      sendDataToSupplierActions.fetch(dispatchSupplier, {
        supplierId: productSelected.sellerId,
      });
    }
  };

  /** => action from buttom order */
  const handleOrderPress = (product: models.ProductList) => {
    setProductSelected(product);
    supplierSegmentationAction.fetch(dispatchSupplier, product.sellerId);
    productDetailActions.fetch(dispatchProduct, product.id);
  };

  /** => action close modal add to cart */
  const handleCloseModal = () => {
    supplierSegmentationAction.reset(dispatchSupplier);
    productDetailActions.reset(dispatchProduct);
    stockValidationActions.reset(dispatchStock);
    setModalNotCoverage(false);
    setOrderModalVisible(false);
    onFunctionActions({ type: 'close' });
  };

  /** => action submit add to cart  */
  const onSubmitAddToCart = () => {
    if (
      productDetailState === null ||
      dataSegmentation === null ||
      dataSegmentation.dataSuppliers === null ||
      dataStock === null
    ) {
      /** => DO SOMETHING */
      /** => SHOW MODAL ERROR SOMETHING WRONG OR RETRY  */
      return;
    }

    const params: models.AddToCartPayload = {
      isActiveStore: dataSegmentation.isActiveStore,
      selected: true,
      stock: dataStock.stock,
      productId: productDetailState.id,
      productName: productDetailState.name,
      brandId: productDetailState.brandId,
      urlImages: productDetailState?.images[0]?.url ?? '',
      qty: orderQty,
      displayPrice: productDetailState.originalPrice,
      priceBeforeTax:
        productDetailState.currentPrice ?? productDetailState.originalPrice,
      priceAfterTax:
        productDetailState.currentPriceAfterTax ??
        productDetailState.originalPrice,
      uom: productDetailState.unit,
      warehouseId: dataSegmentation.dataSuppliers.warehouseId,
      sellerId: Number(productDetailState.sellerId),
      channelId: dataSegmentation.dataSuppliers.channelId,
      groupId: dataSegmentation.dataSuppliers.groupId,
      typeId: dataSegmentation.dataSuppliers.typeId,
      clusterId: dataSegmentation.dataSuppliers.clusterId,
    };

    addToCartActions.fetch(dispatchShopingCart, params);
  };
  /** === EFFECT HOOKS === */
  useEffect(() => {
    if (!productLoading) {
      setKeywordSearched(false);
    }
  }, [productLoading]);

  /** => Do something when success add to cart */
  useEffect(() => {
    if (addToCartData !== null) {
      setProductSelected(null);
      handleCloseModal();
      cartTotalProductActions.fetch();
    }
  }, [addToCartData]);

  /** => Do something when success send data to supplier */
  useEffect(() => {
    if (sendToSupplierData !== null) {
      onFunctionActions({ type: 'close' });
    }
  }, [sendToSupplierData]);

  /** => Listen data segmentation and product detail to fetch validation stock */
  useEffect(() => {
    if (
      dataSegmentation &&
      dataSegmentation.dataSuppliers &&
      productDetailState
    ) {
      stockValidationActions.fetch(dispatchStock, {
        warehouseId: dataSegmentation.dataSuppliers.warehouseId ?? null,
        productId: productDetailState.id,
      });
    }
  }, [dataSegmentation, productDetailState]);

  /** Listen Data Stock */
  useEffect(() => {
    if (dataStock && productDetailState) {
      setOrderModalVisible(true);
    }
  }, [dataStock, productDetailState]);

  /** Listen Error Stock */
  useEffect(() => {
    if (errorStock && productDetailState) {
      if (errorStock.code === 11004) {
        setOrderModalVisible(true);
      } else {
        setModalNotCoverage(true);
      }
    }
  }, [errorStock && productDetailState]);

  useEffect(() => {
    if (withTags) {
      tagActions.fetch(dispatchTag, {
        categoryId: selectedCategory?.id,
        keyword: searchKeyword,
        brandId: activeBrandId,
      });
    }
  }, [selectedCategory, keywordSearched, withTags]);

  useEffect(() => {
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
  }, [dataSegmentation]);
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
      {withCategoryTabs && (
        <CategoryTabList
          level={categoryTabsConfig?.level!}
          selectedFirstLevelIndex={categoryTabsConfig?.firstLevelIndex!}
          selectedSecondLevelIndex={categoryTabsConfig?.secondLevelIndex!}
          selectedThirdLevelIndex={categoryTabsConfig?.thirdLevelIndex}
          onTabChange={(category) => {
            const queryOptionsCopy = Object.assign({}, derivedQueryOptions);
            delete queryOptionsCopy.tags;
            setSelectedCategory(category);
            onFetch({ ...queryOptionsCopy, categoryId: category.id });
          }}
        />
      )}
      <View style={{ flex: 1 }}>
        {layoutDisplay === 'grid' ? (
          <GridLayout
            products={products}
            withTags={withTags}
            tags={tags}
            onTagPress={handleTagPress}
            onOrderPress={(product) => handleOrderPress(product)}
            isRefreshing={isRefreshing}
            onRefresh={() => onRefresh(derivedQueryOptions)}
            onLoadMore={() => onLoadMore(derivedQueryOptions)}
            loading={productLoading}
            error={productError}
          />
        ) : (
          <ListLayout
            products={products}
            withTags={withTags}
            tags={tags}
            onTagPress={handleTagPress}
            onOrderPress={(product) => handleOrderPress(product)}
            isRefreshing={isRefreshing}
            onRefresh={() => onRefresh(derivedQueryOptions)}
            onLoadMore={() => onLoadMore(derivedQueryOptions)}
            loading={productLoading}
            error={productError}
          />
        )}
      </View>
      {withBottomAction && (
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
      )}
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
        visible={modalRegisterSupplier}
        onSubmit={() =>
          onFunctionActions({
            type: 'sendDataToSupplier',
            onSendDataSupplier: onSendDataSupplier,
          })
        }
        onClose={handleCloseModal}
      />
      {/* Waiting Approval Modal */}
      <WaitingApprovalModal
        visible={modalWaitingApproval}
        onSubmit={handleCloseModal}
        onClose={handleCloseModal}
      />
      {/* Reject Approval Modal */}
      <RejectApprovalModal
        visible={modalRejectApproval}
        onSubmit={handleCloseModal}
        onClose={handleCloseModal}
        isCallCS={true}
      />
      {/* Add to Cart Modal */}
      {orderModalVisible && (
        <AddToCartModal
          orderQty={orderQty}
          increaseOrderQty={increaseOrderQty}
          decreaseOrderQty={decreaseOrderQty}
          open={orderModalVisible}
          closeAction={handleCloseModal}
          onAddToCartPress={onSubmitAddToCart}
        />
      )}
      {/* Product not coverage modal */}
      <ProductNotCoverageModal
        isOpen={modalNotCoverage}
        close={handleCloseModal}
      />
    </SnbContainer>
  );
};

export default ProductList;
