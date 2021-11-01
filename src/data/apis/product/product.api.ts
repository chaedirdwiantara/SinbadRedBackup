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

const getList = (payload: models.ProductListProcessProps) => {
  const qs = serializeQs({
    skip: payload.skip,
    limit: payload.limit,
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

  return apiMapping<models.ProductList[]>(
    'public',
    `products?${qs}${tagQs}`,
    'product',
    'v1',
    'LIST',
  );
};

export const ProductApi = {
  getList,
};
