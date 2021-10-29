import * as models from '@models';
/** === PRODUCT LIST === */
export interface ProductList {
  id: string;
  name: string;
  supplierId: string;
  originalPrice: number;
  currentPrice: number | null;
  isBundle: boolean;
  isBonus: boolean;
  isExclusive: boolean;
  isPromo: boolean;
  image: string;
  thumbnail: string;
}

export interface ProductListProcessProps extends models.ListProcessProps {
  keyword?: string;
  tags?: Array<string>;
  brandId?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
}

export type ProductListQueryOptions = Omit<
  ProductListProcessProps,
  'loading' | 'skip' | 'limit'
>;

export interface ProductListItemProps
  extends models.ListItemProps<Array<ProductList>> {
  canLoadMore: boolean;
}

export interface ProductListProps {
  list: ProductListItemProps;
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

export interface ImagesList {
  url: string;
}

export interface ProductDetailSuccessProps {
  id: string;
  supplierCode: string;
  supplierId: string;
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
  category?: string[] | string | null;
  unit: string;
  tags: string[];
  images: ImagesList[];
}
