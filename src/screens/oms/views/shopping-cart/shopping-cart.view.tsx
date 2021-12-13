/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useState, useMemo, Fragment, useEffect } from 'react';
import { ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbDialog,
  SnbToast,
  SnbIcon,
  color,
} from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ShoppingCartInvoiceGroup } from './shopping-cart-invoice-group.view';
import { ShoppingCartEmpty } from './shopping-cart-empty.view';
import { ShoppingCartHeader } from './shopping-cart-header.view';
import { ShoppingCartFooter } from './shopping-cart-footer.view';
import { ShippingAddress } from './shipping-address.view';
import LoadingPage from '@core/components/LoadingPage';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { useVerficationOrderAction } from '../../functions/verification-order/verification-order-hook.function';
import { UserHookFunc } from '@screen/user/functions';
import {
  getSelectedVouchers,
  useVoucherLocalData,
} from '@screen/voucher/functions';
import { useReserveDiscountAction } from '@screen/promo/functions';
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
import { contexts } from '@contexts';
import {
  CartUpdatePayload,
  CartSelected,
  CartSelectedData,
  CartSelectedBrand,
  CartSelectedProduct,
  CartInvoiceGroup,
  CartBrand,
  CartProduct,
  IProductItemUpdateCart,
  ICartMasterProductNotAvailable,
} from '@models';
import {
  goToVerificationOrder,
  getTotalProducts,
  useCartMasterActions,
  useCheckoutMaster,
} from '../../functions';
import { useShopingCartContext } from 'src/data/contexts/oms/shoping-cart/useShopingCartContext';
import { usePromoContext } from 'src/data/contexts/promo/usePromoContext';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
import { useReserveStockContext } from 'src/data/contexts/product';
import { useVerificationOrderContext } from 'src/data/contexts/oms/verification-order/useVerificationOrderContext';
import {
  useCartViewActions,
  useCartUpdateActions,
  useCartSelected,
  useCartTotalProductActions,
} from '@screen/oms/functions';
import {
  useReserveStockAction,
  useStockInformationAction,
} from '@screen/product/functions';
/** === COMPONENT === */
const OmsShoppingCartView: FC = () => {
  /** === HOOKS === */
  const { cartMaster, setCartMaster, deleteProduct, setCartMasterData } =
    useCartMasterActions();
  const [allProductsSelected, setAllProductsSelected] =
    useState<boolean>(false);
  const [productSelectedCount, setProductSelectedCount] = useState(0);
  const [productRemoveSelected, setProductRemoveSelected] =
    useState<IProductItemUpdateCart | null>(null);
  const totalProducts = useMemo(
    () => getTotalProducts(cartMaster.data),
    [cartMaster.data.length],
  );
  const [
    modalConfirmationCheckoutVisible,
    setModalConfirmationCheckoutVisible,
  ] = useState(false);
  const [
    modalConfirmationRemoveProductVisible,
    setModalConfirmationRemoveProductVisible,
  ] = useState(false);
  const [loadingRemoveProduct, setLoadingRemoveProduct] = useState(false);
  const [sassionQty, setSassionQty] = useState<number>(
    Math.random() * 10000000,
  );
  const [toastSuccessRemoveProduct, setToastSuccessRemoveProduct] =
    useState(false);
  const [toastFailedRemoveProduct, setToastFailedRemoveProduct] =
    useState(false);

  const { dispatchUser } = React.useContext(contexts.UserContext);
  const { checkoutMaster } = useCheckoutMaster();
  const storeDetailAction = UserHookFunc.useStoreDetailAction();
  const cartViewActions = useCartViewActions();
  const cartUpdateActions = useCartUpdateActions();
  const cartTotalProductActions = useCartTotalProductActions();
  const {
    stateShopingCart: {
      cart: { data: cartViewData, loading: cartViewLoading },
      update: {
        data: updateCartData,
        loading: updateCartLoading,
        error: updateCartError,
      },
    },
    dispatchShopingCart,
  } = useShopingCartContext();

  /** => handle verification cart */
  const { setCartSelected } = useCartSelected();

  /**
   * Verification Order
   */
  const {
    stateVerificationOrder: {
      create: {
        data: dataCreateVerificationOrder,
        loading: loadingCreateVerificationOrder,
      },
    },
    dispatchVerificationOrder,
  } = useVerificationOrderContext();
  const {
    verificationOrderCreate,
    verificationOrderDetail,
    verificationReset,
  } = useVerficationOrderAction();

  /** Voucher Cart */
  const voucherLocalData = useVoucherLocalData();

  /**
   * Reserve Section
   * - Cancel Reserve Discount (Promo & Voucher)
   * - Cancel Reserve Stock
   */
  const { dispatchPromo } = usePromoContext();
  const {
    stateReserveStock: {
      delete: { data: cancelStockData },
    },
    dispatchReserveStock,
  } = useReserveStockContext();
  const { dispatchStock } = useStockContext();
  const reserveDiscountAction = useReserveDiscountAction();
  const reserveStockAction = useReserveStockAction();
  const stockInformationAction = useStockInformationAction();

  /** => action remove product and show comfirmation dialog */
  const onRemoveProduct = (productRemove: IProductItemUpdateCart) => {
    setProductRemoveSelected(productRemove);
    setModalConfirmationRemoveProductVisible(true);
  };

  /** => action confirmation remove product */
  const onConfirmRemoveProduct = () => {
    if (!productRemoveSelected) {
      /** do something or show modal retry */
      return;
    }

    setLoadingRemoveProduct(true);
    const params = {
      action: 'submit',
      products: [productRemoveSelected],
    };
    cartUpdateActions.fetch(dispatchShopingCart, params);
  };

  /** => action cancel remove product */
  const onCancelRemoveProduct = () => {
    setProductRemoveSelected(null);
    setLoadingRemoveProduct(false);
    setModalConfirmationRemoveProductVisible(false);
  };

  /** Confirmation checkout submit */
  const onSubmitCheckout = () => {
    if (cartViewData === null) {
      /** DO SOMETHING */
      /** Show modal error/retry */
      return;
    }
    const params: CartUpdatePayload = {
      action: 'submit',
      products: [],
    };

    const dataSelected: CartSelectedData[] = [];

    cartMaster.data.forEach((invoiceGroup) => {
      /** => initial brand selected */
      const brandsSelected: CartSelectedBrand[] = [];
      invoiceGroup.brands.forEach((brand) => {
        /** => initial product selected */
        const productsSelected: CartSelectedProduct[] = [];
        brand.products.forEach((product) => {
          params.products.push({
            productId: product.productId,
            qty: product.qty,
            selected: product.selected,
            stock: product.stock,
          });

          if (product.selected) {
            /** => insert product selected */
            productsSelected.push({
              productId: product.productId,
              qty: product.qty,
              displayPrice: product.displayPrice,
              priceBeforeTax: product.priceBeforeTax,
              priceAfterTax: product.priceAfterTax,
              warehouseId: product.warehouseId,
            });
          }
        });
        if (productsSelected.length > 0) {
          /** => insert brand selected */
          brandsSelected.push({
            brandId: brand.brandId,
            products: productsSelected,
          });
        }
      });
      if (brandsSelected.length > 0) {
        /** => insert data selected */
        dataSelected.push({
          invoiceGroupId: invoiceGroup.invoiceGroupId,
          portfolioId: invoiceGroup.portfolioId,
          brands: brandsSelected,
          sellerId: invoiceGroup.sellerId,
          channelId: invoiceGroup.channelId,
          groupId: invoiceGroup.groupId,
          typeId: invoiceGroup.typeId,
          clusterId: invoiceGroup.clusterId,
        });
      }
    });

    const paramsCartSelected: CartSelected = {
      id: cartViewData.cartId,
      data: dataSelected,
      isActiveStore: cartViewData.isActiveStore,
    };

    const paramsVerificationCreate: CartSelected = {
      id: cartViewData.cartId,
      data: dataSelected,
      isActiveStore: cartViewData.isActiveStore,
      voucherIds: getSelectedVouchers(voucherLocalData.selectedVoucher),
    };

    /** => fetch post update cart */
    cartUpdateActions.fetch(dispatchShopingCart, params);
    /** => update state verification cart */
    setCartSelected(paramsCartSelected);
    /** => fetch post potential discount */
    verificationOrderCreate(
      dispatchVerificationOrder,
      paramsVerificationCreate,
    );
  };

  /** => did mounted */
  useEffect(() => {
    cartViewActions.fetch(dispatchShopingCart);
    storeDetailAction.detail(dispatchUser);
    if (checkoutMaster.cartId) {
      reserveDiscountAction.del(dispatchPromo, checkoutMaster.cartId);
      reserveStockAction.del(dispatchReserveStock, checkoutMaster.cartId);
    }
  }, []);

  /** => Listen data cancel reserve stock */
  useEffect(() => {
    if (checkoutMaster.cartId && cancelStockData !== null) {
      stockInformationAction.fetch(dispatchStock, checkoutMaster.cartId);
    }
  }, [cancelStockData]);

  /** => Listen create verification order and update cart navigating to order verification screen  */
  useEffect(() => {
    /** => below is the action if the update cart & potential discount fetch success */
    if (
      dataCreateVerificationOrder !== null &&
      updateCartData !== null &&
      productRemoveSelected === null
    ) {
      verificationOrderDetail(
        dispatchVerificationOrder,
        dataCreateVerificationOrder.id,
      );
      setModalConfirmationCheckoutVisible(false);
      goToVerificationOrder();
    }
  }, [dataCreateVerificationOrder, updateCartData]);

  /** Listen changes cartState */
  useEffect(() => {
    if (cartViewData !== null) {
      let totalProductsSelected = 0;
      const data: CartInvoiceGroup[] = [];
      const dataEmptyStock: ICartMasterProductNotAvailable[] = [];
      const dataNotFound: ICartMasterProductNotAvailable[] = [];
      cartViewData.data.forEach((invoiceGroup) => {
        let isEmptyBrand = true;
        const brands: CartBrand[] = [];
        invoiceGroup.brands.forEach((brand) => {
          let isEmptyProduct = true;
          let brandSelected = false;
          const products: CartProduct[] = [];
          brand.products.forEach((product) => {
            if (product.selected) {
              totalProductsSelected += 1;
              brandSelected = true;
            }
            products.push(product);
            isEmptyProduct = false;
          });
          if (!isEmptyProduct) {
            brands.push({
              ...brand,
              selected: brandSelected,
              products: products,
            });
            isEmptyBrand = false;
          }
        });
        if (!isEmptyBrand) {
          data.push({ ...invoiceGroup, brands: brands });
        }
      });
      if (totalProductsSelected === totalProducts) {
        setAllProductsSelected(true);
      }

      setCartMaster({
        ...cartViewData,
        data: data,
        dataEmptyStock: dataEmptyStock,
        dataNotFound: dataNotFound,
        others: [],
      });
      setProductSelectedCount(totalProductsSelected);
    }
  }, [cartViewData]);

  /** Listen product will be removed */
  useEffect(() => {
    if (productRemoveSelected !== null && updateCartData !== null) {
      //call action remove product from redux
      if (productRemoveSelected.selected) {
        setProductSelectedCount(productSelectedCount - 1);
      }
      setToastSuccessRemoveProduct(true);
      deleteProduct({ productId: productRemoveSelected.productId });
      setProductRemoveSelected(null);
      setLoadingRemoveProduct(false);
      setSassionQty(Math.random() * 10000000);
      setModalConfirmationRemoveProductVisible(false);
      cartTotalProductActions.fetch();
      cartUpdateActions.reset(dispatchShopingCart);
    }
  }, [productRemoveSelected, updateCartData]);

  /** Listen error remove */
  useEffect(() => {
    if (productRemoveSelected !== null && updateCartError !== null) {
      setToastFailedRemoveProduct(true);
      setLoadingRemoveProduct(false);
      cartUpdateActions.reset(dispatchShopingCart);
    }
  }, [productRemoveSelected, updateCartError]);

  /** close toast listener */
  useEffect(() => {
    if (toastSuccessRemoveProduct || toastFailedRemoveProduct) {
      setTimeout(() => {
        setToastSuccessRemoveProduct(false);
        setToastFailedRemoveProduct(false);
      }, 1500);
    }
  }, [toastSuccessRemoveProduct, toastFailedRemoveProduct]);

  /** did will unmound */
  useEffect(() => {
    return () => {
      verificationReset(dispatchVerificationOrder);
      reserveDiscountAction.resetDelete(dispatchPromo);
      reserveStockAction.resetDelete(dispatchReserveStock);
    };
  }, []);

  /** === VIEW === */
  /** => Main */
  return (
    <SnbContainer color="white">
      <ShoppingCartHeader />
      {cartViewLoading ? (
        <LoadingPage />
      ) : (
        <>
          {Array.isArray(cartMaster.data) && cartMaster.data.length > 0 ? (
            <Fragment>
              <ScrollView>
                <ShippingAddress />
                {/* Invoice Group List */}
                <Fragment>
                  {cartMaster.data.map((invoiceGroup, invoiceGroupIndex) => (
                    <ShoppingCartInvoiceGroup
                      key={invoiceGroup.invoiceGroupId.toString()}
                      invoiceGroup={invoiceGroup}
                      invoiceGroupIndex={invoiceGroupIndex}
                      invoiceGroups={cartMaster.data}
                      setInvoiceGroups={setCartMasterData}
                      productSelectedCount={productSelectedCount}
                      setProductSelectedCount={setProductSelectedCount}
                      setAllProductsSelected={setAllProductsSelected}
                      totalProducts={totalProducts}
                      sassionQty={sassionQty}
                      setSassionQty={setSassionQty}
                      onRemoveProduct={onRemoveProduct}
                    />
                  ))}
                </Fragment>
              </ScrollView>
              <ShoppingCartFooter
                allProductsSelected={allProductsSelected}
                invoiceGroups={cartMaster.data}
                setInvoiceGroups={setCartMasterData}
                setProductSelectedCount={setProductSelectedCount}
                setAllProductsSelected={setAllProductsSelected}
                totalProducts={totalProducts}
                productSelectedCount={productSelectedCount}
                openModalCheckout={setModalConfirmationCheckoutVisible}
              />
            </Fragment>
          ) : (
            <ShoppingCartEmpty />
          )}
        </>
      )}
      {/* Confirmation Modal Checkout */}
      <SnbDialog
        open={modalConfirmationCheckoutVisible}
        title="Konfirmasi"
        content="Konfirmasi order dan lanjut ke Checkout?"
        ok={onSubmitCheckout}
        cancel={() => setModalConfirmationCheckoutVisible(false)}
        loading={loadingCreateVerificationOrder || updateCartLoading}
      />
      <SnbDialog
        open={modalConfirmationRemoveProductVisible}
        title="Konfirmasi"
        content="Apakah Anda yakin untuk menghapus barang?"
        ok={onConfirmRemoveProduct}
        cancel={onCancelRemoveProduct}
        loading={loadingRemoveProduct}
      />
      {/* Toast success add cart */}
      <SnbToast
        open={toastSuccessRemoveProduct}
        message={'Produk berhasil dihapus dari keranjang'}
        close={() => setToastSuccessRemoveProduct(false)}
        position={'top'}
        leftItem={
          <SnbIcon name={'check_circle'} color={color.green50} size={20} />
        }
      />
      {/* Toast failed add cart */}
      <SnbToast
        open={toastFailedRemoveProduct}
        message={'Produk gagal dihapus dari keranjang'}
        close={() => setToastFailedRemoveProduct(false)}
        position={'top'}
        leftItem={<SnbIcon name={'x_circle'} color={color.red50} size={20} />}
      />
    </SnbContainer>
  );
};

export default OmsShoppingCartView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: Maulana Ghozi
 * updatedDate: 11112021
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
