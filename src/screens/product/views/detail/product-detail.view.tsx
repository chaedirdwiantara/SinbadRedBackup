/** === IMPORT PACKAGES ===  */
import React, { FC, useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl, StatusBar } from 'react-native';
import { SnbContainer, SnbStatusBar, SnbToast } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import { EmptyState } from '@core/components/EmptyState';
import Html from '@core/components/Html';
import { ProductDetailHeader } from './ProductDetailHeader';
import { ProductDetailCarousel } from './ProductDetailCarousel';
import { ProductDetailMainInfo } from './ProductDetailMainInfo';
// import { ProductDetailSupplierInfo } from './ProductDetailSupplierInfo';
import { PromoSection } from './PromoSection';
import { ProductDetailSection } from './ProductDetailSection';
import { ProductDetailSectionItem } from './ProductDetailSectionItem';
import { ActionButton } from './ActionButton';
import { UnavailableSkuFlag } from './UnavailableSkuFlag';
import { PromoModal } from './PromoModal';
import { ProductDetailSkeleton } from './ProductDetailSkeleton';
import { BundleSection } from './BundleSection';
import {
  RegisterSupplierModal,
  RejectApprovalModal,
  WaitingApprovalModal,
  AddToCartModal,
} from '@core/components/modal';
import BottomSheetError from '@core/components/BottomSheetError';
import NeedLoginModal from '@core/components/modal/need-login/NeedLoginModal';
/** === IMPORT FUNCTIONS === */
import { NavigationAction } from '@core/functions/navigation';
import { contexts } from '@contexts';
import { usePotentialPromoProductAction } from '@screen/promo/functions';
import { goToBundle, goBack } from '../../functions';
/** === IMPORT HOOKS === */
import {
  useCheckDataSupplier,
  useSupplierSegmentationDetailAction,
  useRegisterSupplierActions,
} from '@core/functions/supplier';
import {
  useProductDetailAction,
  // useAddToCartDetailActions,
  useStockValidationDetailAction,
  useOrderQuantity,
} from '@screen/product/functions';
import { useAddToCartAction } from '@screen/oms/functions/cart/cart-hook.function';
import { useOrderModalVisibility } from '@core/functions/product';
import { useProductContext } from 'src/data/contexts/product';
import { useSupplierContext } from 'src/data/contexts/supplier/useSupplierContext';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
import { useDataAuth } from '@core/redux/Data';
// import { useCartTotalProductActions } from '@screen/oms/functions';
import * as models from '@models';
/** === DUMMY === */
// const supplierDummy = {
//   name: 'Depo Berkah Abadi',
//   urbanCity: 'Jakarta Barat',
//   logoUrl: '',
// };
/** === COMPONENT === */
const ProductDetailView: FC = () => {
  /** === HOOKS === */
  const {
    params: { id: productId },
  } = NavigationAction.useGetNavParams();
  const [promoModalVisible, setPromoModalVisible] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const { orderModalVisible, setOrderModalVisible } = useOrderModalVisibility();
  const [loadingButton, setLoadingButton] = useState(false);
  const [modalErrorAddCart, setModalErrorAddCart] = useState(false);
  const [modalErrorSendDataSupplier, setModalErrorSendDataSupplier] =
    useState(false);
  const [modalErrorProductDetail, setModalErrorProductDetail] = useState(false);
  const [modalNeedToLogin, setModalNeedToLogin] = useState(false);

  /** => actions */
  // const addToCartActions = useAddToCartDetailActions();
  const stockValidationActions = useStockValidationDetailAction();
  const productDetailActions = useProductDetailAction();
  const supplierSegmentationAction = useSupplierSegmentationDetailAction();
  const sendDataToSupplierActions = useRegisterSupplierActions();
  const addToCartAction = useAddToCartAction();
  // const cartTotalProductActions = useCartTotalProductActions();
  // const { dataTotalProductCart } = useCartTotalProductActions();
  const { me } = useDataAuth();

  /** => context */
  const {
    stateProduct: {
      detail: {
        data: dataProduct,
        loading: productLoading,
        error: errorProduct,
        refresh: refreshProduct,
      },
    },
    dispatchProduct,
  } = useProductContext();
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const { orderQty, onChangeQty } = useOrderQuantity({
    minQty: dataProduct?.minQty ?? 1,
  });
  const {
    stateSupplier: {
      detail: { data: dataSegmentation, error: errorSegmentation },
      register: { data: sendToSupplierData, error: sendToSupplierError },
    },
    dispatchSupplier,
  } = useSupplierContext();
  const {
    stateStock: {
      detail: { data: dataStock, error: errorStock },
    },
    dispatchStock,
  } = useStockContext();

  /** => check data supplier and sinbad status */
  const {
    checkUser,
    modalRejectApproval,
    modalWaitingApproval,
    modalRegisterSupplier,
    onFunctionActions,
  } = useCheckDataSupplier(setOrderModalVisible);

  /** => action from button order */
  const handleOrderPress = () => {
    if (me.data !== null && dataSegmentation !== null) {
      if (dataSegmentation.dataSuppliers !== null) {
        if (
          me.data.approvalStatus === 'verified' &&
          dataSegmentation.dataSuppliers.approvalStatus === 'guest'
        ) {
          setIsAvailable(false);
        } else {
          checkUser({
            sinbadStatus: me.data.approvalStatus,
            supplierStatus: dataSegmentation?.dataSuppliers?.approvalStatus,
          });
        }
      } else {
        // checkUser({
        //   sinbadStatus: me.data.approvalStatus,
        //   supplierStatus: null,
        // });
        setIsAvailable(false);
      }
    } else {
      setModalNeedToLogin(true);
    }
  };

  /** => action send data to supplier */
  const onSendDataSupplier = () => {
    if (dataProduct !== null) {
      sendDataToSupplierActions.fetch(dispatchSupplier, {
        supplierId: dataProduct.sellerId,
      });
    }
  };

  /** => action close modal add to cart */
  const handleCloseModal = () => {
    // addToCartActions.reset(dispatchShopingCart);
    sendDataToSupplierActions.reset(dispatchSupplier);
    setLoadingButton(false);
    setOrderModalVisible(false);
    setModalErrorAddCart(false);
    setModalErrorSendDataSupplier(false);
    setModalErrorProductDetail(false);
    onFunctionActions({ type: 'close' });
  };

  /** => action on change qty */
  const onHandleChangeQty = (value: number) => {
    if (!dataStock || !dataProduct) {
      return;
    }

    onChangeQty(value);
  };

  const onSubmitAddToCart = () => {
    if (
      dataProduct === null ||
      dataSegmentation === null ||
      dataSegmentation.dataSuppliers === null ||
      dataStock === null
    ) {
      /** => DO SOMETHING */
      /** => SHOW MODAL ERROR SOMETHING WRONG OR RETRY  */
      return;
    }

    const params: models.AddToCartPayload = {
      productId: dataProduct.id,
      productName: dataProduct.name,
      brandId: dataProduct.brandId,
      brandName: dataProduct.brand,
      categoryId: dataProduct.categoryId,
      productImageUrl: dataProduct?.images[0]?.url ?? '',
      minQty: dataProduct.minQty,
      qty: orderQty,
      multipleQty: dataProduct.multipleQty,
      qtyPerBox: dataProduct.packagedQty,
      uomLabel: dataProduct.unit,
      warehouseId: dataSegmentation.dataSuppliers.warehouseId,
      warehouseName: dataStock.warehouseName,
      sellerId: Number(dataProduct.sellerId),
      sellerName: dataProduct.productSeller.name,
      isPriceAfterTax: dataProduct.isPriceAfterTax,
      lastUsedPrice: dataProduct.finalPrice,
      isPriceUsedRules: dataProduct.productPriceRules.length !== 0,
      price: dataProduct.finalPrice,
      priceRules: dataProduct.productPriceRules,
      selected: true,
    };

    addToCartAction.fetch(dispatchCart, params);
  };

  /**
   * Potential Promo Product
   * - only fetch when the product data is ready
   */
  const {
    statePromo: { potentialPromoProduct: potentialPromoProduct },
    dispatchPromo,
  } = React.useContext(contexts.PromoContext);
  const potentialPromoProductList = potentialPromoProduct.detail;
  const potentialPromoProductAction = usePotentialPromoProductAction();

  /** === DERIVED === */
  const defaultProperties = {
    isAvailable: isAvailable,
    isBundle: dataProduct?.isBundle ?? false,
    stock: dataStock?.stock ?? 0,
  };
  /** === FUNCTION === */
  const getActionButtonTitle = () => {
    if (defaultProperties.stock >= (dataProduct?.minQty ?? 1)) {
      if (defaultProperties.isBundle) {
        return 'Check Promo Bundle';
      } else if (me.data === null) {
        return 'Tambah ke Keranjang';
      } else {
        return 'Tambah ke Keranjang';
      }
    } else if (me.data === null) {
      return 'Tambah ke Keranjang';
    }

    return 'Stock Habis';
  };

  const handleRetryGetProduct = () => {
    setLoadingButton(true);
    productDetailActions.reset(dispatchProduct);
    stockValidationActions.reset(dispatchStock);
    supplierSegmentationAction.reset(dispatchSupplier);
    productDetailActions.fetch(dispatchProduct, productId);
  };
  /** === EFFECT LISTENER === */
  /** => Did Mounted */
  useEffect(() => {
    setLoadingButton(true);
    productDetailActions.fetch(dispatchProduct, productId);
  }, [productId]);

  /** => Listen data product success */
  useEffect(() => {
    if (dataProduct !== null && me.data !== null) {
      /** => supplier segmentation effect */
      supplierSegmentationAction.fetch(dispatchSupplier, dataProduct.sellerId);
      /** => potential promo product effect */
      potentialPromoProductAction.reset(dispatchPromo);
      potentialPromoProductAction.detail(dispatchPromo, dataProduct.id);
      /** => on change initial order qty with min qty */
      onChangeQty(dataProduct.minQty);
    } else if (me.data === null) {
      setTimeout(() => {
        setLoadingButton(false);
      }, 1500);
    }
  }, [dataProduct]);

  /** => Listen error product */
  useEffect(() => {
    if (errorProduct !== null) {
      setTimeout(() => {
        setLoadingButton(false);
      }, 1500);
      setIsAvailable(false);
      setModalErrorProductDetail(true);
    }
  }, [errorProduct]);

  /** => Listen data segmentation and product detail to fetch validation stock */
  useEffect(() => {
    if (dataSegmentation !== null && dataProduct !== null) {
      if (dataSegmentation.dataSuppliers) {
        stockValidationActions.fetch(dispatchStock, {
          warehouseId: dataSegmentation.dataSuppliers.warehouseId ?? null,
          productId: dataProduct.id,
        });
      } else {
        if (me.data) {
          // checkUser({
          //   sinbadStatus: me.data.approvalStatus,
          //   supplierStatus: null,
          // });
          setTimeout(() => {
            setLoadingButton(false);
          }, 1500);
          setIsAvailable(false);
        } else {
          stockValidationActions.fetch(dispatchStock, {
            warehouseId: null,
            productId: dataProduct.id,
          });
        }
      }
    }
  }, [dataSegmentation, dataProduct]);

  /** => Listen error segmentation and product detail to fetch validation stock */
  useEffect(() => {
    if (errorSegmentation !== null && dataProduct !== null) {
      if (me.data) {
        setIsAvailable(false);
      } else {
        stockValidationActions.fetch(dispatchStock, {
          warehouseId: null,
          productId: dataProduct.id,
        });
      }
    }
  }, [errorSegmentation, dataProduct]);

  /** Listen success get stock */
  useEffect(() => {
    if (dataStock !== null) {
      if (
        me &&
        me.data &&
        me.data.approvalStatus === 'verified' &&
        dataSegmentation &&
        dataSegmentation.dataSuppliers &&
        dataSegmentation.dataSuppliers.approvalStatus === 'guest'
      ) {
        setIsAvailable(false);
        setTimeout(() => {
          setLoadingButton(false);
        }, 1500);
      } else {
        setTimeout(() => {
          setLoadingButton(false);
        }, 1500);
      }
    }
  }, [dataStock]);

  /** Listen Error Stock */
  useEffect(() => {
    if (errorStock && dataProduct) {
      if (errorStock.code === 50080000025 || errorStock.code === 50080000036) {
        setIsAvailable(false);
      } else if (errorStock.code === 50080000026) {
        defaultProperties.stock = 0;
      }
      setTimeout(() => {
        setLoadingButton(false);
      }, 1500);
    }
  }, [errorStock && dataProduct]);

  /** => Do something when success send data to supplier */
  useEffect(() => {
    if (sendToSupplierData !== null) {
      if (dataProduct) {
        supplierSegmentationAction.fetch(
          dispatchSupplier,
          dataProduct.sellerId,
        );
      }
      onFunctionActions({ type: 'close' });
      sendDataToSupplierActions.reset(dispatchSupplier);
      SnbToast.show('Berhasil kirim data ke supplier', 2500, {
        position: 'top',
        positionValue: StatusBar.currentHeight,
      });
    }
  }, [sendToSupplierData]);

  /** => Do something when error send data to supplier */
  useEffect(() => {
    if (sendToSupplierError !== null) {
      setIsAvailable(false);
      setModalErrorSendDataSupplier(true);
    }
  }, [sendToSupplierError]);

  // /** => Do something when success add to cart */
  useEffect(() => {
    if (stateCart.create.data !== null) {
      handleCloseModal();
      // cartTotalProductActions.fetch();
      SnbToast.show('Produk berhasil ditambahkan ke keranjang', 2000, {
        position: 'top',
        positionValue: StatusBar.currentHeight,
      });
    }
  }, [stateCart.create.data]);

  // /** => Do something when error add to cart */
  useEffect(() => {
    if (stateCart.create.error !== null) {
      setModalErrorAddCart(true);
    }
  }, [stateCart.create.error]);

  /** => Did Unmount */
  useEffect(() => {
    return () => {
      setModalErrorProductDetail(false);
      productDetailActions.reset(dispatchProduct);
      supplierSegmentationAction.reset(dispatchSupplier);
      stockValidationActions.reset(dispatchStock);
      // addToCartActions.reset(dispatchShopingCart);
    };
  }, []);

  /** === VIEW === */
  /** => Loading */
  if (productLoading || (dataProduct === null && !errorProduct)) {
    return (
      <SnbContainer color="white">
        <SnbStatusBar type="transparent1" />
        <ProductDetailHeader
          // cartBadge={dataTotalProductCart.totalProduct}
          cartBadge={0}
        />
        <ProductDetailSkeleton />
      </SnbContainer>
    );
  }
  /** => Error */
  if (!productLoading && (errorProduct || dataProduct?.name === undefined)) {
    return (
      <SnbContainer color="white">
        <SnbStatusBar type="transparent1" />
        <ProductDetailHeader
          // cartBadge={dataTotalProductCart.totalProduct}
          cartBadge={0}
        />
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshProduct!}
              onRefresh={() => handleRetryGetProduct()}
            />
          }>
          <EmptyState
            title="Terjadi Kesalahan"
            description="Boleh coba refresh lagi?"
          />
        </ScrollView>
      </SnbContainer>
    );
  }
  /** => Main */
  return (
    <SnbContainer color="white">
      <SnbStatusBar type="transparent1" />
      <ProductDetailHeader
        // cartBadge={dataTotalProductCart.totalProduct}
        cartBadge={0}
      />
      {/* Content */}
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshProduct!}
              onRefresh={() => handleRetryGetProduct()}
            />
          }>
          <ProductDetailCarousel images={dataProduct?.images!} />
          <ProductDetailMainInfo
            name={dataProduct?.name!}
            finalPrice={dataProduct?.finalPrice!}
            qtySoldLabel={dataProduct?.qtySoldLabel!}
            loading={loadingButton}
            unit={dataProduct?.unit!}
            isExclusive={dataProduct?.isExclusive!}
            stock={defaultProperties.stock}
            showStock={me.data !== null}
            hasPromo={false} // When promoList.length > 0 set to true, for now it'll be set to false (waiting for promo integration)
          />
          {/* <ProductDetailSupplierInfo // Hide temporarily
            logo={supplierDummy.logoUrl}
            name={supplierDummy.name}
            urbanCity={supplierDummy.urbanCity}
          /> */}
          {potentialPromoProductList.data !== null &&
            potentialPromoProductList.data.flexiCombo.length > 0 && (
              <PromoSection
                description={
                  potentialPromoProductList.data.flexiCombo[0].shortDescription
                }
                onPress={() => setPromoModalVisible(true)}
              />
            )}
          {potentialPromoProductList.data !== null &&
            potentialPromoProductList.data.crossSelling.length > 0 && (
              <BundleSection
                bundleList={potentialPromoProductList.data.crossSelling}
              />
            )}
          <ProductDetailSection title="Informasi Produk">
            <ProductDetailSectionItem
              name="Minimal Pembelian"
              value={`${dataProduct?.minQty} ${dataProduct?.unit}`}
            />
            <ProductDetailSectionItem
              name="Jumlah per-Dus"
              value={`${dataProduct?.packagedQty} Pcs`}
            />
            <ProductDetailSectionItem
              name="Berat"
              value={`${dataProduct?.productWeight} gr`}
              bottomSpaces={0}
            />
          </ProductDetailSection>
          <ProductDetailSection title="Detail Produk">
            <Html value={dataProduct?.detail ?? '-'} fontSize={12} />
          </ProductDetailSection>
          <ProductDetailSection title="Deskripsi Produk">
            <Html value={dataProduct?.description ?? '-'} fontSize={12} />
          </ProductDetailSection>
          <View style={{ height: 10 }} />
        </ScrollView>
      </View>
      {(dataProduct !== null || errorProduct !== null) &&
      (dataStock !== null || errorStock !== null) ? (
        <React.Fragment>
          {isAvailable ? (
            <ActionButton
              loading={loadingButton}
              title={getActionButtonTitle()}
              disabled={
                me.data !== null &&
                defaultProperties.stock < (dataProduct?.minQty ?? 1)
              }
              onPress={() => {
                if (defaultProperties.isBundle) {
                  goToBundle(productId);
                } else {
                  handleOrderPress();
                }
              }}
            />
          ) : (
            <UnavailableSkuFlag />
          )}
        </React.Fragment>
      ) : isAvailable ? (
        <ActionButton
          loading={loadingButton}
          title={'Tambah ke Keranjang'}
          disabled={loadingButton}
          onPress={() => {
            handleOrderPress();
          }}
        />
      ) : (
        <UnavailableSkuFlag />
      )}
      <PromoModal
        visible={promoModalVisible}
        onClose={() => setPromoModalVisible(false)}
        promoList={potentialPromoProductList.data?.flexiCombo || []}
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
          dataProduct === null ||
          dataStock === null ||
          orderQty > dataStock.stock ||
          orderQty < dataProduct?.minQty
        }
        isFromProductDetail={true}
      />
      {/* Modal Bottom Sheet Error Add to Cart */}
      <BottomSheetError
        open={modalErrorAddCart}
        error={stateCart.create.error}
        closeAction={handleCloseModal}
        retryAction={() => {
          setModalErrorAddCart(false);
          onSubmitAddToCart();
        }}
      />
      {/* Modal Bottom Sheet Error Send data to supplier */}
      <BottomSheetError
        open={modalErrorSendDataSupplier}
        error={sendToSupplierError}
        closeAction={handleCloseModal}
        retryAction={onSendDataSupplier}
      />
      {/* Modal Bottom Sheet Error product detail */}
      <BottomSheetError
        open={modalErrorProductDetail}
        error={errorProduct}
        closeAction={goBack}
        retryAction={handleRetryGetProduct}
        backAction={goBack}
      />
      {/* Modal Bottom Sheet Need to Login */}
      <NeedLoginModal
        visible={modalNeedToLogin}
        onClose={() => setModalNeedToLogin(false)}
      />
    </SnbContainer>
  );
};

export default ProductDetailView;
