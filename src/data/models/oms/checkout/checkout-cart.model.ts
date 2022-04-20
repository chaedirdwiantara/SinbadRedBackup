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
  userFullName: string;
  userPhoneNumber: string;
  ownerFullName: string;
  ownerPhoneNumber: string;
  ownerId: number;
  carts: CheckoutCartPayload[];
}

export interface CheckoutCartResponse
  extends CheckoutCart<CheckoutProductData> {}

export interface CheckoutResponse {
  id: string;
  userId: number;
  buyerId: number;
  buyerAddress: string;
  sellers: CheckoutCartResponse[];
}
