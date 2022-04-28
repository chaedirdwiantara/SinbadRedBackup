/**
 * CHECK SELLER
 */

export interface CheckSellerResponse {
  sellerId: number;
  sellerName: string;
  sellerAdminId: number;
  sellerAdminName: string;
  sellerAdminEmail: string;
  status: string;
}

export interface CheckSellerPayload {
  sellerIds: number[];
}
