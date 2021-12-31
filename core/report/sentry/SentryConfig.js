import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';

const SentryConfig = () => {
  return Sentry.init({
    dsn: Config.SENTRY_DSN,
    enableAutoSessionTracking: true,
  });
};

export { SentryConfig, Sentry };
