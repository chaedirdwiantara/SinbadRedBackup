import { serializeQs } from '@core/functions/global/query-string';
import apiMapping from '@core/services/apiMappingV3';
import * as models from '@models';


/** === CONSTANT === */
const consolidateHistoryOrderPath = 'order-histories/consolidate';


/** ===FUNCTION ====*/
export const getMenuStatusList = () => {
  return apiMapping<Array<models.MenuStatusList>>(
    'auth',
    'group-statuses',
    'buyer-order',
    'v1',
    'LIST'
  )
}

// get order history list
export const getConsolidateOrderHistoryList = (
  payload: models.ConsolidateOrderListHistoryProcessProps,
) => {
  const qs = serializeQs({
    page: payload.page,
    perPage: payload.perPage,
    status: payload.status,
    orderGroupStatus: payload.orderGroupStatus,
    subOrderGroupStatus: payload.subOrderGroupStatus,
    keyword: payload.keyword,
  });

  return apiMapping<Array<models.ConsolidateOrderListHistory>>(
    'auth',
    `${consolidateHistoryOrderPath}?${qs}`,
    'buyer-order',
    'v1',
    'LIST',
  );
};