import { SnbRecord } from '..';
import {
  MoengageRecord,
  SearchPayload,
  SearchResultPageSuccess,
  SearchClickPayload,
} from '../models';

export function search(props: MoengageRecord<SearchPayload>) {
  SnbRecord(props);
}

export function searchResultPage(
  props: MoengageRecord<SearchResultPageSuccess>,
) {
  SnbRecord(props);
}

export function searchClick(props: MoengageRecord<SearchClickPayload>) {
  SnbRecord(props);
}
