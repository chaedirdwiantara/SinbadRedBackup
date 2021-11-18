export interface AddToCartPayload {
  cartId?: string | null;
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
  channelId: number | null;
  groupId: number | null;
  typeId: number | null;
  clusterId: number | null;
}
