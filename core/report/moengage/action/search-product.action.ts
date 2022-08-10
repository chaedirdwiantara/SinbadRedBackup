import * as EventName from '../event';
import * as Search from '../record/search-product.records';
import {
  SearchPayload,
  SearchResultPageSuccess,
  SearchClickPayload,
} from '../models';

// record from search view typing
export function recordSearch(data: SearchPayload) {
  const props = {
    eventName: EventName.SEARCH,
    data,
  };

  Search.search(props);
}
// record if success get search product list
export function recordSearchResultPage(data: SearchResultPageSuccess) {
  const props = {
    eventName: EventName.SEARCH_RESULT_PAGE,
    data,
  };

  Search.searchResultPage(props);
}
// record action tap "pesan" or to detail product
export function recordSearchClick(data: SearchClickPayload) {
  const props = {
    eventName: EventName.SEARCH_CLICK,
    data,
  };

  Search.searchClick(props);
}
