import { StyleSheet } from 'react-native';
import { colorV2, spacingV2 as layout, borderV2 } from 'react-native-sinbad-ui';

const UserStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorV2.bgColor.light,
  },
  headerContainer: {
    alignItems: 'center',
  },
  backgroundHeader: {
    position: 'absolute',
    backgroundColor: colorV2.bgColor.red,
    top: 0,
    width: '100%',
    height: '50%',
    zIndex: 0,
  },
  boxHeader: {
    marginVertical: layout.spacing.lg,
    height: 100,
    width: 100,
  },
  imageProfile: {
    height: 100,
    width: undefined,
    aspectRatio: 1 / 1,
    borderRadius: borderV2.radius.full,
    borderWidth: 2,
    borderColor: colorV2.bgColor.light,
  },
  boxEditIconContainer: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    padding: layout.spacing.xxsm,
    backgroundColor: colorV2.bgColor.light,
    borderRadius: borderV2.radius.lg,
  },
  boxEditIcon: {
    padding: layout.spacing.xxsm,
    backgroundColor: colorV2.iconColor.default,
    borderRadius: borderV2.radius.lg,
  },
  boxContent: {
    paddingHorizontal: layout.spacing.lg,
    paddingTop: layout.spacing.xl,
    justifyContent: 'space-between',
  },
  badgeBox: {
    flexDirection: 'row',
    margin: layout.spacing.lg,
    padding: layout.spacing.lg,
    backgroundColor: colorV2.special.blue10,
    borderRadius: borderV2.radius.sm,
  },
  separator: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#DAE0E7',
    marginHorizontal: layout.spacing.lg,
    marginTop: layout.spacing.lg,
  },
});
export default UserStyles;
