/**
 * CHECK SELLER
 */

export interface CheckSellerResponse {
  sellerId: number;
  sellerName: string;
  status: string;
}

export interface CheckSellerPayload {
  sellerIds: number[];
}
