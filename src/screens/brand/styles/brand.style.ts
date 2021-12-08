import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const BrandStyles = StyleSheet.create({
  brandHomeContainer: {
    height: 200,
    backgroundColor: color.yellow50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
});

export default BrandStyles;
