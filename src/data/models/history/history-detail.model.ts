import * as models from '@models';
import { OrderStatusSlug, PaymentStatusSlug } from '@screen/history/types';

export interface HistoryBilling {
  id: number;
  status: OrderStatusSlug;
  paidTime: string | null;
  refundTotal: number;
  totalPayment: number;
  accountVaType: string | null;
  totalFeeDeduct: number;
  accountVaNumber: string | null;
  refundedDateTime: string | null;
  totalFeeNonDeduct: number;
  expiredPaymentTime: string | null;
  deliveredTotalPayment: number;
}

export interface HistoryBuyer {
  storeName: string;
  storeAddress: string | null;
  urban: string | null;
  ownerName: string;
}

export interface ParcelProduct {
  productId: string;
  productName: string;
  urlImages: string;
  qty: number;
  actualQty: number;
  uom: string;
  priceAfterTax: number;
  totalPriceAfterTax: number;
}

export interface ParcelLog {
  status: OrderStatusSlug;
  detail: string;
  happenedAt: string;
  reason: string | null;
  userName: string | null;
}

export interface HistoryPromo {
  promoName: string;
  promoId: string;
  promoValue: number | null;
  promoQty: number | null;
  catalogueName: string | null;
  catalogueImagesUrl: string | null;
  invoicedPromoQty: number | null;
  deliveredPromoQty: number | null;
  invoicedCatalogueQty: number | null;
  deliveredCatalogueQty: number | null;
  invoicedParcelModified: boolean;
  orderBrandCatalogueId: number;
  retailBuyingPrice: number | null;
}

export interface HistoryVoucher {
  orderBrandCatalaguesId: string;
  voucherName: string;
  voucherId: string;
  voucherValue: number | null;
  catalogueName: string | null;
  catalogueExternalId: string | number | null;
  cataloguePrice: number | null;
  catalogueImagesUrl: string | null;
}

export interface HistoryPromoApplied {
  id: number;
  promoName: string;
  promoValue: number | null;
}

export interface HistoryDetail {
  platform: string;
  orderParcelId: number;
  orderId: number;
  sellerId: number;
  invoiceGroupId: string;
  invoiceGroupName: string;
  portfolioId: number | null;
  cartParcelId: number | null;
  orderCancelReasonId: number | null;
  orderCancelReason: string | null;
  paymentTypeId: number;
  paymentTypeName: string;
  paymentChannelId: number;
  paylaterTypeId: number | null;
  paylaterTypeName: string | null;
  estDeliveredDate: string | null;
  deliveredDate: string | null;
  orderNotes: string | null;
  orderCode: string | null;
  orderRef: string | null;
  paidTime: string | null;
  expiredPaymentTime: string | null;
  status: OrderStatusSlug;
  cancelBy: string | null;
  statusPayment: PaymentStatusSlug;
  dueDate: string | null;
  estDueDate: string | null;
  parcelNettPrice: number;
  parcelGrossPrice: number;
  promoSellerValue: number;
  parcelQty: number;
  statusUpdate: string;
  invoicedParcelGrossPrice: number;
  invoicedParcelNettPrice: number;
  invoicedParcelQty: number;
  deliveredParcelGrossPrice: number;
  invoicedPromoSellerValue: number;
  deliveredPromoSellerValue: number;
  voucherSellerValue: number;
  invoicedSellerValue: number;
  deliveredVoucherSellerValue: number;
  deliveredParcelNettPrice: number;
  deliveredParcelQty: number;
  parcelTaxes: number;
  invoicedParcelTaxes: number;
  deliveredParcelTaxes: number;
  parcelFinalPrice: number;
  invoicedParcelFinalPrice: number;
  deliveredParcelFinalPrice: number;
  invoicedParcelModified: boolean;
  deliveredParcelModified: boolean;
  createdAt: string;
  cancelTime: string | null;
  refundedTime: string | null;
  parcelPromoPaymentValue: number;
  promoPaymentName: string | null;
  parcelFinalPriceBuyer: number;
  invoicedParcelFinalPriceBuyer: number;
  deliveredParcelFinalPriceBuyer: number;
  billing: HistoryBilling;
  deliveryCourier: string;
  orderVia: string | null;
  buyer: HistoryBuyer;
  orderParcelProducts: Array<ParcelProduct>;
  orderParcelBonus: Array<ParcelProduct>;
  orderParcelRemovedProducts: Array<ParcelProduct>;
  orderParcelLogs: Array<ParcelLog>;
  parcelPromo: number;
  parcelVoucher: number;
  invoicedParcelPromo: number;
  deliveredParcelPromo: number;
  deliveredParcelVoucher: number;
  parcelPromoPaymentAmount: number;
  voucherList: Array<HistoryVoucher>;
  promoList: Array<HistoryPromo>;
  promoApplied: Array<HistoryPromoApplied>;
}

export interface HistoryDetailProcessProps extends models.DetailProcessProps {
  logType: 'payment' | 'order';
}

export interface HistoryDetailProcessAction {
  type: string;
  payload: HistoryDetailProcessProps;
  contextDispatch: (action: any) => any;
}
