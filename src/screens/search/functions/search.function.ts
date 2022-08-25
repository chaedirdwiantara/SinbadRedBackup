/** === IMPORT FUNCTION === */
import { uniqueId } from '@core/functions/global/device-data';
import { NavigationAction } from '@navigation';
import {
  recordSearch,
  recordSearchResultPage,
  recordSearchBack,
  recordSearchClick,
} from '@core/report/moengage/action';
/** === FUNCTIONS === */

const screenName = () => {
  const screen = NavigationAction.getRoutes();
  return screen?.map((i) => i.name) ?? [];
};

const prevLastScreen = () => {
  const routes = screenName();
  const fromScreen = routes[routes.length - 2] ?? '';
  const toScreen = routes[routes.length - 1] ?? '';

  return { fromScreen, toScreen };
};

const reverseScreen = () => {
  const routes = screenName();
  const fromScreen = routes[routes.length - 1] ?? '';
  const toScreen = routes[routes.length - 2] ?? '';

  return { fromScreen, toScreen };
};

const goBack = () => {
  const { fromScreen, toScreen } = reverseScreen();
  const payload = {
    screen_from: fromScreen,
    screen_to: toScreen,
    device_id: uniqueId,
  };

  NavigationAction.back();
  recordSearchBack(payload);
};

// send moengage report from search event
const searchEventMoengage = (method: 'Keyword' | 'Historical') => {
  const { fromScreen, toScreen } = prevLastScreen();
  const payload = {
    screen_from: fromScreen,
    screen_to: toScreen,
    device_id: uniqueId,
    search_method: method,
  };
  recordSearch(payload);
};
// send moengage report every product list success get
const searchResultPageEventMoengage = (
  keyword: string,
  isKeywordFound: boolean,
) => {
  const { fromScreen, toScreen } = prevLastScreen();

  const payload = {
    device_id: uniqueId,
    is_keyword_found: isKeywordFound,
    keyword,
    screen_to: toScreen,
    screen_from: fromScreen,
  };

  recordSearchResultPage(payload);
};
// search click product event moengage
const searchClickProductEventMoengage = () => {
  const { fromScreen, toScreen } = prevLastScreen();
  const payload = {
    screen_from: fromScreen,
    screen_to: toScreen,
    device_id: uniqueId,
  };

  recordSearchClick(payload);
};

const goToProduct = (keyword: string, method: 'Keyword' | 'Historical') => {
  NavigationAction.navigate('SearchProductView', { keyword });
  searchEventMoengage(method);
};

const goToHome = () => {
  const { fromScreen, toScreen } = reverseScreen();
  const payload = {
    device_id: uniqueId,
    screen_to: toScreen,
    screen_from: fromScreen,
  };
  NavigationAction.navigate('HomeView');
  recordSearchBack(payload);
};

const goToShoppingCart = () => {
  NavigationAction.navigate('OmsShoppingCartView');
  const { fromScreen, toScreen } = prevLastScreen();
  const payload = {
    device_id: uniqueId,
    screen_to: toScreen,
    screen_from: fromScreen,
  };
  recordSearchBack(payload);
};

export {
  goBack,
  goToProduct,
  searchResultPageEventMoengage,
  goToHome,
  goToShoppingCart,
  searchClickProductEventMoengage,
};
