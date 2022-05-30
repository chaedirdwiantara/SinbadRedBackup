import * as EventName from '../event';
import * as MoERecord from '../record';

function recordRegistrationData(eventname, data) {
  MoERecord.trackRegistration({
    eventName: EventName.REGISTRATION,
    data,
  });
}

export { recordRegistrationData };
