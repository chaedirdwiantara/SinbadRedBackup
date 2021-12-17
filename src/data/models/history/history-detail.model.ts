// * => Not sure number or string
// Price, Value, and Taxes from api are still string => needs to be changed to number

export interface HistoryDetail {
  id: number;
  orderId: number;
  sellerId: number;
  invoiceGroupId: string;
  invoiceGroupName: string;
  portfolioId: number | null; // *
  orderCancelReasonId: string | null;
  paymentTypeId: number;
  paymentChannelId: number;
  paylaterTypeId: number | null; // *
  estDeliveredDate: string;
  deliveredDate: string;
  orderNotes: string | null;
  orderCode: string | null;
  orderRef: string;
  paidTime: string | null;
  expiredPaymentTime: string | null;
  cancelBy: string | null;
  statusPayment: string;
  dueDate: string;
  estDueDate: string;
  parcelNettPrice: number;
  parcelGrossPrice: number;
  promoSellerValue: number;
  voucherSellerValue: number;
  parcelTaxes: number;
  parcelFinalPrice: number;
  parcelQty: number;
  status: string;
  statusUpdate: string;
  orderIsSent: boolean;
  invoicedParcelGrossPrice: number;
  invoicedParcelNettPrice: number;
  invoicedPromoSellerValue: number;
  invoicedVoucherSellerValue: number;
  invoicedParcelTaxes: number;
  invoicedParcelFinalPrice: number;
  invoicedParcelQty: number;
  invoicedParcelModified: boolean;
  deliveredParcelNettPrice: number;
  deliveredParcelGrossPrice: number;
  deliveredPromoSellerValue: number;
  deliveredVoucherSellerValue: number;
  deliveredParcelTaxes: number;
  deliveredParcelFinalPrice: number;
  deliveredParcelQty: number;
  deliveredParcelModified: boolean;
  cancelTime: string | null;
  refundedTime: string | null;
  promoPaymentId: number | null; // *
  promoPaymentName: string | null;
  parcelPromoPaymentValue: number;
  parcelFinalPriceBuyer: number;
  invoicedParcelFinalPriceBuyer: number;
  deliveredParcelFinalPriceBuyer: number;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}
