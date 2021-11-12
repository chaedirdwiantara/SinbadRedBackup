export interface CartProduct {
  productId: string;
  productName: string;
  urlImages: string;
  stock: number;
  selected: boolean;
  qty: number;
  displayPrice: number;
  priceBeforeTax: number;
  priceAfterTax: number;
  warehouseId: number;
  uom: string;
}

export interface CartBrand {
  brandId: string;
  brandName: string;
  selected: boolean;
  products: CartProduct[];
  selectedCount: number;
}

export interface CartInvoiceGroup {
  cartParcelId: string;
  invoiceGroupId: string;
  invoiceGroupName: string;
  portfolioId: string;
  brands: CartBrand[];
  supplierId: number;
  channelId: number;
  groupId: number;
  typeId: number;
  clusterId: number;
}

export interface CartSuccessProps {
  verificationResult?: any;
  cartId: string;
  data: CartInvoiceGroup[];
  storeId: number;
  createdAt: string;
  updatedAt: string;
  isActiveStore: boolean;
  platform: string;
  userId: number;
}
