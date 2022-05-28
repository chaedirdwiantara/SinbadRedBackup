import { toMoengageFromAction } from './moengage/toMoengageFromAction';
/** THIS FUNCTION FOR SEND DATA BASED ON ACTION */
export const globalReportFromAction = (eventName, data) => {
  toMoengageFromAction(eventName, data);
};
