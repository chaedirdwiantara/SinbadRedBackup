import { SnbRecord } from '../../../../core/report/moengage/index';
import { MoengageRecord, TrackCompletionData } from '../models';

export function trackCompletionData(
  props: MoengageRecord<TrackCompletionData>,
) {
  const { data, eventName } = props;
  SnbRecord({ eventName, data: data });
}
