/** === IMPORT FUNCTION === */
import { deviceId } from '@core/functions/global/device-data';
import { NavigationAction } from '@navigation';
import { recordSearch } from '@core/report/moengage/action';
/** === FUNCTIONS === */
const goBack = () => {
  NavigationAction.back();
};

const searchEventMoengage = (method: 'Keyword' | 'Historical') => {
  const routes = NavigationAction.getRoutes() ?? [];
  const prevScreen = routes[routes.length - 2]?.name ?? '';
  const lastScreen = routes[routes.length - 1]?.name ?? '';
  const payload = {
    screen_from: prevScreen,
    screen_to: lastScreen,
    device_id: deviceId,
    search_method: method,
  };
  recordSearch(payload);
};

const goToProduct = (keyword: string, method: 'Keyword' | 'Historical') => {
  NavigationAction.navigate('SearchProductView', { keyword });
  searchEventMoengage(method);
};

export { goBack, goToProduct };
