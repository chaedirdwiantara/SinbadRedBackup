import * as EventName from '../event';
import * as MoERecord from '../record';
import { TrackCompletionData } from '../models';

function recordOwnerCompletionData(
  eventname: string,
  data: TrackCompletionData,
) {
  switch (eventname) {
    case 'OwnerDataStep1':
      MoERecord.trackCompletionData({
        eventName: EventName.OWNER_DATA_STEP_1,
        data,
      });
      break;
    case 'OwnerDataStep2':
      MoERecord.trackCompletionData({
        eventName: EventName.OWNER_DATA_STEP_2,
        data,
      });
      break;
    case 'OwnerDataStep3':
      MoERecord.trackCompletionData({
        eventName: EventName.OWNER_DATA_STEP_3,
        data,
      });
      break;
    case 'OwnerDataStep4':
      MoERecord.trackCompletionData({
        eventName: EventName.OWNER_DATA_STEP_4,
        data,
      });
      break;
    default:
      break;
  }
}

function recordStoreCompletionData(
  eventname: string,
  data: TrackCompletionData,
) {
  switch (eventname) {
    case 'StoreDataStep1':
      MoERecord.trackCompletionData({
        eventName: EventName.STORE_DATA_STEP_1,
        data,
      });
      break;
    case 'StoreDataStep2':
      MoERecord.trackCompletionData({
        eventName: EventName.STORE_DATA_STEP_2,
        data,
      });
      break;
    case 'StoreDataStep3':
      MoERecord.trackCompletionData({
        eventName: EventName.STORE_DATA_STEP_3,
        data,
      });
      break;
    default:
      break;
  }
}

export { recordOwnerCompletionData, recordStoreCompletionData };
