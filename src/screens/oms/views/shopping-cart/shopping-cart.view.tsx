/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useState, useMemo, Fragment, useEffect } from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbCheckbox,
  SnbIcon,
  color,
  SnbDialog,
  SnbNumberCounter,
} from 'react-native-sinbad-ui';
import { toCurrency } from '../../../../../core/functions/global/currency-format';
import * as models from '@models';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ShoppingCartEmpty } from './shopping-cart-empty.view';
import { ShoppingCartHeader } from './shopping-cart-header.view';
import { ShoppingCartFooter } from './shopping-cart-footer.view';
import { ShippingAddress } from './shipping-address.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { useCartVerification } from '@core/functions/cart';
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
import { contexts } from '@contexts';
import { CartProduct, CartBrand, CartInvoiceGroup } from '@models';
import { useCountAllVoucherAction } from '@screen/voucher/functions/voucher-hook.function';
import {
  goToVerificationOrder,
  getTotalProducts,
  handleSelectedProductChange,
  handleProductQuantityChange,
  handleProductDelete,
  handleSelectedBrandChange,
} from '../../functions';
import { ShoppingCartStyles } from '../../styles';
import { useShopingCartContext } from 'src/data/contexts/oms/shoping-cart/useShopingCartContext';
import {
  useCartViewActions,
  useCartUpdateActions,
} from '@screen/oms/functions/shopping-cart/shopping-cart-hook.function';
import { useVerficationOrderAction } from '../../functions/verification-order/verification-order-hook.function';
/** === COMPONENT === */
const OmsShoppingCartView: FC = () => {
  /** === HOOKS === */
  const [invoiceGroups, setInvoiceGroups] = useState<Array<CartInvoiceGroup>>(
    [],
  );
  const [allProductsSelected, setAllProductsSelected] =
    useState<boolean>(false);
  const [productSelectedCount, setProductSelectedCount] = useState(0);
  const totalProducts = useMemo(() => getTotalProducts(invoiceGroups), []);
  const [isConfirmCheckoutDialogOpen, setIsConfirmCheckoutDialogOpen] =
    useState(false);

  const cartViewActions = useCartViewActions();
  const cartUpdateActions = useCartUpdateActions();
  const {
    stateShopingCart: { cart: cartState, update: updateCartState },
    dispatchShopingCart,
  } = useShopingCartContext();
  /** => handle verification cart */
  const { setCartVerification } = useCartVerification();

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

  useEffect(() => {
    cartViewActions.fetch(dispatchShopingCart, '6183b3030623df001cb62346');
  }, []);
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
    const params: models.CartUpdatePayload = {
      cartId: cartState.data.cartId,
      storeId: cartState.data.storeId,
      action: 'submit',
      products: [],
      voucherIds: [],
    };

    const paramsPotensialDiscount: models.CartSuccessProps = {
      cartId: cartState.data.cartId,
      data: invoiceGroups,
      storeId: cartState.data.storeId,
      isActiveStore: cartState.data.isActiveStore,
      platform: cartState.data.platform,
      userId: cartState.data.userId,
    };

    invoiceGroups.forEach((item) => {
      item.brands.forEach((el) => {
        el.products.forEach((product) => {
          params.products.push({
            productId: product.productId,
            qty: product.qty,
            selected: product.selected,
          });
        });
      });
    });

    /** => fetch post update cart */
    cartUpdateActions.fetch(dispatchShopingCart, params);
    /** => update state verification cart */
    setCartVerification(paramsPotensialDiscount);
    /** => fetch post potential discount */
    verificationOrderCreate(dispatchVerificationOrder, {
      data: paramsPotensialDiscount,
    });
  };
  /** === VIEW === */
  /** => Product */
  const renderProduct = (
    product: CartProduct,
    productIndex: number,
    brand: CartBrand,
    brandIndex: number,
    invoiceGroupIndex: number,
  ) => {
    const productPrice = toCurrency(product.displayPrice);
    return (
      <View
        style={{
          ...ShoppingCartStyles.horizontalBottomCardSlot,
          paddingBottom: 18,
          borderBottomWidth: productIndex === brand.products.length - 1 ? 0 : 1,
          borderStyle: 'solid',
          borderBottomColor: color.black10,
        }}
        key={product.productName}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 20, marginLeft: 4 }}>
            <SnbCheckbox
              status={product.selected ? 'selected' : 'unselect'}
              onPress={() =>
                handleSelectedProductChange(
                  invoiceGroupIndex,
                  brandIndex,
                  productIndex,
                  product.selected ? false : true,
                  [invoiceGroups, setInvoiceGroups],
                  [productSelectedCount, setProductSelectedCount],
                  setAllProductsSelected,
                  totalProducts,
                )
              }
            />
          </View>
          <Image
            source={{ uri: product.urlImages }}
            style={{ marginRight: 8, width: 77, height: 77 }}
          />
          <View>
            <View style={{ marginBottom: 12, maxWidth: 160 }}>
              <SnbText.B4>{product.productName}</SnbText.B4>
            </View>
            <View style={{ marginBottom: 12 }}>
              <SnbText.B4 color={color.red50}>{productPrice}</SnbText.B4>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <SnbNumberCounter
                value={product.qty}
                onIncrease={() =>
                  handleProductQuantityChange(
                    invoiceGroupIndex,
                    brandIndex,
                    productIndex,
                    'increase',
                    [invoiceGroups, setInvoiceGroups],
                  )
                }
                onDecrease={() =>
                  handleProductQuantityChange(
                    invoiceGroupIndex,
                    brandIndex,
                    productIndex,
                    'decrease',
                    [invoiceGroups, setInvoiceGroups],
                  )
                }
                minusDisabled={product.qty === 1}
                plusDisabled={product.qty === product.stock}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() =>
              handleProductDelete(
                invoiceGroupIndex,
                brandIndex,
                productIndex,
                invoiceGroups,
              )
            }>
            <SnbIcon name="delete_outline" color={color.black60} size={32} />
          </TouchableOpacity>
          {product.stock <= 3 && (
            <SnbText.B3
              color={
                color.red50
              }>{`Tersisa ${product.stock} ${product.uom}`}</SnbText.B3>
          )}
        </View>
      </View>
    );
  };
  /** => Brand */
  const renderBrand = (
    brand: CartBrand,
    brandIndex: number,
    invoiceGroupIndex: number,
  ) => (
    <Fragment key={brand.brandName}>
      <View
        style={{
          ...ShoppingCartStyles.topCardSlot,
          borderStyle: 'solid',
          borderTopWidth: brandIndex === 0 ? 0 : 1,
          borderTopColor: color.black10,
        }}>
        <View style={{ marginRight: 20, marginLeft: 4 }}>
          <SnbCheckbox
            status={brand.selected ? 'selected' : 'unselect'}
            onPress={() =>
              handleSelectedBrandChange(
                invoiceGroupIndex,
                brandIndex,
                brand.selected === false ? true : false,
                [invoiceGroups, setInvoiceGroups],
                [productSelectedCount, setProductSelectedCount],
                setAllProductsSelected,
                totalProducts,
              )
            }
          />
        </View>
        <SnbText.B4>{brand.brandName}</SnbText.B4>
      </View>
      {brand.products.map((product, productIndex) =>
        renderProduct(
          product,
          productIndex,
          brand,
          brandIndex,
          invoiceGroupIndex,
        ),
      )}
    </Fragment>
  );
  /** => Invoice Group */
  const renderInvoiceGroup = (
    invoiceGroup: CartInvoiceGroup,
    invoiceGroupIndex: number,
  ) => (
    <View
      style={ShoppingCartStyles.cardContainer}
      key={invoiceGroup.invoiceGroupName}>
      <View style={ShoppingCartStyles.topCardSlot}>
        <SnbText.B4>{invoiceGroup.invoiceGroupName}</SnbText.B4>
      </View>
      {invoiceGroup.brands.map((brand, brandIndex) =>
        renderBrand(brand, brandIndex, invoiceGroupIndex),
      )}
    </View>
  );

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
              {invoiceGroups.map((invoiceGroup, invoiceGroupIndex) =>
                renderInvoiceGroup(invoiceGroup, invoiceGroupIndex),
              )}
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
