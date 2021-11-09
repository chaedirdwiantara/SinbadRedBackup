import * as models from '@models';
export type DeterminateCheckboxStatus = 'selected' | 'unselect';

export type CheckboxStatus = DeterminateCheckboxStatus | 'indeterminate';

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
}

export interface ParcelCart {
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
  data: ParcelCart[];
  storeId: 1;
  createdAt: string;
  updatedAt: string;
  isActiveStore: boolean;
  platform: string;
  userId: number;
}

export interface ShopingCartItemProps
  extends models.DetailItemProps<CartSuccessProps> {}

export interface ShopingCartProps {
  cart: ShopingCartItemProps;
}
