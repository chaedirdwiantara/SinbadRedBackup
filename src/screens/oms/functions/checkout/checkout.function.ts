import * as models from '@models';
import { toCurrency } from '@core/functions/global/currency-format';
import { useContext, useState } from 'react';
import { contexts } from '@contexts';
import { useCheckoutAction } from './checkout-hook.function';
import { useUpdateCartAction } from '../cart/cart-hook.function';
import { goToShoppingCart } from '../../../product/functions';

interface ToCurrencyOptions {
  withPrefix?: boolean;
  withFraction?: boolean;
}

const checkoutAction = useCheckoutAction();
const updateCartAction = useUpdateCartAction();
/** => calculate total price */


/** => calculate sub total price */





const handleDiscountInvoiceGroups = (invoiceGroupId: string) => {
  const { statePromo } = useContext(contexts.PromoContext);

  const reservePromo =
    statePromo.reserveDiscount.detail.data?.discountVerification.promosSeller;
  const reserveVoucher =
    statePromo.reserveDiscount.detail.data?.discountVerification.vouchersSeller;

  const findVoucherInvoiceGroup = reserveVoucher?.find(
    (data: models.ReserveDiscountVerificationVouchersSeller) =>
      data.invoiceGroupId === invoiceGroupId,
  );

  const findPromoInvoiceGroup = reservePromo?.find(
    (data: models.ReserveDiscountVerificationPromosSeller) =>
      data.invoiceGroupId === invoiceGroupId,
  );

  const vouchersSeller =
    findVoucherInvoiceGroup !== undefined ? findVoucherInvoiceGroup : null;

  const promosSeller =
    findPromoInvoiceGroup !== undefined ? findPromoInvoiceGroup : null;

  return { vouchersSeller, promosSeller };
};





const totalBarangPrice = (products: any) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total = total + products[i].qty * products[i].lastUsedPrice;
  }
  return toCurrency(total, { withFraction: false });
};

const subTotalQty = (products: any) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total = total + products[i].qty;
  }
  return total;
};

const totalQty = (sellers: any) => {
  let total = 0;
  for (let i = 0; i < sellers?.length; i++) {
    for (let a = 0; a < sellers[i]?.products.length; a++) {
      total = total + sellers[i].products[a].qty;
    }
  }
  return total;
};

const totalPayment = (sellers: any) => {
  let total = 0;
  for (let i = 0; i < sellers?.length; i++) {
    for (let a = 0; a < sellers[i]?.products.length; a++) {
      total =
        total +
        sellers[i].products[a].qty * sellers[i].products[a].lastUsedPrice;
    }
  }
  return toCurrency(total, { withFraction: false });
};

const totalPaymentWithoutCurrency = (sellers: [any]) => {
  let total = 0;
  for (let i = 0; i < sellers?.length; i++) {
    for (let a = 0; a < sellers[i]?.products.length; a++) {
      total =
        total +
        sellers[i].products[a].qty * sellers[i].products[a].lastUsedPrice;
    }
  }
  return total;
};

const callBackToCartFunction = (dispatchCart: any, dispatchCheckout: any) =>  {
  updateCartAction.reset(dispatchCart);
  checkoutAction.reset(dispatchCheckout);
  goToShoppingCart();
}

export {
  handleDiscountInvoiceGroups,
  totalBarangPrice,
  subTotalQty,
  totalQty,
  totalPayment,
  totalPaymentWithoutCurrency,
  callBackToCartFunction
};
