import apiMapping from '@core/services/apiMappingV3';
import * as models from '@models';

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