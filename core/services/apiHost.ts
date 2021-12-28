import Config from 'react-native-config';

export const apiHost = {
  base: Config.BASE_URL,
  auth: Config.AUTH_URL,
  map: `https://maps.googleapis.com/maps/api/geocode/json?result_type=street_address&key=${Config.GOOGLE_MAPS_API_KEY}`,
};

export default apiHost;
