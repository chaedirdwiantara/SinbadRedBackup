/** === IMPORT INTERNAL === */
import { serializeQs } from '@core/functions/global/query-string';
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
const getList = (data: models.TagListProcessProps) => {
  const qs = serializeQs({
    keyword: data.keyword,
    brandId: data.brandId,
    categoryId: data.categoryId,
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
