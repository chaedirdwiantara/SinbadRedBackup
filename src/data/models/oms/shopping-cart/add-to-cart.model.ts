export interface AddToCartPayload {
  isActiveStore: boolean;
  selected: boolean;
  stock: number;
  productId: string;
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
  brandId: string;
  productName: string;
  urlImages: string;
}
