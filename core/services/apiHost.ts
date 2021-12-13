import Config from 'react-native-config';

export const apiHost = {
  base: Config.BASE_URL,
  auth: Config.AUTH_URL,
  map: Config.GOOGLE_MAPS_API_KEY,
};

export default apiHost;
