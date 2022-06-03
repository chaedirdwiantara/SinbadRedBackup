import { SnbRecord } from '../../../../core/report/moengage/index';

export function trackRegistration({ eventName, data }) {
  SnbRecord(eventName, data);
}
