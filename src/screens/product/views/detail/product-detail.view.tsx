/** === IMPORT PACKAGES ===  */
import React, { FC, useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import {
  SnbText,
  SnbContainer,
  SnbStatusBar,
  SnbToast,
  SnbIcon,
  color,
} from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import { EmptyState } from '@core/components/EmptyState';
import { ProductDetailHeader } from './ProductDetailHeader';
import { ProductDetailCarousel } from './ProductDetailCarousel';
import { ProductDetailMainInfo } from './ProductDetailMainInfo';
import { ProductDetailSupplierInfo } from './ProductDetailSupplierInfo';
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
/** === IMPORT FUNCTIONS === */
import { NavigationAction } from '@core/functions/navigation';
import { contexts } from '@contexts';
import { usePotentialPromoProductAction } from '@screen/promo/functions';
import { goToBundle } from '../../functions';
/** === IMPORT HOOKS === */
import {
  useCheckDataSupplier,
  useSendDataToSupplierActions,
  useSupplierSegmentationDetailAction,
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
const productDetailDummy = {
  id: '1',
  name: 'LAKME CC CREAM ALMOND',
  images: [
    {
      url: 'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
    },
    {
      url: 'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400582.png',
    },
  ],
  currentPrice: 77891,
  originalPrice: 85680,
  packagedQty: 5,
  minQty: 1,
  unit: 'Pcs',
  isExclusive: true,
  detail: 'It is what it is.',
  description: 'Good for skin obviously, experience the difference!',
  productWeight: 100,
  promoList: [
    {
      promoSellerId: '6149f9c2a5868baca3e6f8eb',
      shortDescription:
        'Setiap pembelian produk Lakme sebesar 2jt atau lebih, customer berhak mendapatkan potongan diskon sebesar 1%.\nSetiap pembelian di atas 5jt atau lebih, customer berhak mendapatkan potongan diskon sebesar 2%',
    },
    {
      promoSellerId: '6149f9c2a5868baca3e6f8eb',
      shortDescription:
        'Setiap pembelian produk Lakme sebesar 10jt atau lebih, customer berhak mendapatkan potongan diskon sebesar 3%.',
    },
  ],
  supplier: {
    name: 'Depo Berkah Abadi',
    urbanCity: 'Jakarta Barat',
    logoUrl: '',
  },
  discount: '10%',
};
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
  const [toastFailedAddCart, setToastFailedAddCart] = useState(false);

  /** => actions */
  const addToCartActions = useAddToCart();
  const stockValidationActions = useStockValidationDetailAction();
  const productDetailActions = useProductDetailAction();
  const supplierSegmentationAction = useSupplierSegmentationDetailAction();
  const sendDataToSupplierActions = useSendDataToSupplierActions();
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
  const { orderQty, increaseOrderQty, decreaseOrderQty } = useOrderQuantity({
    minQty: dataProduct?.minQty,
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
      create: { data: sendToSupplierData },
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
    setOrderModalVisible(false);
    onFunctionActions({ type: 'close' });
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

  /** => potential promo product effect */
  React.useEffect(() => {
    if (dataProduct !== null && me.data !== null) {
      const { id } = dataProduct;
      potentialPromoProductAction.reset(dispatchPromo);
      potentialPromoProductAction.detail(dispatchPromo, id);
    }
  }, [dataProduct]);

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
      } else {
        return 'Tambah ke Keranjang';
      }
    }

    return 'Stock Habis';
  };
  /** === EFFECT LISTENER === */
  /** => Did Mounted */
  useEffect(() => {
    productDetailActions.fetch(dispatchProduct, productId);
  }, []);

  /** => Listen data product success */
  useEffect(() => {
    if (dataProduct && me.data !== null) {
      supplierSegmentationAction.fetch(dispatchSupplier, dataProduct.sellerId);
    }
  }, [dataProduct]);

  /** => Listen data segmentation and product detail to fetch validation stock */
  useEffect(() => {
    if (dataSegmentation && dataSegmentation.dataSuppliers && dataProduct) {
      stockValidationActions.fetch(dispatchStock, {
        warehouseId: dataSegmentation.dataSuppliers.warehouseId ?? null,
        productId: dataProduct.id,
      });
    }
  }, [dataSegmentation, dataProduct]);

  /** Listen Error Stock */
  useEffect(() => {
    if (errorStock && dataProduct) {
      if (errorStock.code === 400) {
        setIsAvailable(false);
      }
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
    }
  }, [sendToSupplierData]);

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
      setToastFailedAddCart(true);
      addToCartActions.reset(dispatchShopingCart);
    }
  }, [addToCartError]);

  /** close toast listener */
  useEffect(() => {
    if (toastSuccessAddCart || toastFailedAddCart) {
      setTimeout(() => {
        setToastSuccessAddCart(false);
        setToastFailedAddCart(false);
      }, 2000);
    }
  }, [toastSuccessAddCart, toastFailedAddCart]);

  /** => Did Unmount */
  useEffect(() => {
    return () => {
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
            logo={productDetailDummy.supplier.logoUrl}
            name={productDetailDummy.supplier.name}
            urbanCity={productDetailDummy.supplier.urbanCity}
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
            <SnbText.B3>{dataProduct?.detail}</SnbText.B3>
          </ProductDetailSection>
          <ProductDetailSection title="Deskripsi Produk">
            <SnbText.B3>{dataProduct?.description}</SnbText.B3>
          </ProductDetailSection>
          <View style={{ height: 10 }} />
        </ScrollView>
      </View>
      {isAvailable ? (
        <ActionButton
          title={getActionButtonTitle()}
          disabled={defaultProperties.stock < (dataProduct?.minQty ?? 1)}
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
          increaseOrderQty={increaseOrderQty}
          decreaseOrderQty={decreaseOrderQty}
          open={orderModalVisible}
          closeAction={handleCloseModal}
          onAddToCartPress={onSubmitAddToCart}
          disabled={dataStock === null}
          isFromProductDetail={true}
        />
      )}
      {/* Toast success add cart */}
      <SnbToast
        open={toastSuccessAddCart}
        message={'Produk berhasil ditambahkan ke keranjang'}
        close={() => setToastSuccessAddCart(false)}
        position={'top'}
        leftItem={
          <SnbIcon name={'check_circle'} color={color.green50} size={20} />
        }
      />
      {/* Toast failed add cart */}
      <SnbToast
        open={toastFailedAddCart}
        message={'Produk gagal ditambahkan ke keranjang'}
        close={() => setToastFailedAddCart(false)}
        position={'top'}
        leftItem={<SnbIcon name={'x_circle'} color={color.red50} size={20} />}
      />
    </SnbContainer>
  );
};

export default ProductDetailView;
