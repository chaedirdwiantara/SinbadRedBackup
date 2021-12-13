export interface AddToCartPayload {
  isActiveStore: boolean;
  brandId: string;
  productName: string;
  urlImages: string;
  selected: boolean;
  stock: number;
  productId: string;
  minQty: number;
  qty: number;
  displayPrice: number;
  priceBeforeTax: number;
  priceAfterTax: number;
  uom: string;
  warehouseId: number;
  sellerId: number;
  channelId: number | null;
  groupId: number | null;
  typeId: number | null;
  clusterId: number | null;
}
