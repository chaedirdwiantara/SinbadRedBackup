/** === PRODUCT LIST === */
export interface ProductList {
  id: string;
  name: string;
  isBundle: boolean;
  isExclusive: boolean;
  isPromo: boolean;
  image: string;
  thumbnail?: string;
  originalPrice?: number;
  currentPrice?: number;
  segmentationPrice: number;
  retailBuyingPrice: number;
}

/** === IMAGE === */
export interface ImagesList {
  url: string;
}

/** === PRODUCT DETAIL === */
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
