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
import { useCartSelected } from '@core/functions/cart';
import { useVerficationOrderAction } from '../../functions/verification-order/verification-order-hook.function';
import { useCountAllVoucherAction } from '@screen/voucher/functions/voucher-hook.function';
import { UserHookFunc } from '@screen/user/functions';
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
} from '@screen/oms/functions/shopping-cart/shopping-cart-hook.function';
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
  const { verificationOrderCreate } = useVerficationOrderAction();
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
      goToVerificationOrder();
    }
  }, [stateVerificationOrder.create.data, updateCartState.data]);

  /** Voucher Cart */
  const { count } = useCountAllVoucherAction();
  const { dispatchVoucher } = React.useContext(contexts.VoucherContext);
  React.useEffect(() => {
    if (cartState.data !== null) {
      count(dispatchVoucher);
    }
  }, [cartState]);

  /** Get Cart View */
  useEffect(() => {
    cartViewActions.fetch(dispatchShopingCart);
    storeDetailAction.detail(dispatchUser);
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
      storeId: cartState.data.storeId,
      action: 'submit',
      products: [],
      voucherIds: [],
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
        sellerId: invoiceGroup.supplierId,
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
      salesId: cartState.data.userId,
    };

    /** => fetch post update cart */
    cartUpdateActions.fetch(dispatchShopingCart, params);
    /** => update state verification cart */
    setCartSelected(paramsCartSelected);
    /** => fetch post potential discount */
    verificationOrderCreate(dispatchVerificationOrder, {
      data: paramsCartSelected,
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
