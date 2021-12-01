/** === IMPORT TYPE === */
import { ProductLayoutProps } from '@core/components/product/list/product-list-core.type';
/** === TYPE === */
export type SupplierProductLayoutProps = Omit<
  ProductLayoutProps,
  'withTags' | 'isRefreshing' | 'onRefresh' | 'onLoadMore'
>;
