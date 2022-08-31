/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
// base path service url
const path = 'warehouse-products/stock-reminders/bulk';
// get list use method post
const getList = (data: models.StockReminderGetProps[]) => {
  return apiMapping<Array<models.StockReminderItem>>(
    'auth',
    path,
    'warehouse',
    'v1',
    'CREATE',
    data,
  );
};

export const stockReminderApi = {
  getList,
};
