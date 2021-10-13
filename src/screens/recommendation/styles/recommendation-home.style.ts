import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const RecommendationHomeStyle = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
});

export default RecommendationHomeStyle;
