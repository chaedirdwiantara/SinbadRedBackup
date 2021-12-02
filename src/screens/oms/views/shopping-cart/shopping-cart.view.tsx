/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useState, useMemo, Fragment, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { SnbContainer, SnbDialog } from 'react-native-sinbad-ui';
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
import { getSelectedVouchers } from '@screen/voucher/functions';
import {
  useCheckAllPromoPaymentAction,
  useReserveDiscountAction,
} from '@screen/promo/functions';
import { useDataVoucher } from '@core/redux/Data';
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
} from '@models';
import {
  goToVerificationOrder,
  getTotalProducts,
  useCartMasterActions,
  useCheckoutMaster,
} from '../../functions';
import { useShopingCartContext } from 'src/data/contexts/oms/shoping-cart/useShopingCartContext';
import {
  useCartViewActions,
  useCartUpdateActions,
  useCartSelected,
} from '@screen/oms/functions/shopping-cart/shopping-cart-hook.function';
import { useReserveStockContext } from 'src/data/contexts/product';
import { useReserveStockAction } from '@screen/product/functions';
/** === COMPONENT === */
const OmsShoppingCartView: FC = () => {
  /** === HOOKS === */
  const { cartMaster, setCartMaster, deleteProduct, setCartMasterData } =
    useCartMasterActions();
  const [allProductsSelected, setAllProductsSelected] =
    useState<boolean>(false);
  const [productSelectedCount, setProductSelectedCount] = useState(0);
  const [productIdRemoveSelected, setProductIdRemoveSelected] = useState<
    string | null
  >(null);
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

  const { dispatchUser } = React.useContext(contexts.UserContext);
  const { checkoutMaster } = useCheckoutMaster();
  const storeDetailAction = UserHookFunc.useStoreDetailAction();
  const cartViewActions = useCartViewActions();
  const cartUpdateActions = useCartUpdateActions();
  const {
    stateShopingCart: {
      cart: { data: cartViewData, loading: cartViewLoading },
      update: { data: updateCartData, loading: updateCartLoading },
    },
    dispatchShopingCart,
  } = useShopingCartContext();

  /** => handle verification cart */
  const { setCartSelected } = useCartSelected();

  /**
   * Verification Order
   */
  const { stateVerificationOrder, dispatchVerificationOrder } =
    React.useContext(contexts.VerificationOrderContext);
  const {
    verificationOrderCreate,
    verificationOrderDetail,
    verificationCreateReset,
  } = useVerficationOrderAction();
  useEffect(() => {
    /** => handle close modal if fetch is done */
    if (!stateVerificationOrder.create.loading && !updateCartLoading) {
      setModalConfirmationCheckoutVisible(false);
    }
    /** => below is the action if the update cart & potential discount fetch success */
    if (
      stateVerificationOrder.create.data !== null &&
      updateCartData !== null
    ) {
      verificationOrderDetail(
        dispatchVerificationOrder,
        stateVerificationOrder.create.data.id,
      );
      goToVerificationOrder();
    }
  }, [stateVerificationOrder.create, updateCartData]);

  /** Voucher Cart */
  const voucherData = useDataVoucher();

  /**
   * Reserve Section
   * - Cancel Reserve Stock
   * - Cancel Reserve Discount (Promo & Voucher)
   */
  const {
    dispatchPromo,
    statePromo: { checkAllPromoPayment: stateCheckAllPromoPayment },
  } = React.useContext(contexts.PromoContext);
  const { dispatchReserveStock } = useReserveStockContext();
  const reserveDiscountAction = useReserveDiscountAction();
  const reserveStockAction = useReserveStockAction();
  // const checkPromoPaymentAction = useCheckPromoPaymentAction();
  const checkAllPromoPaymentAction = useCheckAllPromoPaymentAction();
  React.useEffect(() => {
    if (checkoutMaster.cartId) {
      reserveDiscountAction.del(dispatchPromo, checkoutMaster.cartId);
      reserveStockAction.del(dispatchReserveStock, checkoutMaster.cartId);
    }
    // checkPromoPaymentAction.list(dispatchPromo, {
    //   paymentTypeId: 1,
    //   paymentChannelId: [1, 2, 3],
    //   parcelPrice: 9000,
    //   invoiceGroupId: '2',
    //   sellerId: 1,
    // });
    checkAllPromoPaymentAction.create(dispatchPromo, [
      {
        invoiceGroupId: '4',
        cartParcelId: '1',
        paymentTypeId: 1,
        paymentChannelId: 1,
        parcelPrice: 100000,
      },
      {
        invoiceGroupId: '5',
        cartParcelId: '2',
        paymentTypeId: 1,
        paymentChannelId: 1,
        parcelPrice: 100000,
      },
    ]);
  }, []);
  React.useEffect(() => {
    if (stateCheckAllPromoPayment.create.data !== null) {
      checkAllPromoPaymentAction.list(
        dispatchPromo,
        stateCheckAllPromoPayment.create.data.id,
      );
    }
  }, [stateCheckAllPromoPayment.create]);

  /** Get Cart View */
  useEffect(() => {
    cartViewActions.fetch(dispatchShopingCart);
    storeDetailAction.detail(dispatchUser);
    cartViewActions.fetch(dispatchShopingCart);

    return () => {
      verificationCreateReset(dispatchVerificationOrder);
    };
  }, []);

  /** Listen changes cartState */
  useEffect(() => {
    if (cartViewData !== null) {
      let totalProductsSelected = 0;
      const data: CartInvoiceGroup[] = [];
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
        dataEmptyStock: [],
        dataNotFound: [],
      });
      setProductSelectedCount(totalProductsSelected);
    }
  }, [cartViewData]);

  /** Listen product id will be removed */
  useEffect(() => {
    if (productIdRemoveSelected !== null && updateCartData !== null) {
      //call action remove product from redux
      deleteProduct({ productId: productIdRemoveSelected });
      setProductIdRemoveSelected(null);
    }
  }, [productIdRemoveSelected, updateCartData]);

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
      voucherIds: getSelectedVouchers(voucherData.dataVouchers),
    };

    /** => fetch post update cart */
    cartUpdateActions.fetch(dispatchShopingCart, params);
    /** => update state verification cart */
    setCartSelected(paramsCartSelected);
    /** => fetch post potential discount */
    verificationOrderCreate(dispatchVerificationOrder, {
      data: paramsVerificationCreate,
    });
  };

  const onRemoveProduct = () => {
    setLoadingRemoveProduct(true);
  };
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
                      setProductIdRemoveSelected={setProductIdRemoveSelected}
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
        loading={stateVerificationOrder.create.loading || updateCartLoading}
      />
      <SnbDialog
        open={modalConfirmationRemoveProductVisible}
        title="Hapus Product"
        content="Yakin kamu mau mengahapus product ini dari Keranjang?"
        ok={onRemoveProduct}
        cancel={() => setModalConfirmationRemoveProductVisible(false)}
        loading={loadingRemoveProduct}
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
