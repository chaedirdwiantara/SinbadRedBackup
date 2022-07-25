import * as EventName from '../event';
import * as Auth from '../record/auth.records';
import { TrackLogin } from '../models';

function recordLogin(data: TrackLogin) {
  const props = {
    eventName: EventName.LOGIN,
    data,
  };

  Auth.trackUserLogin(props);
}

function recordLogout(data: TrackLogin) {
  const props = {
    eventName: EventName.LOGOUT,
    data,
  };
  Auth.trackUserLogout(props);
}

export { recordLogin, recordLogout };
