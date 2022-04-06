/**
 * CHECKOUT
 */

import { CheckoutCart, CheckoutCartProduct } from '.';

export interface CheckoutProductData extends CheckoutCartProduct {
  lastUsedPrice: number;
  isLastPriceUsedRules: boolean;
}

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
  buyerName: string;
  buyerAddress: CheckoutBuyerAddressPayload;
  carts: CheckoutCartPayload[];
}

export interface CheckoutCartResponse
  extends CheckoutCart<
    Omit<CheckoutProductData, 'lastUsedPrice' | 'isLastPriceUsedRules'>
  > {}

export interface CheckoutResponse {
  id: string;
  userId: number;
  buyerId: number;
  buyerAddress: string;
  sellers: CheckoutCartResponse[];
}
