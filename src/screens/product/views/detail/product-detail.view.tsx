/** === IMPORT PACKAGES ===  */
import React, { FC, useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import {
  SnbContainer,
  SnbStatusBar,
  SnbToast,
  SnbIcon,
  color,
} from 'react-native-sinbad-ui';
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
  useAddToCart,
  useStockValidationDetailAction,
  useOrderQuantity,
} from '@screen/product/functions';
import { useOrderModalVisibility } from '@core/functions/product';
import { useShopingCartContext } from 'src/data/contexts/oms/shoping-cart/useShopingCartContext';
import { useProductContext } from 'src/data/contexts/product';
import { useSupplierContext } from 'src/data/contexts/supplier/useSupplierContext';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
import { useDataAuth } from '@core/redux/Data';
import { useCartTotalProductActions } from '@screen/oms/functions';
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
  const [toastSuccessAddCart, setToastSuccessAddCart] = useState(false);
  const [toastSuccessRegisterSupplier, setToastSuccessRegisterSupplier] =
    useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [modalErrorAddCart, setModalErrorAddCart] = useState(false);
  const [modalErrorSendDataSupplier, setModalErrorSendDataSupplier] =
    useState(false);
  const [modalErrorProductDetail, setModalErrorProductDetail] = useState(false);

  /** => actions */
  const addToCartActions = useAddToCart();
  const stockValidationActions = useStockValidationDetailAction();
  const productDetailActions = useProductDetailAction();
  const supplierSegmentationAction = useSupplierSegmentationDetailAction();
  const sendDataToSupplierActions = useRegisterSupplierActions();
  const cartTotalProductActions = useCartTotalProductActions();
  const { dataTotalProductCart } = useCartTotalProductActions();
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
  const { orderQty, onChangeQty } = useOrderQuantity({
    minQty: dataProduct?.minQty ?? 1,
  });
  const {
    stateShopingCart: {
      create: { data: addToCartData, error: addToCartError },
    },
    dispatchShopingCart,
  } = useShopingCartContext();
  const {
    stateSupplier: {
      detail: { data: dataSegmentation },
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
    } else {
      NavigationAction.navigate('LoginPhoneView');
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
    addToCartActions.reset(dispatchShopingCart);
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
      isActiveStore: dataSegmentation.isActiveStore,
      selected: true,
      stock: dataStock.stock,
      productId: dataProduct.id,
      productName: dataProduct.name,
      brandId: dataProduct.brandId,
      urlImages: dataProduct?.images[0]?.url ?? '',
      minQty: dataProduct.minQty,
      qty: orderQty,
      displayPrice: dataProduct.originalPrice,
      priceBeforeTax: dataProduct.currentPrice ?? dataProduct.originalPrice,
      priceAfterTax:
        dataProduct.currentPriceAfterTax ?? dataProduct.originalPrice,
      uom: dataProduct.unit,
      warehouseId: dataSegmentation.dataSuppliers.warehouseId,
      sellerId: Number(dataProduct.sellerId),
      channelId: dataSegmentation.dataSuppliers.channelId,
      groupId: dataSegmentation.dataSuppliers.groupId,
      typeId: dataSegmentation.dataSuppliers.typeId,
      clusterId: dataSegmentation.dataSuppliers.clusterId,
      multipleQty: dataProduct.multipleQty,
    };

    addToCartActions.fetch(dispatchShopingCart, params);
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
    if (defaultProperties.stock > (dataProduct?.minQty ?? 1)) {
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
    productDetailActions.fetch(dispatchProduct, productId);
  };
  /** === EFFECT LISTENER === */
  /** => Did Mounted */
  useEffect(() => {
    setLoadingButton(true);
    productDetailActions.fetch(dispatchProduct, productId);
  }, []);

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
      setLoadingButton(false);
    }
  }, [dataProduct]);

  /** => Listen error product */
  useEffect(() => {
    if (errorProduct !== null) {
      setLoadingButton(false);
      setIsAvailable(false);
      setModalErrorProductDetail(true);
    }
  }, [errorProduct]);

  /** => Listen data segmentation and product detail to fetch validation stock */
  useEffect(() => {
    if (dataSegmentation && dataProduct) {
      if (dataSegmentation.dataSuppliers) {
        stockValidationActions.fetch(dispatchStock, {
          warehouseId: dataSegmentation.dataSuppliers.warehouseId ?? null,
          productId: dataProduct.id,
        });
      } else {
        if (me.data) {
          checkUser({
            sinbadStatus: me.data.approvalStatus,
            supplierStatus: null,
          });
        } else {
          stockValidationActions.fetch(dispatchStock, {
            warehouseId: null,
            productId: dataProduct.id,
          });
        }
      }
    }
  }, [dataSegmentation, dataProduct]);

  /** Listen success get stock */
  useEffect(() => {
    if (dataStock) {
      setLoadingButton(false);
    }
  }, [dataStock]);

  /** Listen Error Stock */
  useEffect(() => {
    if (errorStock && dataProduct) {
      if (errorStock.code === 400) {
        setIsAvailable(false);
      }
      setLoadingButton(false);
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
      setToastSuccessRegisterSupplier(true);
      sendDataToSupplierActions.reset(dispatchSupplier);
    }
  }, [sendToSupplierData]);

  /** => Do something when error send data to supplier */
  useEffect(() => {
    if (sendToSupplierError !== null) {
      setIsAvailable(false);
      setModalErrorSendDataSupplier(true);
    }
  }, [sendToSupplierError]);

  /** => Do something when success add to cart */
  useEffect(() => {
    if (addToCartData !== null) {
      handleCloseModal();
      cartTotalProductActions.fetch();
      supplierSegmentationAction.reset(dispatchSupplier);
      setToastSuccessAddCart(true);
    }
  }, [addToCartData]);

  /** => Do something when error add to cart */
  useEffect(() => {
    if (addToCartError !== null) {
      setModalErrorAddCart(true);
    }
  }, [addToCartError]);

  /** close toast listener */
  useEffect(() => {
    if (toastSuccessAddCart || toastSuccessRegisterSupplier) {
      setTimeout(() => {
        setToastSuccessAddCart(false);
        setToastSuccessRegisterSupplier(false);
      }, 3000);
    }
  }, [toastSuccessAddCart, toastSuccessRegisterSupplier]);

  /** => Did Unmount */
  useEffect(() => {
    return () => {
      setModalErrorProductDetail(false);
      productDetailActions.reset(dispatchProduct);
      supplierSegmentationAction.reset(dispatchSupplier);
      stockValidationActions.reset(dispatchStock);
    };
  }, []);

  /** === VIEW === */
  /** => Loading */
  if (productLoading || (dataProduct === null && !errorProduct)) {
    return (
      <SnbContainer color="white">
        <SnbStatusBar type="transparent1" />
        <ProductDetailHeader cartBadge={dataTotalProductCart.totalProduct} />
        <ProductDetailSkeleton />
      </SnbContainer>
    );
  }
  /** => Error */
  if (!productLoading && (errorProduct || dataProduct?.name === undefined)) {
    return (
      <SnbContainer color="white">
        <SnbStatusBar type="transparent1" />
        <ProductDetailHeader cartBadge={dataTotalProductCart.totalProduct} />
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshProduct!}
              onRefresh={() =>
                productDetailActions.refresh(dispatchProduct, productId)
              }
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
      <ProductDetailHeader cartBadge={dataTotalProductCart.totalProduct} />
      {/* Content */}
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshProduct!}
              onRefresh={() =>
                productDetailActions.refresh(dispatchProduct, productId)
              }
            />
          }>
          <ProductDetailCarousel images={dataProduct?.images!} />
          <ProductDetailMainInfo
            name={dataProduct?.name!}
            originalPrice={dataProduct?.originalPrice!}
            currentPrice={dataProduct?.currentPrice!}
            minQty={dataProduct?.minQty!}
            unit={dataProduct?.unit!}
            isExclusive={dataProduct?.isExclusive!}
            stock={defaultProperties.stock}
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
              value={`${dataProduct?.packagedQty} ${dataProduct?.unit}`}
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
      {(dataProduct !== null || errorProduct !== null) && (
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
            dataProduct === null ||
            dataStock === null ||
            orderQty > dataStock.stock ||
            orderQty < dataProduct?.minQty
          }
          isFromProductDetail={true}
        />
      )}
      {/* Toast success add cart */}
      <SnbToast
        open={toastSuccessAddCart}
        message={'Produk berhasil ditambahkan ke keranjang'}
        position={'top'}
        leftItem={
          <SnbIcon name={'check_circle'} color={color.green50} size={20} />
        }
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
    </SnbContainer>
  );
};

export default ProductDetailView;
