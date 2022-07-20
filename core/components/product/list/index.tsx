/** === IMPORT PACKAGES ===  */
import React, {
  FC,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { View, StatusBar } from 'react-native';
import { SnbContainer, SnbToast2 } from 'react-native-sinbad-ui';
import { useIsFocused } from '@react-navigation/native';
/** === IMPORT COMPONENTS === */
import Action from '@core/components/modal-actions';
import NavigationHeader from './NavigationHeader';
import CategoryTabList from './CategoryTabList';
import GridLayout from './grid-layout/GridLayout';
import ListLayout from './list-layout/ListLayout';
import ActionSheet from '../ActionSheet';
import NotInUrbanModal, { NotInUrbanModalRef } from './NotInUrbanModal';
import {
  // RegisterSupplierModal,
  // RejectApprovalModal,
  // WaitingApprovalModal,
  ProductNotCoverageModal,
  AddToCartModal,
} from '@core/components/modal';
import { LoadingLoadMore } from '@core/components/Loading';
import BottomSheetError from '@core/components/BottomSheetError';
import NeedLoginModal from '@core/components/modal/need-login/NeedLoginModal';
/** === IMPORT FUNCTIONS === */
import debounce from 'lodash/debounce';
import {
  useBottomAction,
  priceSortOptions,
  useOrderModalVisibility,
  useProductTags,
  usePriceRangeFilter,
} from '@core/functions/product';
// import {
//   useCheckDataSupplier,
//   useSupplierSegmentationAction,
//   useSendDataToSupplierActions,
// } from '@core/functions/supplier';
import { useDataAuth } from '@core/redux/Data';
import {
  useTagListActions,
  useProductDetailCartAction,
  useStockValidationAction,
  useOrderQuantity,
} from '@screen/product/functions';
import { useRecentSearch } from '@screen/search/functions';
import { useAddToCartAction } from '@screen/oms/functions';
import { useGetTotalCartAction } from '@screen/oms/functions';
import { useProductContext, useTagContext } from 'src/data/contexts/product';
// import { useSupplierContext } from 'src/data/contexts/supplier/useSupplierContext';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
import useAddToCart from '@core/components/modal/add-to-cart/add-to-cart.function';
/** === IMPORT TYPES === */
import * as models from '@models';
import { contexts } from '@contexts';
import {
  ProductHeaderType,
  CategoryTabsConfig,
  CategoryType,
} from './product-list-core.type';
import ProductTagList from './ProductTagList';
import TitleSection from './TitleSection';
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
  onActiveKeywordChange?: (keyword: string) => void;
  activeCategory?: CategoryType;
  activeBrandId?: string;
  withBottomAction?: boolean;
  withTags?: boolean;
  total: number;
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
  onActiveKeywordChange,
  activeCategory,
  activeBrandId,
  withBottomAction = true,
  withTags = true,
  total,
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
  const [loadingPreparation, setLoadingPreparation] = useState(false);
  const [modalErrorAddCart, setModalErrorAddCart] = useState(false);
  const [modalErrorProductDetail, setModalErrorProductDetail] = useState(false);
  const [modalNeedToLogin, setModalNeedToLogin] = useState(false);
  const [modalErrorStock, setModalErrorStock] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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
  const { addKeyword } = useRecentSearch();
  const { orderModalVisible, setOrderModalVisible } = useOrderModalVisibility();
  const totalCartActions = useGetTotalCartAction();
  const tagActions = useTagListActions();
  const productDetailActions = useProductDetailCartAction();
  const addToCartActions = useAddToCartAction();
  const stockValidationActions = useStockValidationAction();
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const {
    stateProduct: {
      list: {
        loading: productLoading,
        error: productError,
        loadMore: productLoadMore,
      },
      cart: { data: productDetailState, error: productDetailError },
    },
    dispatchProduct,
  } = useProductContext();
  const { orderQty, onChangeQty } = useOrderQuantity({
    minQty: productDetailState?.minQty ?? 1,
  });
  const { dispatchTag } = useTagContext();
  const {
    stateStock: {
      validation: { data: dataStock, error: errorStock },
    },
    dispatchStock,
  } = useStockContext();
  const { me } = useDataAuth();
  // modal filter range state
  const {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    resetValues,
    handleSliderChange,
  } = usePriceRangeFilter(filterQuery);
  /** === REF === */
  const modalUrbanRef = useRef<NotInUrbanModalRef>(null);
  /** === FUNCTIONS === */
  /** => for bulk price */
  const { bulkPriceAterTax, isPriceGrosir } = useAddToCart(orderQty, false);

  const isFocused = useIsFocused();

  /** => action from buttom order */
  const handleOrderPress = useCallback(
    (product: models.ProductList) => {
      if (me.data === null) {
        setModalNeedToLogin(true);
      } else {
        setOrderModalVisible(true);
        setProductSelected(product);
        // supplierSegmentationAction.fetch(dispatchSupplier, product.sellerId);
        productDetailActions.fetch(
          dispatchProduct,
          `${product.id}_${product.warehouseOriginId}`,
        );
      }
    },
    [me.data],
  );

  /** => action close modal add to cart */
  const handleCloseModal = useCallback((isReset?: boolean) => {
    if (isReset) {
      stockValidationActions.reset(dispatchStock);
      productDetailActions.reset(dispatchProduct);
      addToCartActions.reset(dispatchCart);
      // sendDataToSupplierActions.reset(dispatchSupplier);
    }
    setModalErrorAddCart(false);
    // setModalErrorSendDataSupplier(false);
    setModalNotCoverage(false);
    setOrderModalVisible(false);
  }, []);

  /** => action on change qty */
  const onHandleChangeQty = useCallback(
    (value: number) => {
      if (!dataStock || !productDetailState) {
        return;
      }
      onChangeQty(value);
    },
    [dataStock, productDetailState, onChangeQty],
  );

  /** => action submit add to cart  */
  const onSubmitAddToCart = () => {
    if (productDetailState === null || dataStock === null) {
      /** => DO SOMETHING */
      /** => SHOW MODAL ERROR SOMETHING WRONG OR RETRY  */
      return;
    }

    /** function to determine bulk price calculation */
    let lastUsedPrice = 0,
      isLastPriceUsedRules = false;
    if (isPriceGrosir) {
      isLastPriceUsedRules = true;
      lastUsedPrice = bulkPriceAterTax;
    } else {
      isLastPriceUsedRules = false;
      lastUsedPrice = productDetailState.priceAfterTax;
    }

    const priceRules = productDetailState.bulkPrices.map((item) => {
      return {
        minQty: item.qty,
        priceAfterTax: item.priceAfterTax,
        priceBeforeTax: item.priceBeforeTax,
        taxPrice: item.taxPrice,
      };
    });

    const params: models.AddToCartPayload = {
      productId: productDetailState.id,
      productName: productDetailState.name,
      categoryId: productDetailState.categoryId,
      productImageUrl: productDetailState?.images[0]?.url ?? '',
      minQty: productDetailState.minQty,
      qty: orderQty,
      qtyPerBox: productDetailState.packagedQty,
      uomLabel: productDetailState.unit,
      warehouseId: Number(productDetailState.warehouseOriginId),
      sellerId: Number(productDetailState.sellerId),
      sellerName: productDetailState.productSeller.name,
      taxPercentage: productDetailState.productTax.amount,
      lastUsedPrice,
      isLastPriceUsedRules,
      priceAfterTax: productDetailState.priceAfterTax,
      priceBeforeTax: productDetailState.priceBeforeTax,
      taxPrice: productDetailState.taxPrice,
      priceRules,
      selected: true,
    };

    addToCartActions.fetch(dispatchCart, params);
  };
  /** === EFFECT HOOKS === */
  useEffect(() => {
    if (!productLoading) {
      setKeywordSearched(false);
      setInitialLoading(false);
    }
  }, [productLoading]);

  /** => if product error code 500700000029 "Sinbad belum beroperasi di lokasi toko Anda" */
  useEffect(() => {
    if (productError?.code === 500700000029) {
      modalUrbanRef.current?.trigger(true);
    }
  }, [productError?.code, modalUrbanRef]);

  /** => Do something when success add to cart */
  useEffect(() => {
    if (stateCart.create.data !== null) {
      setProductSelected(null);
      handleCloseModal();
      totalCartActions.fetch(dispatchCart);
      SnbToast2.show('Produk berhasil ditambahkan ke keranjang', 2000, {
        position: 'top',
        positionValue: StatusBar.currentHeight,
      });
    }
  }, [stateCart.create.data]);

  /** => Do something when success add to cart */
  useEffect(() => {
    if (stateCart.create.error !== null && isFocused) {
      setOrderModalVisible(false);
      setTimeout(() => setModalErrorAddCart(true), 500);
    }
  }, [stateCart.create.error]);

  /** => Listen data segmentation and product detail to fetch validation stock */
  useEffect(() => {
    if (productDetailState) {
      onChangeQty(productDetailState.minQty);
      stockValidationActions.fetch(dispatchStock, {
        warehouseId: Number(productDetailState.warehouseOriginId) ?? null,
        productId: productDetailState.id,
      });
    }
  }, [productDetailState]);

  /** => Listen error segmentation and error product detail */
  useEffect(() => {
    if (productDetailError?.message) {
      setOrderModalVisible(false);
      setTimeout(() => setModalErrorProductDetail(true), 500);
    }
  }, [productDetailError, setOrderModalVisible, setModalErrorProductDetail]);

  /** Listen Data Stock */
  useEffect(() => {
    if (dataStock && productDetailState) {
      setLoadingPreparation(false);
    }
  }, [dataStock, productDetailState]);

  /** Listen Error Stock */
  useEffect(() => {
    if (errorStock && productDetailState) {
      if (errorStock.code === 50080000026 && modalNotCoverage === false) {
        setOrderModalVisible(true);
      } else if (
        errorStock.code === 50080000025 ||
        errorStock.code === 50080000036
      ) {
        setModalNotCoverage(true);
      } else {
        setOrderModalVisible(false);
        setTimeout(() => setModalErrorStock(true), 500);
      }
      setLoadingPreparation(false);
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
    if (me.data !== null) {
      if (me.data.approvalStatus === 'verified') {
        setLoadingPreparation(false);
      } else {
        setModalNotCoverage(true);
        setLoadingPreparation(false);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      stockValidationActions.reset(dispatchStock);
      productDetailActions.reset(dispatchProduct);
      addToCartActions.reset(dispatchCart);
    };
  }, []);

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
  const pageLoading = initialLoading ? initialLoading : productLoading;
  const hasTags = useMemo(
    () => withTags && tags.length > 0,
    [withTags, tags.length],
  );
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <NavigationHeader
        title={selectedCategory ? selectedCategory.name : headerTitle}
        type={headerType}
        onKeywordChange={(text: string) => {
          setSearchKeyword(text);
          onActiveKeywordChange?.(text);
        }}
        keyword={searchKeyword}
        onSearch={() => {
          setKeywordSearched(true);
          addKeyword(searchKeyword);
          onFetch({ ...derivedQueryOptions, keyword: searchKeyword });
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
      <View>
        {hasTags ? (
          <ProductTagList
            tags={tags}
            onTagPress={handleTagPress}
            onFilterPress={() =>
              handleActionClick({ type: 'filter', show: true })
            }
          />
        ) : null}

        <TitleSection
          total={total}
          onChangeLayoutListPress={() =>
            handleActionClick({ type: 'layout', show: true })
          }
          onSortPress={() => handleActionClick({ type: 'sort', show: true })}
        />
      </View>
      <View style={{ flex: 1 }}>
        {layoutDisplay === 'grid' ? (
          <GridLayout
            total={total}
            products={products}
            withTags={withTags}
            tags={tags}
            onTagPress={handleTagPress}
            onOrderPress={debounce((product) => handleOrderPress(product), 300)}
            isRefreshing={isRefreshing}
            onRefresh={() => onRefresh(derivedQueryOptions)}
            onLoadMore={() => onLoadMore(derivedQueryOptions)}
            loading={pageLoading}
            error={productError}
            // onFilterPress={() => handleActionClick({ type: 'filter' })}
            onChangeLayoutListPress={() =>
              handleActionClick({ type: 'layout' })
            }
            // onSortPress={() => handleActionClick({ type: 'sort' })}
          />
        ) : (
          <ListLayout
            total={total}
            products={products}
            withTags={withTags}
            tags={tags}
            onTagPress={handleTagPress}
            onOrderPress={debounce((product) => handleOrderPress(product), 300)}
            isRefreshing={isRefreshing}
            onRefresh={() => onRefresh(derivedQueryOptions)}
            onLoadMore={() => onLoadMore(derivedQueryOptions)}
            loading={pageLoading}
            error={productError}
            // onFilterPress={() => handleActionClick({ type: 'filter' })}
            onChangeLayoutListPress={() =>
              handleActionClick({ type: 'layout' })
            }
            // onSortPress={() => handleActionClick({ type: 'sort' })}
          />
        )}
      </View>
      {productLoadMore && (
        <View>
          <LoadingLoadMore />
        </View>
      )}
      {/* Sort Modal */}
      <ActionSheet
        open={sortModalVisible}
        name="sort-modal"
        title="Urutkan"
        contentHeight={220}
        onBlur={() => handleActionClick({ type: 'sort', show: false })}
        onClose={() => handleActionClick({ type: 'sort', show: false })}>
        <Action.Sort
          appliedOptionIndex={sortIndex}
          options={priceSortOptions}
          onButtonPress={handleActionClick}
        />
      </ActionSheet>
      {/* Filter Modal */}
      <ActionSheet
        withClear
        onClearFilter={resetValues}
        open={filterModalVisible}
        name="filter-modal"
        title="Filter"
        contentHeight={220}
        onBlur={() => handleActionClick({ type: 'filter', show: false })}
        onClose={() => handleActionClick({ type: 'filter', show: false })}>
        <Action.Filter
          onButtonPress={handleActionClick}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          handleSliderChange={handleSliderChange}
        />
      </ActionSheet>
      {/* Add to Cart Modal */}

      <AddToCartModal
        orderQty={orderQty}
        onChangeQty={onHandleChangeQty}
        open={orderModalVisible}
        onBlur={() => setOrderModalVisible(false)}
        closeAction={handleCloseModal}
        onAddToCartPress={onSubmitAddToCart}
        loading={loadingPreparation}
        disabled={
          productDetailState === null ||
          dataStock === null ||
          orderQty > dataStock.stock ||
          orderQty < productDetailState?.minQty ||
          productDetailState.minQty > dataStock.stock
        }
      />

      {/* Product not coverage modal */}
      <ProductNotCoverageModal
        isOpen={modalNotCoverage}
        close={() => handleCloseModal(true)}
      />
      {/* Modal Bottom Sheet Error Add to Cart */}
      <BottomSheetError
        open={modalErrorAddCart}
        error={stateCart.create.error}
        closeAction={() => handleCloseModal(true)}
        retryAction={() => {
          if (productSelected) {
            setModalErrorAddCart(false);
            handleOrderPress(productSelected);
          } else {
            handleCloseModal(true);
          }
        }}
      />
      {/* Modal Bottom Sheet product detail */}
      <BottomSheetError
        open={modalErrorProductDetail}
        error={productDetailError}
        closeAction={() => {
          setModalErrorProductDetail(false);
          handleCloseModal(true);
        }}
        retryAction={() => {
          if (productSelected) {
            setModalErrorProductDetail(false);
            handleOrderPress(productSelected);
          } else {
            handleCloseModal(true);
          }
        }}
      />
      {/* Modal Bottom Sheet error stock */}
      <BottomSheetError
        open={modalErrorStock}
        error={errorStock}
        closeAction={() => {
          setModalErrorStock(false);
          handleCloseModal(true);
          setModalErrorStock(false);
        }}
        retryAction={() => {
          handleCloseModal(true);
          setModalErrorStock(false);
        }}
      />
      {/* Modal Bottom Sheet error if not in urban */}
      <NotInUrbanModal
        ref={modalUrbanRef}
        errorSubtitle={productError?.message ?? ''}
      />
      {/* Modal Bottom Sheet Need to Login */}
      <NeedLoginModal
        visible={modalNeedToLogin}
        onClose={() => setModalNeedToLogin(false)}
      />
      <SnbToast2 />
    </SnbContainer>
  );
};

export default ProductList;
