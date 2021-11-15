export interface CartSelectedProduct {
  productId: string;
  qty: number;
  displayPrice: number;
  priceBeforeTax: number;
  priceAfterTax: number;
  warehouseId: number;
}

export interface CartSelectedBrand {
  brandId: string;
  products: CartSelectedProduct[];
}

export interface CartSelectedData {
  invoiceGroupId: string;
  portfolioId: string | number | null;
  brands: CartSelectedBrand[];
  sellerId: number;
  channelId: number;
  groupId: number;
  typeId: number;
  clustderId: number;
}

export interface VoucherId {
  type: string;
  voucherId: number;
}

export interface CartSelected {
  id: string;
  data: CartSelectedData[];
  isActiveStore: boolean;
  voucherIds?: VoucherId[];
  salesId: number;
}
