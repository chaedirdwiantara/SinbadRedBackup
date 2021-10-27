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

const getList = (data: models.ProductListProcessProps) => {
  const qs = serializeQs({
    skip: data.skip,
    limit: data.limit,
    sort: data.sort,
    sortBy: data.sortBy,
    keyword: data.keyword,
    brandId: data.brandId,
    categoryId: data.categoryId,
    minPrice: data.minPrice,
    maxPrice: data.maxPrice,
  });
  const tagQs = data.tags !== undefined ? `&${serializeTagsQs(data.tags)}` : '';

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
