/** === BRAND LIST === */
export interface BrandListItem {
  id: string;
  image: string;
  name: string;
}

export interface BrandListQueryOptions {
  sellerId?: string;
}
