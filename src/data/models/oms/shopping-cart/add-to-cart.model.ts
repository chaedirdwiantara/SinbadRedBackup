export interface AddToCartPayload {
  cartId?: string;
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
  supplierId: number;
  channelId: number;
  groupId: number;
  typeId: number;
  clusterId: number;
}
