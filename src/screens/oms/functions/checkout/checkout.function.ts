import * as models from '@models';
import { toCurrency } from '@core/functions/global/currency-format';
import { useContext } from 'react';
import { contexts } from '@contexts';

interface ToCurrencyOptions {
  withPrefix?: boolean;
  withFraction?: boolean;
}

const useHandleDiscountInvoiceGroups = (invoiceGroupId: string) => {
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

const totalBarangPrice = (products: models.CheckoutCartProduct[]) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total = total + products[i].qty * products[i].priceAfterTax;
  }
  return toCurrency(total, { withFraction: false });
};

const subTotalQty = (products: models.CheckoutCartProduct[]) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total = total + products[i].qty;
  }
  return total;
};

const totalQty = (sellers: models.CheckoutCartResponse[]) => {
  let total = 0;
  if (sellers) {
    for (let i = 0; i < sellers.length; i++) {
      for (let a = 0; a < sellers[i].products.length; a++) {
        total = total + sellers[i].products[a].qty;
      }
    }
  }

  return total;
};

const totalPayment = (sellers: models.CheckoutCartResponse[]) => {
  let total = 0;
  for (let i = 0; i < sellers.length; i++) {
    for (let a = 0; a < sellers[i].products.length; a++) {
      total =
        total +
        sellers[i].products[a].qty * sellers[i].products[a].priceAfterTax;
    }
  }
  return toCurrency(total, { withFraction: false });
};

const totalPaymentWithoutCurrency = (
  sellers: models.CheckoutCartResponse[],
) => {
  let total = 0;
  for (let i = 0; i < sellers.length; i++) {
    for (let a = 0; a < sellers[i].products.length; a++) {
      total =
        total +
        sellers[i].products[a].qty * sellers[i].products[a].priceAfterTax;
    }
  }
  return total;
};

export {
  useHandleDiscountInvoiceGroups,
  totalBarangPrice,
  subTotalQty,
  totalQty,
  totalPayment,
  totalPaymentWithoutCurrency,
};
