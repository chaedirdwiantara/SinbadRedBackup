import * as EventName from '../event';
import { TrackRegistrationSuccessData } from '../models';
import * as Registration from '../record/registration.records';

function recordRegistrationSuccessData(
  eventname,
  data: TrackRegistrationSuccessData,
) {
  const props = {
    eventName: EventName.REGISTRATION_SUCCESS,
    data,
  };

  Registration.trackRegistration(props);
}

export { recordRegistrationSuccessData };
