import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const RecommendationHomeStyle = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    paddingBottom: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});
