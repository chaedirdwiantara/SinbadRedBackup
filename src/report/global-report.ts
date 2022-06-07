import { toMoengageFromAction } from './moengage/to-moengage-action';
/** THIS FUNCTION FOR SEND DATA BASED ON ACTION */
export const globalReportFromAction = (eventName: string, data: any) => {
  toMoengageFromAction(eventName, data);
};
