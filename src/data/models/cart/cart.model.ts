/** === CART LIST === */
export interface ProductCart {
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

export interface BrandCart {
  brandId: string;
  brandName: string;
  selected: boolean;
  products: ProductCart[];
}

export interface ParcelCart {
  cartParcelId: string;
  invoiceGroupId: string;
  invoiceGroupName: string;
  portfolioId: string;
  brands: BrandCart[];
  supplierId: number;
  channelId: number;
  groupId: number;
  typeId: number;
  clusterId: number;
}

export interface CartSuccessProps {
  verificationResult?: any;
  cartId: string;
  data: ParcelCart[];
  storeId: 1;
  createdAt: string;
  updatedAt: string;
  isActiveStore: boolean;
  platform: string;
  userId: number;
}
