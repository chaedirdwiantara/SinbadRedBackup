import * as EventName from './event';
import * as MoeAction from './action';

export const toMoengageFromAction = (eventName, data) => {
  switch (eventName) {
    case EventName.LOGIN:
      MoeAction.recordLogin(data);
      break;
    case EventName.LOGOUT:
      MoeAction.recordLogout(data);
      break;
    case EventName.OWNER_DATA_STEP_1:
      MoeAction.recordOwnerCompletionData(eventName, data);
      break;
    case EventName.OWNER_DATA_STEP_2:
      MoeAction.recordOwnerCompletionData(eventName, data);
      break;
    case EventName.OWNER_DATA_STEP_3:
      MoeAction.recordOwnerCompletionData(eventName, data);
      break;
    case EventName.OWNER_DATA_STEP_4:
      MoeAction.recordOwnerCompletionData(eventName, data);
      break;
    case EventName.STORE_DATA_STEP_1:
      MoeAction.recordOwnerCompletionData(eventName, data);
      break;
    case EventName.STORE_DATA_STEP_2:
      MoeAction.recordOwnerCompletionData(eventName, data);
      break;
    case EventName.STORE_DATA_STEP_3:
      MoeAction.recordOwnerCompletionData(eventName, data);
      break;
    default:
      break;
  }
};
