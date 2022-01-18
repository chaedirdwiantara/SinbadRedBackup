import * as models from '@models';
import { toCurrency } from '@core/functions/global/currency-format';
import { useContext, useState } from 'react';
import { contexts } from '@contexts';

interface ToCurrencyOptions {
  withPrefix?: boolean;
  withFraction?: boolean;
}

/** => calculate total price */
const handleTotalPrice = (
  data: models.IInvoiceCheckout[],
  options?: ToCurrencyOptions,
) => {
  let total = 0;

  data.forEach((invoice) => {
    let subTotal = 0;
    if (invoice.totalPriceBeforeTax) {
      subTotal += invoice.totalPriceBeforeTax;
    }

    if (invoice.totalPriceAfterTax && invoice.totalPriceBeforeTax) {
      subTotal += calculateTax(invoice);
    }

    if (invoice.totalFee) {
      subTotal += invoice.totalFee;
    }

    if (invoice.totalPromoSellerAndVoucher) {
      subTotal -= invoice.totalPromoSellerAndVoucher;
    }

    if (invoice.totalPromoPayment) {
      subTotal -= invoice.totalPromoPayment;
    }

    total += subTotal;
  });

  return toCurrency(total, options);
};

/** => calculate sub total price */
const handleSubTotalPrice = (
  data: models.IInvoiceCheckout,
  options?: ToCurrencyOptions,
) => {
  let total = 0;
  if (data.totalPriceBeforeTax) {
    total += data.totalPriceBeforeTax;
  }

  if (data.totalPriceAfterTax && data.totalPriceBeforeTax) {
    total += calculateTax(data);
  }

  if (data.totalFee) {
    total += data.totalFee;
  }

  if (data.totalPromoSellerAndVoucher) {
    total -= data.totalPromoSellerAndVoucher;
  }

  if (data.totalPromoPayment) {
    total -= data.totalPromoPayment;
  }

  return toCurrency(total, options);
};

const calculateTax = (data: models.IInvoiceCheckout) => {
  console.log(data);
  let total = 0;
  if (data.totalPriceBeforeTax) {
    total += data.totalPriceBeforeTax;
  }

  if (data.totalPromoSellerAndVoucher) {
    total -= data.totalPromoSellerAndVoucher;
  }

  const taxPrice = (total * data.tax) / 100;

  return taxPrice;
};

const handleTransformProductBrands = (data: models.BrandCheckout[]) => {
  let products: models.ProductCheckout[] = [];
  data.map((brands: models.BrandCheckout) => {
    products = [...products, ...brands.products];
  });
  return products;
};

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

const useModalParcelDetail = () => {
  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState<models.IInvoiceCheckout | null>(null);

  return {
    isOpen,
    data,
    setData: (value: models.IInvoiceCheckout | null) => {
      setData(value);
      if (value !== null) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    },
  };
};

const useModalProductList = () => {
  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState<models.ProductCheckout[] | null>(null);

  return {
    isOpen,
    data,
    setData: (value: models.ProductCheckout[] | null) => {
      setData(value);
      if (value !== null) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    },
  };
};

export {
  handleTotalPrice,
  handleSubTotalPrice,
  handleTransformProductBrands,
  handleDiscountInvoiceGroups,
  useModalParcelDetail,
  useModalProductList,
  calculateTax,
};
