/**
 * CHECK SELLER
 */

export interface CheckSellerResponse {
  sellerId: number;
  sellerName: string;
  sellerTaxNo: string;
  fullSellerAddress: string;
  sellerAdminId: number;
  sellerAdminName: string;
  sellerAdminEmail: string;
  status: string;
}

export interface CheckSellerPayload {
  sellerIds: number[];
}
