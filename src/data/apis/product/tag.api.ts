/** === IMPORT INTERNAL === */
import { serializeQs } from '@core/functions/global/query-string';
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
const getList = (payload: models.TagListProcessProps) => {
  const qs = serializeQs({
    keyword: payload.keyword,
    brandId: payload.brandId,
    categoryId: payload.categoryId,
  });

  return apiMapping<Array<models.TagList>>(
    'public',
    `products/tags?${qs}`,
    'product',
    'v1',
    'LIST',
  );
};

export const TagApi = {
  getList,
};
