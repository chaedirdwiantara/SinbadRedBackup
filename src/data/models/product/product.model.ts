import * as models from '@models';
/** === PRODUCT LIST === */
export interface ProductList {
  id: string;
  name: string;
  sellerId: string;
  originalPrice: number;
  currentPrice: number | null;
  isBundle: boolean;
  isBonus: boolean;
  isExclusive: boolean;
  isPromo: boolean;
  thumbnail: string;
}

export interface ProductListProcessProps extends models.ListProcessProps {
  keyword?: string;
  tags?: Array<string>;
  brandId?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: string;
}

export type ProductListQueryOptions = Omit<
  ProductListProcessProps,
  'loading' | 'skip' | 'limit'
>;

export interface ProductListItemProps
  extends models.ListItemProps<Array<ProductList>> {
  canLoadMore: boolean;
}

interface ProductListPagination {
  limit: number;
  skip: number;
  total: number;
  canLoadMore: boolean;
}

interface ProductListSuccessProps {
  meta: ProductListPagination;
  data: Array<ProductList>;
}

export interface ProductListSuccessAction {
  type: string;
  payload: ProductListSuccessProps;
}

export interface ProductImage {
  url: string;
}

export interface ProductDetail {
  id: string;
  supplierCode: string;
  sellerId: number;
  name: string;
  detail: string;
  description: string;
  productWeight: number;
  productDimension: number;
  packagedWeight: number;
  packagedDimension: number;
  minQty: number;
  minQtyType: string;
  packagedQty: number;
  multipleQty: number;
  multipleQtyType: string;
  brand: string;
  subBrand: string;
  category?: Array<string> | null;
  unit: string;
  tags: Array<string>;
  images: Array<ProductImage>;
  originalPrice: number;
  currentPrice: number | null;
  currentPriceAfterTax: number | null;
  isBonus: boolean;
  isExclusive: boolean;
  isPromo: boolean;
  isAvailable?: boolean;
  isBundle?: boolean;
  promoList: Array<models.PotentialPromoProductProps>;
}
