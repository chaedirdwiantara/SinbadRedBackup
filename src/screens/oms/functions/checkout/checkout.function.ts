import * as models from '@models';
import { toCurrency } from '@core/functions/global/currency-format';

/** => calculate total price */
const handleTotalPrice = (data: models.IInvoiceCheckout[]) => {
  let total = 0;

  data.forEach((invoice) => {
    let subTotal = 0;
    if (invoice.totalPriceBeforeTax) {
      subTotal += invoice.totalPriceBeforeTax;
    }

    if (invoice.totalPriceAfterTax && invoice.totalPriceBeforeTax) {
      subTotal += invoice.totalPriceAfterTax - invoice.totalPriceBeforeTax;
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

  return toCurrency(total);
};

/** => calculate sub total price */
const handleSubTotalPrice = (data: models.IInvoiceCheckout) => {
  let total = 0;
  if (data.totalPriceBeforeTax) {
    total += data.totalPriceBeforeTax;
  }

  if (data.totalPriceAfterTax && data.totalPriceBeforeTax) {
    total += data.totalPriceAfterTax - data.totalPriceBeforeTax;
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

  return toCurrency(total);
};

const handleTransformProductBrands = (data: models.BrandCheckout[]) => {
  let products: models.ProductCheckout[] = [];
  data.map((brands: any) => {
    products = [...products, ...brands.products];
  });
  return products;
};

export { handleTotalPrice, handleSubTotalPrice, handleTransformProductBrands };
