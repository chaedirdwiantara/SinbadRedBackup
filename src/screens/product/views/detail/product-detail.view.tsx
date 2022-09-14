/** === IMPORT PACKAGES ===  */
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { View, ScrollView, RefreshControl, StatusBar } from 'react-native';
import {
  SnbContainer,
  SnbStatusBar,
  SnbToast2,
  spacingV2,
  FooterButton,
  SnbInfoBox2,
} from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import { ErrorView } from '../../components';
import SnbHtml2 from '@core/components/HtmlComponent';
import BulkPricingList from '@core/components/product/BulkPricingList';
import { ProductDetailHeader } from './ProductDetailHeader';
import { ProductDetailCarousel } from './ProductDetailCarousel';
import { ProductDetailMainInfo } from './ProductDetailMainInfo';
import { ProductDetailSection } from './ProductDetailSection';
import { ProductDetailSectionItem } from './ProductDetailSectionItem';
import { UnavailableSkuFlag } from './UnavailableSkuFlag';
import { ProductDetailSkeleton } from './ProductDetailSkeleton';
import { WaitingApprovalModal, AddToCartModal } from '@core/components/modal';
import BottomSheetError from '@core/components/BottomSheetError';
import NeedLoginModal from '@core/components/modal/need-login/NeedLoginModal';
/** === IMPORT FUNCTIONS === */
import { NavigationAction } from '@core/functions/navigation';
import debounce from 'lodash/debounce';
import { contexts } from '@contexts';
import useAddToCart from '@core/components/modal/add-to-cart/add-to-cart.function';
import { goBack, useOutOfStockUtil } from '../../functions';
/** === IMPORT HOOKS === */
import { useCheckDataSupplier } from '@core/functions/supplier';
import {
  useProductDetailAction,
  useStockValidationDetailAction,
  useOrderQuantity,
} from '@screen/product/functions';
import { useAddToCartAction } from '@screen/oms/functions/cart/cart-hook.function';
import { useOrderModalVisibility } from '@core/functions/product';
import { useProductContext } from 'src/data/contexts/product';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
import { useDataAuth } from '@core/redux/Data';
import { useGetTotalCartAction } from '@screen/oms/functions';
import * as models from '@models';
import openWhatsApp from '@core/functions/global/linking/open-whatsapp';

/** == CONSTANT */
const testID = 'product-detail';

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
  const {
    infoBoxReminderLabel,
    buttonLabelReminder,
    buttonTypeReminder,
    iconReminder,
    stockReminder,
    onCreateReminder,
    onRemoveReminder,
  } = useOutOfStockUtil({ id, warehouseId });

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

  // function
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

  const handleOnReminderPress = useCallback(() => {
    if (stockReminder?.stockRemind) {
      onRemoveReminder();
    } else {
      onCreateReminder();
    }
  }, [stockReminder?.stockRemind]);

  /** => action from button order */
  const onPressMainFooterButton = useCallback(
    debounce(() => {
      if (dataProduct?.isStockAvailable) {
        handleOrderPress();
      } else {
        handleOnReminderPress();
      }
    }, 500),
    [dataProduct?.isStockAvailable, handleOrderPress, handleOnReminderPress],
  );

  /** => action close modal add to cart */
  const handleCloseModal = () => {
    setLoadingButton(false);
    setOrderModalVisible(false);
    setModalErrorAddCart(false);

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
      qtyPerBox: dataProduct.packagedQty,
      uomLabel: dataProduct.unit,
      warehouseId: Number(dataProduct.warehouseOriginId),
      sellerId: Number(dataProduct.productSeller.id),
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
  // information dimension of product
  const dimensionProduct = useMemo(() => {
    const [unit, length, width, height] = [
      dataProduct?.packagedDimensionLabel ?? 'cm',
      dataProduct?.packagedDimensionLength ?? 0,
      dataProduct?.packagedDimensionWidth ?? 0,
      dataProduct?.packagedDimensionHeight ?? 0,
    ];
    // length x width x height
    return `${length}${unit} X ${width}${unit} X ${height}${unit}`;
  }, [dataProduct]);
  /** === FUNCTION === */

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
          <ErrorView
            testID={testID}
            onPress={() => NavigationAction.goToMenu('HomeView')}
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
          {!dataProduct?.isStockAvailable && (
            <SnbInfoBox2
              full
              testID={testID}
              color="yellow"
              title="Stok Habis"
              leftIconSize={24}
              leftIcon="info"
              description={infoBoxReminderLabel}
            />
          )}
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
              <BulkPricingList
                bulkPrices={dataProduct.bulkPrices}
                testID={testID}
              />
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
              // unit will be dynamic
              value={`${dataProduct?.packagedWeight} ${dataProduct?.packagedWeightLabel}`}
            />
            <ProductDetailSectionItem
              name="Dimensi per-Dus"
              value={dimensionProduct}
              bottomSpaces={0}
            />
          </ProductDetailSection>
          <ProductDetailSection title="Nama Supplier" separator={false}>
            <ProductDetailSectionItem
              name={dataProduct?.productSeller?.name ?? '-'}
              value=""
            />
          </ProductDetailSection>
          {/* deskripsi harus render html dengan wrap <p></p> */}
          <ProductDetailSection title="Deskripsi Produk">
            <SnbHtml2 value={dataProduct?.description ?? '-'} />
          </ProductDetailSection>
          <View style={{ height: 10 }} />
        </ScrollView>
      </View>
      <React.Fragment>
        {isAvailable ? (
          <FooterButton.Dual
            testID={testID}
            title1={buttonLabelReminder}
            title2=""
            shadow={false}
            loading={loadingButton}
            loadingButton={loadingButton}
            // disabled={
            //   me.data !== null &&
            //   defaultProperties.stock < (dataProduct?.minQty ?? 1)
            // }
            button1Type={buttonTypeReminder}
            icon1Button={iconReminder}
            button1Press={onPressMainFooterButton}
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
        testID={testID}
        orderQty={orderQty}
        onBlur={handleCloseModal}
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
