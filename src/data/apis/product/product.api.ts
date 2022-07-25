/** === IMPORT INTERNAL === */
import { serializeQs } from '@core/functions/global/query-string';
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTIONS === */
const serializeTagsQs = (tags?: Array<string>) => {
  if (tags !== undefined) {
    const formattedArray = tags.map(
      (tag) => `tags[]=${encodeURIComponent(tag)}`,
    );
    return formattedArray.join('&');
  }
};

const getList = (
  payload: models.ProductListProcessProps,
  subModule?: models.ProductSubModule,
) => {
  const qs = serializeQs({
    page: payload.page,
    perPage: payload.perPage,
    sort: payload.sort,
    sortBy: payload.sortBy,
    keyword: payload.keyword,
    brandId: payload.brandId,
    categoryId: payload.categoryId,
    minPrice: payload.minPrice,
    maxPrice: payload.maxPrice,
  });
  const tagQs =
    payload.tags !== undefined ? `&${serializeTagsQs(payload.tags)}` : '';
  const path = subModule
    ? `products/${subModule}?${qs}`
    : `products?${qs}${tagQs}`;

  return apiMapping<Array<models.ProductList>>(
    'public',
    path,
    'product',
    'v1',
    'LIST',
  );
};

const getDetail = (payload: models.DetailProcessProps) => {
  const [productId, warehouseId] = payload.id.split('_');
  const qs = serializeQs({
    warehouseId,
  });
  return apiMapping<models.ProductDetail>(
    'public',
    `products/${productId}?${qs}`,
    'product',
    'v2',
    'DETAIL',
  );
};

export const ProductApi = {
  getList,
  getDetail,
};
