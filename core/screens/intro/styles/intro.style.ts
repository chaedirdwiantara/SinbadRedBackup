import { StyleSheet, Dimensions } from 'react-native';
import { colorV2, spacingV2 as layout, borderV2 } from 'react-native-sinbad-ui';
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
    paddingHorizontal: layout.spacing.lg,
    width,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    marginBottom: layout.spacing.xxl,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: borderV2.radius.lg,
    backgroundColor: colorV2.bgColor.dark,
  },
  dotActive: {
    width: 16,
    height: 8,
    borderRadius: borderV2.radius.lg,
    backgroundColor: colorV2.bgColor.light,
  },
});

export default IntroStyles;
