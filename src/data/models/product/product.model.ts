import * as models from '@models';
/** === PRODUCT LIST === */
export interface ProductList {
  id: string;
  name: string;
  sellerId: string;
  isBundle: boolean;
  isBonus: boolean;
  isExclusive: boolean;
  hasBulkPrice: boolean;
  isPromo: boolean;
  thumbnail: string;
  priceBeforeTax: number;
  priceAfterTax: number;
  qtySoldLabel: string;
  warehouseOriginId: string;
}

export interface ProductListProcessProps extends models.ListProcessV3Props {
  keyword?: string;
  tags?: Array<string>;
  brandId?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: string;
  perPage?: number;
}

export type ProductListQueryOptions = Omit<
  ProductListProcessProps,
  'loading' | 'skip' | 'limit'
>;

export interface ProductListItemProps
  extends models.ListItemV3Props<Array<ProductList>> {
  total: number;
}

interface ProductListPagination {
  page: number;
  total: number;
  perPage: number;
  totalPage: number;
}

interface ProductListSuccessProps {
  meta: ProductListPagination;
  data: Array<ProductList>;
}

interface ProductBrnd {
  id: string;
  name: string;
}

interface productPriceRules {
  maxQty: number;
  minQty: number;
  price: number;
}

interface productTax {
  amount: number;
  calculate: string;
  name: string;
  typeAmount: string;
}

interface productSeller {
  id: string;
  name: string;
}
export interface ProductListSuccessAction {
  type: string;
  payload: ProductListSuccessProps;
}

export interface ProductImage {
  url: string;
}

type BulkPrice = {
  label: string;
  priceAfterTax: number;
  priceBeforeTax: number;
  qty: number;
  taxPrice: number;
};

export interface ProductDetail {
  id: string;
  categoryId: string;
  supplierCode: string;
  code: string;
  sellerId: string;
  name: string;
  detail: string;
  description: string;
  productWeight: number;
  productDimension: number;
  productBrand: ProductBrnd;
  productPriceRules: Array<productPriceRules>;
  productSeller: productSeller;
  productTax: productTax;
  packagedWeight: number;
  packagedDimension: number;
  minQty: number;
  minQtyType: string;
  packagedQty: number;
  multipleQty: number;
  multipleQtyType: string;
  brand: string;
  brandId: string;
  subBrand: string;
  category?: Array<string> | null;
  unit: string;
  tags: Array<string>;
  images: Array<ProductImage>;
  priceBeforeTax: number;
  priceAfterTax: number;
  isBonus: boolean;
  isExclusive: boolean;
  isPromo: boolean;
  isAvailable?: boolean;
  isBundle?: boolean;
  isPriceAfterTax: boolean;
  hasBulkPrice: boolean;
  promoList: Array<models.PotentialPromoProductProps>;
  bulkPrices: Array<BulkPrice>;
  qtySoldLabel: string;
  qtySoldValue: number;
  sellerCode: string;
  thumbnailImageUrl: string;
  warehouseOriginId?: number | null;
}

export type ProductSubModule = 'recommendations' | undefined;

export interface ProductListProcessAction extends models.ListProcessV3Action {
  subModule?: ProductSubModule;
}
