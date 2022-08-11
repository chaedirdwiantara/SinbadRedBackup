/** === IMPORT FUNCTION === */
import { deviceId } from '@core/functions/global/device-data';
import { NavigationAction } from '@navigation';
import {
  recordSearch,
  recordSearchResultPage,
} from '@core/report/moengage/action';
/** === FUNCTIONS === */
const goBack = () => {
  NavigationAction.back();
};

const prevLastScreen = () => {
  const routes = NavigationAction.getRoutes() ?? [];
  const prevScreen = routes[routes.length - 2]?.name ?? '';
  const lastScreen = routes[routes.length - 1]?.name ?? '';

  return { prevScreen, lastScreen };
};
// send moengage report from search event
const searchEventMoengage = (method: 'Keyword' | 'Historical') => {
  const { prevScreen, lastScreen } = prevLastScreen();
  const payload = {
    screen_from: prevScreen,
    screen_to: lastScreen,
    device_id: deviceId,
    search_method: method,
  };
  recordSearch(payload);
};
// send moengage report every product list success get
const searchResultPageEventMoengage = (
  keyword: string,
  isKeywordFound: boolean,
) => {
  const { prevScreen, lastScreen } = prevLastScreen();

  const payload = {
    device_id: deviceId,
    is_keyword_found: isKeywordFound,
    keyword,
    screen_to: lastScreen,
    screen_from: prevScreen,
  };

  recordSearchResultPage(payload);
};

const goToProduct = (keyword: string, method: 'Keyword' | 'Historical') => {
  NavigationAction.navigate('SearchProductView', { keyword });
  searchEventMoengage(method);
};

export { goBack, goToProduct, searchResultPageEventMoengage };
