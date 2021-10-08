import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const BrandHomeStyle = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default BrandHomeStyle;
