import * as EventName from '../event';
import * as MoERecord from '../record';

function recordOwnerCompletionData(eventname, data) {
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

export { recordOwnerCompletionData };
