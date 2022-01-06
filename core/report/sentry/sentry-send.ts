import { Sentry } from './SentryConfig';
import apiHost from '@core/services/apiHost';
/** === INTERFACE === */
/** => for general */
interface ServiceGeneralErrorProps {
  access: string;
  path: string;
  module: string;
  version: string;
  method: string;
  params?: object;
  error: object;
  cookie: string | null;
}
/** => for auth */
interface ServiceAuthErrorProps {
  path: string;
  version: string;
  method: string;
  params?: object;
  error: object;
  cookie: string | null;
}
/** === SERVICE GENERAL ERROR === */
const sentryServiceGeneralError = (props: ServiceGeneralErrorProps) => {
  Sentry.configureScope((scope) => {
    scope.setTag('Bug Type', 'Service Error');
    scope.setTag('Service', props.module);
    scope.setExtras({
      endpoint: `${apiHost.base}/${props.module}/api/${
        props.version
      }/sinbad-app/${props.access === 'public' ? 'public/' : ''}${props.path}`,
      method: props.method,
      payloadString: JSON.stringify(props.params ? props.params : '{}'),
      errorString: JSON.stringify(props.error ? props.error : '{}'),
      cookie: props.cookie ? props.cookie : 'not login',
    });
    scope.setLevel(Sentry.Severity.Warning);
    Sentry.captureMessage(`Service Error ${props.module}`);
  });
};
/** === SERVICE AUTH ERROR === */
const sentryServiceAuthError = (props: ServiceAuthErrorProps) => {
  Sentry.configureScope((scope) => {
    scope.setTag('Bug Type', 'Service Error');
    scope.setTag('Service', 'auth');
    scope.setExtras({
      endpoint: `${apiHost.auth}/api/${props.version}/sinbad-app/${props.path}`,
      method: props.method,
      payloadString: JSON.stringify(props.params ? props.params : '{}'),
      errorString: JSON.stringify(props.error ? props.error : '{}'),
      cookie: props.cookie ? props.cookie : 'not login',
    });
    scope.setLevel(Sentry.Severity.Warning);
    Sentry.captureMessage('Service Error Auth');
  });
};

export { sentryServiceGeneralError, sentryServiceAuthError };
