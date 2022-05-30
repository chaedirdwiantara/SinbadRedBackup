import { SnbRecord } from '../../../../core/report/moengage/index';

export function trackCompletionData({ eventName, data }) {
  SnbRecord(eventName, data);
}
