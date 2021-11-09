import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-sinbad-ui';
const { width } = Dimensions.get('window');

const IntroStyles = StyleSheet.create({
  sinbadLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  introSinbadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
  },
  introSinbadPagination: {
    paddingHorizontal: 16,
    width,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    marginBottom: 35,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 16,
    backgroundColor: color.black10,
  },
  dotActive: {
    width: 16,
    height: 8,
    borderRadius: 16,
    backgroundColor: color.white,
  },
});

export default IntroStyles;
