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
