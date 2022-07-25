/**
 * CHECKOUT
 */

import { CheckoutCart, CheckoutCartProduct } from '.';

export interface CheckoutProductData extends CheckoutCartProduct {}

export interface CheckoutCartPayload
  extends CheckoutCart<CheckoutProductData> {}

export interface CheckoutBuyerAddressPayload {
  longitude: string;
  latitude: string;
  province: string;
  city: string;
  district: string;
  urban: string;
  zipCode: string;
  address: string;
  noteAddress: string;
  locationId: string;
}
export interface CheckoutPayload {
  buyerAddress: CheckoutBuyerAddressPayload;
  buyerName: string;
  buyerCode: string;
  buyerTaxNo: string;
  userFullName: string;
  userPhoneNumber: string;
  ownerFullName: string;
  ownerPhoneNumber: string;
  ownerId: number;
  ownerIdNo: string;
  sinbadVoucherId: number | null;
  sinbadVoucherDiscountOrder: number;
  carts: CheckoutCartPayload[];
}

export interface CheckoutCartResponse
  extends CheckoutCart<CheckoutProductData> {}

export interface CheckoutResponse {
  id: string;
  buyerId: number;
  userId: number;
  cartId: string;
  buyerName: string;
  buyerCode: string;
  userFullName: string;
  userPhoneNumber: string;
  ownerId: number;
  ownerFullName: string;
  ownerPhoneNumber: string;
  buyerAddress: CheckoutBuyerAddressPayload;
  sellers: CheckoutCartResponse[];
  createdAt: string;
  updatedAt: string;
}
