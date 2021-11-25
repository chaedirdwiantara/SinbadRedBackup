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
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { useVerficationOrderAction } from '../../functions/verification-order/verification-order-hook.function';
import { UserHookFunc } from '@screen/user/functions';
import { getSelectedVouchers } from '@screen/voucher/functions';
import { useReserveDiscountAction } from '@screen/promo/functions';
import { useDataVoucher } from '@core/redux/Data';
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
import { contexts } from '@contexts';
import {
  CartInvoiceGroup,
  CartUpdatePayload,
  CartSelected,
  CartSelectedData,
  CartSelectedBrand,
  CartSelectedProduct,
} from '@models';
import { goToVerificationOrder, getTotalProducts } from '../../functions';
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
  const [invoiceGroups, setInvoiceGroups] = useState<Array<CartInvoiceGroup>>(
    [],
  );
  const [allProductsSelected, setAllProductsSelected] =
    useState<boolean>(false);
  const [productSelectedCount, setProductSelectedCount] = useState(0);
  const totalProducts = useMemo(
    () => getTotalProducts(invoiceGroups),
    [invoiceGroups.length],
  );
  const [isConfirmCheckoutDialogOpen, setIsConfirmCheckoutDialogOpen] =
    useState(false);

  const { dispatchUser } = React.useContext(contexts.UserContext);
  const storeDetailAction = UserHookFunc.useStoreDetailAction();
  const cartViewActions = useCartViewActions();
  const cartUpdateActions = useCartUpdateActions();
  const {
    stateShopingCart: { cart: cartState, update: updateCartState },
    dispatchShopingCart,
  } = useShopingCartContext();

  /** => handle verification cart */
  const { setCartSelected } = useCartSelected();

  /**
   * Verification Order
   */
  const { stateVerificationOrder, dispatchVerificationOrder } =
    React.useContext(contexts.VerificationOrderContext);
  const { verificationOrderCreate, verificationOrderDetail } =
    useVerficationOrderAction();
  useEffect(() => {
    /** => handle close modal if fetch is done */
    if (!stateVerificationOrder.create.loading && !updateCartState.loading) {
      setIsConfirmCheckoutDialogOpen(false);
    }
    /** => below is the action if the update cart & potential discount fetch success */
    if (
      stateVerificationOrder.create.data !== null &&
      updateCartState.data != null
    ) {
      verificationOrderDetail(
        dispatchVerificationOrder,
        stateVerificationOrder.create.data.id,
      );
      goToVerificationOrder();
    }
  }, [stateVerificationOrder.create, updateCartState]);

  /** Voucher Cart */
  const voucherData = useDataVoucher();

  /**
   * Reserve Section
   * - Cancel Reserve Stock
   * - Cancel Reserve Discount (Promo & Voucher)
   */
  const { dispatchPromo } = React.useContext(contexts.PromoContext);
  const { dispatchReserveStock } = useReserveStockContext();
  const reserveDiscountAction = useReserveDiscountAction();
  const reserveStockAction = useReserveStockAction();
  React.useEffect(() => {
    reserveDiscountAction.del(dispatchPromo, '1');
    reserveStockAction.del(dispatchReserveStock, '1');
  }, []);

  /** Get Cart View */
  useEffect(() => {
    cartViewActions.fetch(dispatchShopingCart);
    storeDetailAction.detail(dispatchUser);
    cartViewActions.fetch(dispatchShopingCart);
  }, []);

  /** Listen changes cartState */
  useEffect(() => {
    if (cartState !== null && cartState.data !== null) {
      let totalProductsSelected = 0;
      setInvoiceGroups(cartState.data.data);
      cartState.data.data.forEach((item) => {
        item.brands.forEach((el) => {
          el.products.forEach((product) => {
            if (product.selected) {
              totalProductsSelected += 1;
            }
          });
        });
      });
      if (totalProductsSelected === totalProducts) {
        setAllProductsSelected(true);
      }
      setProductSelectedCount(totalProductsSelected);
    } else {
      setInvoiceGroups([]);
    }
  }, [cartState]);

  /** Confirmation checkout submit */
  const onSubmitCheckout = () => {
    if (cartState.data === null) {
      /** DO SOMETHING */
      /** Show modal error/retry */
      return;
    }
    const params: CartUpdatePayload = {
      action: 'submit',
      products: [],
    };

    const dataSelected: CartSelectedData[] = [];

    invoiceGroups.forEach((invoiceGroup) => {
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
        /** => insert brand selected */
        brandsSelected.push({
          brandId: brand.brandId,
          products: productsSelected,
        });
      });
      /** => insert data selected */
      dataSelected.push({
        invoiceGroupId: invoiceGroup.invoiceGroupId,
        portfolioId: invoiceGroup.portfolioId,
        brands: brandsSelected,
        sellerId: invoiceGroup.sellerId,
        channelId: invoiceGroup.channelId,
        groupId: invoiceGroup.groupId,
        typeId: invoiceGroup.typeId,
        clustderId: invoiceGroup.clusterId,
      });
    });

    const paramsCartSelected: CartSelected = {
      id: cartState.data.cartId,
      data: dataSelected,
      isActiveStore: cartState.data.isActiveStore,
    };

    const paramsVerificationCreate: CartSelected = {
      id: cartState.data.cartId,
      data: dataSelected,
      isActiveStore: cartState.data.isActiveStore,
      voucherIds: getSelectedVouchers(voucherData.dataVouchers),
    };

    /** => fetch post update cart */
    cartUpdateActions.fetch(dispatchShopingCart, params);
    /** => update state verification cart */
    console.log(paramsVerificationCreate);
    setCartSelected(paramsCartSelected);
    /** => fetch post potential discount */
    verificationOrderCreate(dispatchVerificationOrder, {
      data: paramsVerificationCreate,
    });
  };
  /** === VIEW === */
  /** => Main */
  return (
    <SnbContainer color="white">
      <ShoppingCartHeader />
      {invoiceGroups.length > 0 ? (
        <Fragment>
          <ScrollView>
            <ShippingAddress />
            {/* Invoice Group List */}
            <Fragment>
              {invoiceGroups.map((invoiceGroup, invoiceGroupIndex) => (
                <ShoppingCartInvoiceGroup
                  key={invoiceGroup.invoiceGroupId.toString()}
                  invoiceGroup={invoiceGroup}
                  invoiceGroupIndex={invoiceGroupIndex}
                  invoiceGroups={invoiceGroups}
                  setInvoiceGroups={setInvoiceGroups}
                  productSelectedCount={productSelectedCount}
                  setProductSelectedCount={setProductSelectedCount}
                  setAllProductsSelected={setAllProductsSelected}
                  totalProducts={totalProducts}
                />
              ))}
            </Fragment>
          </ScrollView>
          <ShoppingCartFooter
            allProductsSelected={allProductsSelected}
            invoiceGroups={invoiceGroups}
            setInvoiceGroups={setInvoiceGroups}
            setProductSelectedCount={setProductSelectedCount}
            setAllProductsSelected={setAllProductsSelected}
            totalProducts={totalProducts}
            productSelectedCount={productSelectedCount}
            setIsConfirmCheckoutDialogOpen={setIsConfirmCheckoutDialogOpen}
          />
        </Fragment>
      ) : (
        <ShoppingCartEmpty />
      )}
      {/* Confirmation Modal Checkout */}
      <SnbDialog
        open={isConfirmCheckoutDialogOpen}
        title="Konfirmasi"
        content="Konfirmasi order dan lanjut ke Checkout?"
        ok={onSubmitCheckout}
        cancel={() => setIsConfirmCheckoutDialogOpen(false)}
        loading={
          stateVerificationOrder.create.loading || updateCartState.loading
        }
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
