/** === IMPORT PACKAGES ===  */
import React, { FC, useState, useEffect, useRef } from 'react';
import { View, StatusBar } from 'react-native';
import { SnbContainer, SnbBottomSheet, SnbToast } from 'react-native-sinbad-ui';
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
import { LoadingHorizontal } from '@core/components/Loading';
import BottomSheetError from '@core/components/BottomSheetError';
/** === IMPORT FUNCTIONS === */
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
  useProductDetailCartAction,
  useAddToCart,
  useStockValidationAction,
  useOrderQuantity,
} from '@screen/product/functions';
import { useCartTotalProductActions } from '@screen/oms/functions';
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
  const [loadingPreparation, setLoadingPreparation] = useState(false);
  const [modalErrorAddCart, setModalErrorAddCart] = useState(false);
  const [modalErrorSendDataSupplier, setModalErrorSendDataSupplier] =
    useState(false);
  const [modalErrorSegmentation, setModalErrorSegmentation] = useState(false);
  const [modalErrorProductDetail, setModalErrorProductDetail] = useState(false);

  /** === REF === */
  const toastSuccessAddCart = useRef<any>();
  const toastSuccessRegisterSupplier = useRef<any>();

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
  const productDetailActions = useProductDetailCartAction();
  const addToCartActions = useAddToCart();
  const supplierSegmentationAction = useSupplierSegmentationAction();
  const sendDataToSupplierActions = useSendDataToSupplierActions();
  const stockValidationActions = useStockValidationAction();
  const {
    stateProduct: {
      list: { loading: productLoading, error: productError },
      cart: { data: productDetailState, error: productDetailError },
    },
    dispatchProduct,
  } = useProductContext();
  const { orderQty, onChangeQty } = useOrderQuantity({
    minQty: productDetailState?.minQty ?? 1,
  });
  const {
    stateShopingCart: {
      create: { data: addToCartData, error: addToCartError },
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
      segmentation: { data: dataSegmentation, error: errorSegmentation },
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
    setLoadingPreparation(true);
    setProductSelected(product);
    supplierSegmentationAction.fetch(dispatchSupplier, product.sellerId);
    productDetailActions.fetch(dispatchProduct, product.id);
  };

  /** => action close modal add to cart */
  const handleCloseModal = () => {
    stockValidationActions.reset(dispatchStock);
    productDetailActions.reset(dispatchProduct);
    supplierSegmentationAction.reset(dispatchSupplier);
    addToCartActions.reset(dispatchShopingCart);
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
      minQty: productDetailState.minQty,
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
      multipleQty: productDetailState.multipleQty,
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
      if (toastSuccessAddCart.current) {
        toastSuccessAddCart.current.show();
      }
    }
  }, [addToCartData]);

  /** => Do something when success add to cart */
  useEffect(() => {
    if (addToCartError !== null) {
      setModalErrorAddCart(true);
    }
  }, [addToCartError]);

  /** => Do something when success send data to supplier */
  useEffect(() => {
    if (sendToSupplierData !== null) {
      onFunctionActions({ type: 'close' });
      sendDataToSupplierActions.reset(dispatchSupplier);
      if (toastSuccessRegisterSupplier.current) {
        toastSuccessRegisterSupplier.current.show();
      }
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
    if (
      dataSegmentation &&
      dataSegmentation.dataSuppliers &&
      productDetailState
    ) {
      onChangeQty(productDetailState.minQty);
      stockValidationActions.fetch(dispatchStock, {
        warehouseId: dataSegmentation.dataSuppliers.warehouseId ?? null,
        productId: productDetailState.id,
      });
    }
  }, [dataSegmentation, productDetailState]);

  /** => Listen error segmentation and error product detail */
  useEffect(() => {
    if (modalErrorProductDetail !== null && modalErrorSegmentation !== null) {
      if (errorSegmentation !== null) {
        setLoadingPreparation(false);
        setModalErrorSegmentation(true);
      } else if (productDetailError !== null) {
        setLoadingPreparation(false);
        setModalErrorProductDetail(true);
      }
    }
  }, [errorSegmentation, productDetailError]);

  /** Listen Data Stock */
  useEffect(() => {
    if (dataStock && productDetailState) {
      setLoadingPreparation(false);
      if (
        modalRejectApproval === false &&
        modalWaitingApproval === false &&
        modalRegisterSupplier === false
      ) {
        setOrderModalVisible(true);
      }
    }
  }, [dataStock, productDetailState]);

  /** Listen Error Stock */
  useEffect(() => {
    if (errorStock && productDetailState) {
      if (errorStock.code === 11004) {
        setLoadingPreparation(false);
        setOrderModalVisible(true);
      } else {
        setLoadingPreparation(false);
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

  useEffect(() => {
    if (modalRegisterSupplier) {
      setLoadingPreparation(false);
    }
  }, [modalRegisterSupplier]);

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
          onChangeQty={onHandleChangeQty}
          open={orderModalVisible}
          closeAction={handleCloseModal}
          onAddToCartPress={onSubmitAddToCart}
          disabled={
            productDetailState === null ||
            dataStock === null ||
            orderQty > dataStock.stock ||
            orderQty < productDetailState?.minQty
          }
        />
      )}
      {/* Product not coverage modal */}
      <ProductNotCoverageModal
        isOpen={modalNotCoverage}
        close={handleCloseModal}
      />
      {/* Toast success add cart */}
      <SnbToast
        ref={toastSuccessAddCart}
        message={'Produk berhasil ditambahkan ke keranjang'}
        position={'top'}
        duration={2000}
        positionValue={StatusBar.currentHeight || 0}
      />
      {/* Toast success register supplier */}
      <SnbToast
        ref={toastSuccessRegisterSupplier}
        message={'Berhasil kirim data ke supplier'}
        position={'top'}
        duration={2000}
        positionValue={StatusBar.currentHeight || 0}
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
        error={addToCartError}
        closeAction={handleCloseModal}
      />
      {/* Modal Bottom Sheet Error Send data to supplier */}
      <BottomSheetError
        open={modalErrorSendDataSupplier}
        error={sendToSupplierError}
        closeAction={handleCloseModal}
      />
      {/* Modal Bottom Sheet segmentation */}
      <BottomSheetError
        open={modalErrorSegmentation}
        error={errorSegmentation}
        closeAction={handleCloseModal}
      />
      {/* Modal Bottom Sheet product detail */}
      <BottomSheetError
        open={modalErrorProductDetail}
        error={productDetailError}
        closeAction={handleCloseModal}
      />
    </SnbContainer>
  );
};

export default ProductList;
