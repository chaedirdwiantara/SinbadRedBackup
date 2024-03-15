import { SnbRecord } from '..';
import {
  MoengageRecord,
  SearchPayload,
  SearchResultPageSuccess,
  SearchClickPayload,
} from '../models';
// record search to list
export function search(props: MoengageRecord<SearchPayload>) {
  SnbRecord(props);
}
// recrod back, to home, to cart
export function searchBack(
  props: MoengageRecord<Omit<SearchPayload, 'search_method'>>,
) {
  SnbRecord(props);
}
// record result success get search product
export function searchResultPage(
  props: MoengageRecord<SearchResultPageSuccess>,
) {
  SnbRecord(props);
}
// record tap "pesan" or to detail
export function searchClick(props: MoengageRecord<SearchClickPayload>) {
  SnbRecord(props);
}
