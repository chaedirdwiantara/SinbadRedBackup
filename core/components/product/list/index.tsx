/** === IMPORT PACKAGES ===  */
import React, { FC, useState, useEffect, useRef, useMemo } from 'react';
import { View, StatusBar, Text } from 'react-native';
import {
  SnbContainer,
  SnbBottomSheet,
  SnbToast,
  SnbBottomSheet2,
  SnbBottomSheetPart,
  FooterButton,
} from 'react-native-sinbad-ui';
import { useIsFocused } from '@react-navigation/native';
/** === IMPORT COMPONENTS === */
import Action from '@core/components/modal-actions';
import NavigationHeader from './NavigationHeader';
import CategoryTabList from './CategoryTabList';
import GridLayout from './grid-layout/GridLayout';
import ListLayout from './list-layout/ListLayout';
import BottomAction from './BottomAction';
import ActionSheet from '../ActionSheet';
import NotInUrbanModal, { NotInUrbanModalRef } from './NotInUrbanModal';
import {
  RegisterSupplierModal,
  RejectApprovalModal,
  WaitingApprovalModal,
  ProductNotCoverageModal,
  AddToCartModal,
} from '@core/components/modal';
import { LoadingHorizontal, LoadingLoadMore } from '@core/components/Loading';
import BottomSheetError from '@core/components/BottomSheetError';
import NeedLoginModal from '@core/components/modal/need-login/NeedLoginModal';
/** === IMPORT FUNCTIONS === */
import {
  useBottomAction,
  priceSortOptions,
  useOrderModalVisibility,
  useProductTags,
  usePriceRangeFilter,
} from '@core/functions/product';
import {
  useCheckDataSupplier,
  // useSupplierSegmentationAction,
  useSendDataToSupplierActions,
} from '@core/functions/supplier';
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
import { useSupplierContext } from 'src/data/contexts/supplier/useSupplierContext';
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
  const [modalErrorSendDataSupplier, setModalErrorSendDataSupplier] =
    useState(false);
  // const [modalErrorSegmentation, setModalErrorSegmentation] = useState(false);
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
  // const supplierSegmentationAction = useSupplierSegmentationAction();
  const sendDataToSupplierActions = useSendDataToSupplierActions();
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
  const {
    stateSupplier: {
      // segmentation: { data: dataSegmentation, error: errorSegmentation },
      create: { data: sendToSupplierData, error: sendToSupplierError },
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
  // modal filter range state
  const {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    resetValues,
    handleSliderChange,
    handleSliderFinishChange,
  } = usePriceRangeFilter(filterQuery);
  /** === REF === */
  const modalUrbanRef = useRef<NotInUrbanModalRef>(null);
  /** === FUNCTIONS === */
  /** => action send data to supplier */
  const onSendDataSupplier = () => {
    if (productSelected !== null) {
      sendDataToSupplierActions.fetch(dispatchSupplier, {
        supplierId: productSelected.sellerId,
      });
    }
  };

  /** => for bulk price */
  const { bulkPriceAterTax, isPriceGrosir } = useAddToCart(orderQty, false);

  const isFocused = useIsFocused();

  /** => action from buttom order */
  const handleOrderPress = (product: models.ProductList) => {
    if (me.data === null) {
      setModalNeedToLogin(true);
    } else {
      setLoadingPreparation(true);
      setProductSelected(product);
      // supplierSegmentationAction.fetch(dispatchSupplier, product.sellerId);
      productDetailActions.fetch(
        dispatchProduct,
        `${product.id}_${product.warehouseOriginId}`,
      );
    }
  };

  /** => action close modal add to cart */
  const handleCloseModal = () => {
    stockValidationActions.reset(dispatchStock);
    productDetailActions.reset(dispatchProduct);
    // supplierSegmentationAction.reset(dispatchSupplier);
    addToCartActions.reset(dispatchCart);
    sendDataToSupplierActions.reset(dispatchSupplier);
    setModalErrorAddCart(false);
    setModalErrorSendDataSupplier(false);
    setModalNotCoverage(false);
    setOrderModalVisible(false);
    onFunctionActions({ type: 'close' });
  };

  /** => action on change qty */
  const onHandleChangeQty = (value: number) => {
    if (!dataStock || !productDetailState) {
      return;
    }
    onChangeQty(value);
  };

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
      multipleQty: productDetailState.multipleQty,
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
      SnbToast.show('Produk berhasil ditambahkan ke keranjang', 2000, {
        position: 'top',
        positionValue: StatusBar.currentHeight,
      });
    }
  }, [stateCart.create.data]);

  /** => Do something when success add to cart */
  useEffect(() => {
    if (stateCart.create.error !== null && isFocused) {
      setModalErrorAddCart(true);
    }
  }, [stateCart.create.error]);

  /** => Do something when success send data to supplier */
  useEffect(() => {
    if (sendToSupplierData !== null) {
      onFunctionActions({ type: 'close' });
      sendDataToSupplierActions.reset(dispatchSupplier);
      SnbToast.show('Berhasil kirim data ke supplier', 2000, {
        position: 'top',
        positionValue: StatusBar.currentHeight,
      });
    }
  }, [sendToSupplierData]);

  /** => Do something when error send data to supplier */
  useEffect(() => {
    if (sendToSupplierError !== null) {
      setModalErrorSendDataSupplier(true);
    }
  }, [sendToSupplierError]);

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
    if (modalErrorProductDetail !== null) {
      if (productDetailError !== null) {
        setLoadingPreparation(false);
        setModalErrorProductDetail(true);
      }
    }
  }, [modalErrorProductDetail, productDetailError]);

  /** Listen Data Stock */
  useEffect(() => {
    if (dataStock && productDetailState) {
      setLoadingPreparation(false);
      if (
        modalRejectApproval === false &&
        modalWaitingApproval === false &&
        modalRegisterSupplier === false &&
        modalNotCoverage === false
      ) {
        setOrderModalVisible(true);
      }
    }
  }, [dataStock, productDetailState]);

  /** Listen Error Stock */
  useEffect(() => {
    if (errorStock && productDetailState) {
      if (
        errorStock.code === 50080000026 &&
        modalRejectApproval === false &&
        modalWaitingApproval === false &&
        modalRegisterSupplier === false &&
        modalNotCoverage === false
      ) {
        setOrderModalVisible(true);
      } else if (
        (errorStock.code === 50080000025 || errorStock.code === 50080000036) &&
        modalRejectApproval === false &&
        modalWaitingApproval === false &&
        modalRegisterSupplier === false
      ) {
        setModalNotCoverage(true);
      } else {
        setModalErrorStock(true);
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
        checkUser({
          sinbadStatus: me.data.approvalStatus,
          supplierStatus: 'verified',
        });
      } else {
        // checkUser({
        //   sinbadStatus: me.data.approvalStatus,
        //   supplierStatus: null,
        // });
        setModalNotCoverage(true);
        setLoadingPreparation(false);
      }
    }
  }, []);

  useEffect(() => {
    if (modalRegisterSupplier) {
      setLoadingPreparation(false);
    }
  }, [modalRegisterSupplier]);

  useEffect(() => {
    return () => {
      stockValidationActions.reset(dispatchStock);
      productDetailActions.reset(dispatchProduct);
      // supplierSegmentationAction.reset(dispatchSupplier);
      addToCartActions.reset(dispatchCart);
      sendDataToSupplierActions.reset(dispatchSupplier);
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
      <View>
        {hasTags ? (
          <ProductTagList
            tags={tags}
            onTagPress={handleTagPress}
            onFilterPress={() => handleActionClick({ type: 'filter' })}
          />
        ) : null}

        <TitleSection
          total={total}
          onChangeLayoutListPress={() => handleActionClick({ type: 'layout' })}
          onSortPress={() => handleActionClick({ type: 'sort' })}
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
            onOrderPress={(product) => handleOrderPress(product)}
            isRefreshing={isRefreshing}
            onRefresh={() => onRefresh(derivedQueryOptions)}
            onLoadMore={() => onLoadMore(derivedQueryOptions)}
            loading={pageLoading}
            error={productError}
            onFilterPress={() => handleActionClick({ type: 'filter' })}
            onChangeLayoutListPress={() =>
              handleActionClick({ type: 'layout' })
            }
            onSortPress={() => handleActionClick({ type: 'sort' })}
          />
        ) : (
          <ListLayout
            total={total}
            products={products}
            withTags={withTags}
            tags={tags}
            onTagPress={handleTagPress}
            onOrderPress={(product) => handleOrderPress(product)}
            isRefreshing={isRefreshing}
            onRefresh={() => onRefresh(derivedQueryOptions)}
            onLoadMore={() => onLoadMore(derivedQueryOptions)}
            loading={pageLoading}
            error={productError}
            onFilterPress={() => handleActionClick({ type: 'filter' })}
            onChangeLayoutListPress={() =>
              handleActionClick({ type: 'layout' })
            }
            onSortPress={() => handleActionClick({ type: 'sort' })}
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
        onClose={() => handleActionClick({ type: 'sort' })}>
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
        onClose={() => handleActionClick({ type: 'filter' })}>
        <Action.Filter
          onButtonPress={handleActionClick}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          handleSliderChange={handleSliderChange}
        />
      </ActionSheet>
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
        onClose={handleCloseModal}
        isCallCS={true}
      />
      {/* Add to Cart Modal */}

      <AddToCartModal
        orderQty={orderQty}
        onChangeQty={onHandleChangeQty}
        open={orderModalVisible}
        closeAction={handleCloseModal}
        onAddToCartPress={onSubmitAddToCart}
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
        close={handleCloseModal}
      />
      {/* Modal loading horizontal */}
      <SnbBottomSheet
        open={loadingPreparation}
        title=" "
        content={
          <View
            style={{
              marginTop: -40,
            }}>
            <LoadingHorizontal />
          </View>
        }
        isSwipeable={false}
      />
      {/* Modal Bottom Sheet Error Add to Cart */}
      <BottomSheetError
        open={modalErrorAddCart}
        error={stateCart.create.error}
        closeAction={handleCloseModal}
        retryAction={() => {
          if (productSelected) {
            setModalErrorAddCart(false);
            handleOrderPress(productSelected);
          } else {
            handleCloseModal();
          }
        }}
      />
      {/* Modal Bottom Sheet Error Send data to supplier */}
      <BottomSheetError
        open={modalErrorSendDataSupplier}
        error={sendToSupplierError}
        closeAction={handleCloseModal}
      />
      {/* Modal Bottom Sheet product detail */}
      <BottomSheetError
        open={modalErrorProductDetail}
        error={productDetailError}
        closeAction={handleCloseModal}
        retryAction={() => {
          if (productSelected) {
            setModalErrorProductDetail(false);
            handleOrderPress(productSelected);
          } else {
            handleCloseModal();
          }
        }}
      />
      {/* Modal Bottom Sheet error stock */}
      <BottomSheetError
        open={modalErrorStock}
        error={errorStock}
        closeAction={() => {
          handleCloseModal();
          setModalErrorStock(false);
        }}
        retryAction={() => {
          handleCloseModal();
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
    </SnbContainer>
  );
};

export default ProductList;
