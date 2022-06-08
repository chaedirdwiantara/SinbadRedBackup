import * as EventName from '../event';
import * as MoERecord from '../record';

function recordRegistrationSuccessData(eventname, data) {
  MoERecord.trackRegistrationSuccess({
    eventName: EventName.REGISTRATION_SUCCESS,
    data,
  });
}

export { recordRegistrationSuccessData };
