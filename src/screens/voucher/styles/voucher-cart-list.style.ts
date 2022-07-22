import { StyleSheet } from 'react-native';
import { borderV2, color, colorV2, spacingV2 } from 'react-native-sinbad-ui';

export const VoucherCartListStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: color.white,
    marginTop: 8,
  },
  cardContainer: {
    marginBottom: 32,
  },
  footerMiniInfobar: {
    paddingHorizontal: spacingV2.spacing.md,
    paddingVertical: spacingV2.spacing.lg,
    margin: spacingV2.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderV2.radius.full,
    backgroundColor: colorV2.bgColor.yellow,
  },
  iconLeft: {
    marginRight: spacingV2.spacing.sm,
  },
  infobarDescription: {
    flex: 1,
  },
});
