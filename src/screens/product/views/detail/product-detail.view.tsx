/** === IMPORT PACKAGES ===  */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl, StatusBar } from 'react-native';
import {
  SnbContainer,
  SnbStatusBar,
  SnbToast2,
  SnbText2,
  spacingV2,
  FooterButton,
  colorV2,
} from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import { EmptyState } from '@core/components/EmptyState';
import Html from '@core/components/Html';
import BulkPricingList from '@core/components/product/BulkPricingList';
import { ProductDetailHeader } from './ProductDetailHeader';
import { ProductDetailCarousel } from './ProductDetailCarousel';
import { ProductDetailMainInfo } from './ProductDetailMainInfo';
// import { ProductDetailSupplierInfo } from './ProductDetailSupplierInfo';
import { PromoSection } from './PromoSection';
import { ProductDetailSection } from './ProductDetailSection';
import { ProductDetailSectionItem } from './ProductDetailSectionItem';
// import { ActionButton } from './ActionButton';
import { UnavailableSkuFlag } from './UnavailableSkuFlag';
// import { PromoModal } from './PromoModal';
import { ProductDetailSkeleton } from './ProductDetailSkeleton';
// import { BundleSection } from './BundleSection';
import {
  // RegisterSupplierModal,
  // RejectApprovalModal,
  WaitingApprovalModal,
  AddToCartModal,
} from '@core/components/modal';
import BottomSheetError from '@core/components/BottomSheetError';
import NeedLoginModal from '@core/components/modal/need-login/NeedLoginModal';
/** === IMPORT FUNCTIONS === */
import { NavigationAction } from '@core/functions/navigation';
import { contexts } from '@contexts';
import useAddToCart from '@core/components/modal/add-to-cart/add-to-cart.function';
// import { usePotentialPromoProductAction } from '@screen/promo/functions';
import { goToBundle, goBack } from '../../functions';
/** === IMPORT HOOKS === */
import {
  useCheckDataSupplier,
  // useSupplierSegmentationDetailAction,
  // useRegisterSupplierActions,
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
// import { useSupplierContext } from 'src/data/contexts/supplier/useSupplierContext';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
import { useDataAuth } from '@core/redux/Data';
import { useGetTotalCartAction } from '@screen/oms/functions';
import * as models from '@models';
import openWhatsApp from '@core/functions/global/linking/open-whatsapp';

/** === COMPONENT === */
const ProductDetailView: FC = () => {
  /** === HOOKS === */
  const {
    params: { id, warehouseId },
  } = NavigationAction.useGetNavParams<{ id: string; warehouseId: string }>();
  const [isAvailable, setIsAvailable] = useState(true);
  const { orderModalVisible, setOrderModalVisible } = useOrderModalVisibility();
  const [loadingButton, setLoadingButton] = useState(true);
  const [modalErrorAddCart, setModalErrorAddCart] = useState(false);
  const [modalErrorProductDetail, setModalErrorProductDetail] = useState(false);
  const [modalNeedToLogin, setModalNeedToLogin] = useState(false);

  /** => actions */
  const stockValidationActions = useStockValidationDetailAction();
  const productDetailActions = useProductDetailAction();
  const addToCartAction = useAddToCartAction();
  const totalCartActions = useGetTotalCartAction();
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
    stateStock: {
      detail: { data: dataStock, error: errorStock },
    },
    dispatchStock,
  } = useStockContext();

  /** => for bulk price */
  const { bulkPriceAterTax, isPriceGrosir } = useAddToCart(orderQty, true);

  /** => check data supplier and sinbad status */
  const {
    checkUser,
    // modalRejectApproval,
    modalWaitingApproval,
    // modalRegisterSupplier,
    onFunctionActions,
  } = useCheckDataSupplier(setOrderModalVisible);

  /** => action from button order */
  const handleOrderPress = useCallback(() => {
    if (me.data !== null) {
      if (me.data.approvalStatus === 'verified') {
        checkUser({
          sinbadStatus: me.data.approvalStatus,
          supplierStatus: 'verified',
        });
      }
    } else {
      setModalNeedToLogin(true);
    }
  }, [me.data]);

  /** => action close modal add to cart */
  const handleCloseModal = () => {
    // addToCartActions.reset(dispatchShopingCart);
    // sendDataToSupplierActions.reset(dispatchSupplier);
    setLoadingButton(false);
    setOrderModalVisible(false);
    setModalErrorAddCart(false);
    // setModalErrorSendDataSupplier(false);
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
    if (dataProduct === null || dataStock === null) {
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
      lastUsedPrice = dataProduct.priceAfterTax;
    }

    const priceRules = dataProduct.bulkPrices.map((item) => {
      return {
        minQty: item.qty,
        priceAfterTax: item.priceAfterTax,
        priceBeforeTax: item.priceBeforeTax,
        taxPrice: item.taxPrice,
      };
    });

    const params: models.AddToCartPayload = {
      productId: dataProduct.id,
      productName: dataProduct.name,
      categoryId: dataProduct.categoryId,
      productImageUrl: dataProduct?.images[0]?.url ?? '',
      minQty: dataProduct.minQty,
      qty: orderQty,
      multipleQty: dataProduct.multipleQty,
      qtyPerBox: dataProduct.packagedQty,
      uomLabel: dataProduct.unit,
      warehouseId: Number(dataProduct.warehouseOriginId),
      sellerId: Number(dataProduct.sellerId),
      sellerName: dataProduct.productSeller.name,
      taxPercentage: dataProduct.productTax.amount,
      lastUsedPrice,
      isLastPriceUsedRules,
      priceAfterTax: dataProduct.priceAfterTax,
      priceBeforeTax: dataProduct.priceBeforeTax,
      taxPrice: dataProduct.taxPrice,
      priceRules,
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
  } = React.useContext(contexts.PromoContext);

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
    // supplierSegmentationAction.reset(dispatchSupplier);
    productDetailActions.fetch(dispatchProduct, { id, warehouseId });
    if (dataProduct && me.data) {
      stockValidationActions.fetch(dispatchStock, {
        warehouseId: Number(dataProduct.warehouseOriginId) ?? null,
        productId: dataProduct.id,
      });
    }
  };

  const onOpenWhatsApp = useCallback(() => {
    const message = `Halo Sinbad, saya ingin bertanya tentang produk ${dataProduct?.name} (${dataProduct?.code}) ini dong`;
    openWhatsApp('+6282260106010', message);
  }, [dataProduct?.name, dataProduct?.code]);

  /** === EFFECT LISTENER === */
  /** => Did Mounted */
  useEffect(() => {
    setLoadingButton(true);
    productDetailActions.fetch(dispatchProduct, { id, warehouseId });
  }, [id, warehouseId]);

  /** => Listen data product success */
  useEffect(() => {
    if (dataProduct !== null && me.data !== null) {
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
    if (dataProduct !== null) {
      if (!me.data) {
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
          warehouseId: Number(dataProduct.warehouseOriginId) ?? null,
          productId: dataProduct.id,
        });
        setIsAvailable(true);
      }
    }
  }, [dataProduct]);

  /** => Listen error segmentation and product detail to fetch validation stock */
  useEffect(() => {
    if (dataProduct !== null) {
      if (!me.data) {
        setIsAvailable(true);
      }
    }
  }, [dataProduct, me]);

  /** Listen success get stock */
  useEffect(() => {
    if (dataStock !== null) {
      setTimeout(() => {
        setLoadingButton(false);
      }, 1500);
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

  // /** => Do something when success add to cart */
  useEffect(() => {
    if (stateCart.create.data !== null) {
      handleCloseModal();
      totalCartActions.fetch(dispatchCart);
      SnbToast2.show('Produk berhasil ditambahkan ke keranjang', 2000, {
        position: 'top',
        positionValue: StatusBar.currentHeight,
      });
    }
  }, [stateCart.create.data]);

  // /** => Do something when error add to cart */
  useEffect(() => {
    if (stateCart.create.error !== null) {
      setOrderModalVisible(false);
      setTimeout(() => setModalErrorAddCart(true), 500);
    }
  }, [stateCart.create.error, setOrderModalVisible]);

  /** => Did Unmount */
  useEffect(() => {
    return () => {
      setModalErrorProductDetail(false);
      productDetailActions.reset(dispatchProduct);
      // supplierSegmentationAction.reset(dispatchSupplier);
      stockValidationActions.reset(dispatchStock);
      addToCartAction.reset(dispatchCart);
    };
  }, []);

  /** === VIEW === */
  /** => Loading */
  if (productLoading || (dataProduct === null && !errorProduct)) {
    return (
      <SnbContainer color="white">
        <SnbStatusBar type="transparent1" />
        <ProductDetailHeader
          cartBadge={stateCart.total.data?.totalProducts ?? 0}
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
          cartBadge={stateCart.total.data?.totalProducts ?? 0}
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
        cartBadge={stateCart.total.data?.totalProducts ?? 0}
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
            priceAfterTax={dataProduct?.priceAfterTax!}
            qtySoldLabel={dataProduct?.qtySoldLabel!}
            loading={loadingButton}
            unit={dataProduct?.unit!}
            isExclusive={dataProduct?.isExclusive!}
            stock={defaultProperties.stock}
            showStock={me.data !== null}
            hasBulkPrice={dataProduct?.hasBulkPrice!}
            hasPromo={false} // When promoList.length > 0 set to true, for now it'll be set to false (waiting for promo integration)
          />
          {dataProduct?.hasBulkPrice ? (
            <View style={{ paddingBottom: spacingV2.spacing.lg }}>
              <BulkPricingList bulkPrices={dataProduct.bulkPrices} />
            </View>
          ) : (
            <View />
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
          <ProductDetailSection title="Nama Supplier" separator={false}>
            <ProductDetailSectionItem
              name={dataProduct?.productSeller.name ?? '-'}
              value=""
            />
          </ProductDetailSection>
          <ProductDetailSection title="Detail Produk">
            <SnbText2.Paragraph.Small color={colorV2.textColor.secondary}>
              {dataProduct?.detail ?? '-'}
            </SnbText2.Paragraph.Small>
          </ProductDetailSection>
          {/* deskripsi harus render html dengan wrap <p></p> */}
          <ProductDetailSection title="Deskripsi Produk">
            <Html value={dataProduct?.description ?? '-'} fontSize={12} />
          </ProductDetailSection>
          <View style={{ height: 10 }} />
        </ScrollView>
      </View>
      <React.Fragment>
        {isAvailable ? (
          <FooterButton.Dual
            title1={getActionButtonTitle()}
            title2=""
            shadow={false}
            loading={loadingButton}
            loadingButton={loadingButton}
            disabled={
              me.data !== null &&
              defaultProperties.stock < (dataProduct?.minQty ?? 1)
            }
            button1Press={handleOrderPress}
            button2Press={onOpenWhatsApp}
            iconButton="chat"
          />
        ) : (
          <UnavailableSkuFlag />
        )}
      </React.Fragment>
      {/* Waiting Approval Modal */}
      <WaitingApprovalModal
        visible={modalWaitingApproval}
        onSubmit={handleCloseModal}
        onClose={handleCloseModal}
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
          orderQty < dataProduct?.minQty ||
          dataProduct.minQty > dataStock.stock
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
      <SnbToast2 />
    </SnbContainer>
  );
};

export default ProductDetailView;
