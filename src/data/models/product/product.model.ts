/** === PRODUCT LIST === */
export interface ProductList {
  id: string;
  name: string;
  isBundle: boolean;
  isExclusive: boolean;
  isPromo: boolean;
  image: string;
  segmentationPrice: number;
  retailBuyingPrice: number;
}
